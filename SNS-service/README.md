# 시퀄라이즈로 테이블간 관계 지정하기

## 1 : N

1 : N 관계에서는 hasMany와 belongsTo로 연결한다.
이때 1이 hasMany, N이 belongsTo이다.
그러면 시퀄라이즈는 N인 테이블에 1인 테이블의 primary key 컬럼을 추가해준다.

대표적인 예시가 User 테이블과 Post 테이블이 있는데, User가 1, Post가 N으로 관계가 형성된다.
Post테이블에는 userId컬럼이 추가된다.

## N : M

N : M의 관계는 belongsToMany메서드로 정의한다.
관계 특성상 중간 테이블이 필요하다. through 속성에 테이블의 명을 명시하면 된다.
대표적인 예시는 Post, Hashtag가 있다. 게시글은 여러 해시테그를 가질 수 있고, 해시테그는 여러 게시글을 가질 수 있다.

새로 생성된 중간 테이블에서는 N의 기본키, N의 기본키가 저장된다.

같은 테이블끼리의 N : M관계를 가질 수 있다. 대표적으로 팔로잉, 팔로워가 있다.
사용자 한 명이 팔로워를 여러 명 가질수도 있고, 여러 명을 팔로잉할 수도 있다.

같은 테이블간의 N : M 관계에서는 모델 이름과 컬럼이름을 따로 정해줘야 한다.
그렇지 않으면 같은 테이블의 이름이 중복된 중간 테이블이 생성되기 때문이다.
만약 Follow라는 중간 테이블을 생성한다고 했을때 followerId, followingId 두 개의 컬럼이 존재해야 한다.

# Passport로 로그인 구현하기

```console
npm i passport passport-local passport-kakao bcrypt
```

Kakao 로그인 기능도 추가로 구현해보겠다.
app.js에 다음과 같이 코드를 작성한다.

```js
const passport = require("passport");

const passportConfig = require("./passport");

passportConfig(passport);

// ...Middlewares
app.use(passport.initialize());
app.use(passport.session());
```

passport 모듈은 나중에 작성을 할것이다.
`app.use(passport.initialize());`는 미들웨어 req에 passport 설정을 추가하고, `app.use(passport.session());`미들웨어는 req.session객체에 passport 정보를 추가한다.
여기서 미들웨어의 순서가 중요한데, express-session의 미들웨어의 밑에 위치해야 한다.

이제 Passport 모듈을 작성해보자

```js
// passport/index.js
const local = require("./localStrategy");
const kakao = require("./kakaoStrategy");
const { User } = require("../models");

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({ where: { id } })
      .then((user) => done(null, user))
      .catch((error) => done(error));
  });

  local(passport);
  kakao(passport);
};
```

`passport.serializeUser`와 `passport.deserializeUser`는 passport의 핵심이다.

`serializeUser`는 req.session객체에 어떤 데이터를 저장할지 선택한다. 매개변수로 user를 받아서 done함수에 두 번째 인자로 user.id를 넘기고 있는데, done인자의 첫 번째 인자는 에러 발생 시 사용되는 인자다. 두 번째 인자가 중요하다.

세션에 사용자 정보를 모두 저장하면 용량이 커지는 등의 문제가 발생한다. 즉, 사용자의 아이디만 저장해서 용량을 확보하는 passport의 전략이다.

`deserializeUser`는 매 요청시 실행되는 함수다. passport.session() 미들웨어가 이 메서드를 호출하는데, serializeUser에서 저장했던 아이디를 받아서 데이터베이스에서 정보를 조회한 후, req.user에 저장한다.
앞으로 req.user에 user의 정보를 가져올 수 있다.

앞으로 진행될 로그인 플로우를 정리하자면 다음과 같다.

1. 로그인 요청이 들어옴
2. passport.authenticate 메서드 호출
3. 로그인 전략 수행
4. 로그인 성공 시 사용자 정보 객체와 함께 req.login 호출
5. req.login메서드가 passport.serializeUser 호출
6. req.session에 사용자 아이디만 저장
7. 로그인 완료

## 로컬 로그인 구현하기

passport-local을 통해서 로컬 로그인을 구현한다.
그 전에 사용자의 로그인 여부에 따라 적절한 응답을 해주는 미들웨어를 만들어보았다.

```js
exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send("로그인 필요");
  }
};
exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/");
  }
};
```

Passport가 추가해주는 isAuthenticated메서드로 사용자가 로그인 했는지 안했는지 판별할 수 있다.

```js
router.get("/profile", isLoggedIn, (req, res) => {
  res.render("profile", {
    title: "내 정보 - SNS",
    user: req.user, //? 추후에 user정보를 넣을 예정.
  });
});

router.get("/join", isNotLoggedIn, (req, res) => {
  res.render("join", {
    title: "회원가입 - SNS",
    user: req.user,
    joinError: req.flash("joinError"), //* 일회성 메세지
  });
});
```

다음과 같이 작성하면 앞서 만들었던 미들웨어를 사용할 수 있다.
이제 auth 관련 미들웨어를 작성해보도록 하자.

```js
const express = require("express");
const passport = require("passport");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/join", isNotLoggedIn, (req, res, next) => {});
router.post("/login", isNotLoggedIn, (req, res, next) => {});
router.get("/logout", isLoggedIn, (req, res, next) => {});

module.exports = router;
```

라우트는 다음과 같은 구조로 잡고 각 라우트를 개발해보도록 하겠다.

```js
// join router
router.post("/join", isNotLoggedIn, (req, res, next) => {
  const { email, nick, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      req.flash("joinError", "이미 가입된 이메일입니다.");
      return res.redirect("/join");
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      nick,
      password: hash,
    });
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    return next(error);
  }
});
```

회원가입 라우트는 이미 존재하는 유저라면 User.create를 진행하지 않고 flash 메시지를 전달한다.
존재하는 유저가 아니라면 회원가입을 진행하는데, 비밀번호는 암호화된 값을 넣어준다. `bcrypt.hash`메서드는 첫번째 인자로 암호화할 값, 두번째 인자로 암호화 반복 횟수를 지정한다. 크면 클수록 복호화가 복잡해진다.

```js
// login router
router.post("/login", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }

    if (!user) {
      req.flash("loginError", info.message);
      return res.redirect("/");
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect("/");
    });
  });
});
```

로그인 라우터는 `passport.authenticate`가 로그인 전략을 실행한다.
로그인 전략은 아직 작성하지 않았으므로 로그아웃 라우터 다음에 작성해보도록 하겠다.

```js
// logout router
router.get("/logout", isLoggedIn, (req, res, next) => {
  req.logout();
  req.session.destroy();
  req.redirect("/");
});
```

`req.logout();`는 req.user를 제거한다.다음 `req.session.destroy();`는 req.session의 객체를 제거한다.

## 로그인 전략짜기

```js
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const { User } = require("../models");

module.exports = (passport) => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const exUser = await User.findOne({ where: { email } });
          if (exUser) {
            const result = await bcrypt.compare(password, exUser.password);
            if (result) {
              done(null, exUser);
            } else {
              done(null, false, { message: "비밀번호가 일치하지 않습니다." });
            }
          } else {
            done(null, false, { message: "가입되지 않은 회원입니다." });
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
```

usernameField, passwordField에는 일치하는 req.body의 속성명을 적어주면 된다.
async 함수는 전략을 실행하는 함수다.
done은 passport.authenticate의 콜백함수이다.

`bcrypt.compare`로 암호화한 비밀번호와 req에서 전달받은 비밀번호와 일치한지 비교한다. 만약 비밀번호가 일치한다면 done 함수의 두 번째 인자로 사용자 정보를 전달한다.
done에 전달된 값은 authenticate에 차례차례 전달된다.

```js
//done(null, exUser);
(authError, user, info) => {
  /*...*/
};
```

이제 Kakao 로그인도 해보도록 하겠다.
로그인 인증 과정을 카카오에 맡기는 것의 의미한다.
장점은 사용자는 새로 회원가입 하지 않아도 되고, 서비스 제공자는 로그인 과정을 검증된 SNS에 맡길수 있어서 좋다.

## 카카오 로그인 전략 작성하기

```js
const KakaoStrategy = require("passport-kakao");

const { User } = require("../models");

module.exports = (passport) => {
  passport.use(
    new KakaoStrategy(
      {
        clientId: process.env.KAKAO_ID,
        callbackURL: "/auth/kakao/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const exUser = await User.findOne({
            where: { snsId: profile.id, provider: "kakao" },
          });
          if (exUser) {
            done(null, exUser);
          } else {
            const newUser = await User.create({
              email: profile._json && profile._json.kaccount_email,
              nick: profile.displayName,
              snsId: profile.id,
              provider: "kakao",
            });
            done(null, newUser);
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
```

과정이 꽤나 복잡해졌다. clientId는 카카오에서 발급해주는 아이디이다.
노출이 되면 안되므로 env로 숨겨놓았다.
callbackURL은 인증 결과를 받을 라우터 주소다.

이제 카카오 로그인을 하는 라우터를 작성해야 한다.

```js
router.get("/kakao", passport.authenticate("kakao"));
```

다음 라우터로 접근하면 카카오 로그인 과정이 실행된다.
그 결과를 받을 callback라우터를 작성해보도록 하자.

```js
router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "/",
  }),
  (req, res) => {
    res.redirect("/");
  }
);
```

이제 만든 라우터를 app.js에 연결해보자.

```js
const pageRouter = require("./routes/page");
const authRouter = require("./routes/auth");

app.use("/", pageRouter);
app.use("/auth", authRouter);
```

이제 코드상에서 할 수 있는 작업은 다했다.
카카오 clientID를 발급받아야한다.
[카카오 Developers링크](https://developers.kakao.com/)에 접속하여 로그인을 진행한 후 애플리케이션을 생성한다.

![](https://images.velog.io/images/hjh040302/post/75953bbe-b37e-4864-917e-fafbfba44a26/image.png)
다음 REST API 키를 복사해 .env에 다음과 같이 작성해준다.

```
KAKAO_ID=발급받은KEY
```

**내 애플리케이션 > 앱 설정 > 플랫폼**에 들어가서 웹 플랫폼을 추가한다.
사이트 도메인에 본인 서비스주소, callbackURL도 동일하게 작성해준다.
![](https://images.velog.io/images/hjh040302/post/46a6a0a6-8a59-4be4-b3a1-7017ae41d59b/image.png)

![](https://images.velog.io/images/hjh040302/post/f5b3249b-b3a3-44c4-a3ae-3125cce701c0/image.png)

이제 서버를 키고 로그인 작업이 잘 되는지 확인한다.

# Multer 모듈로 이미지 업로드 구현하기

이미지를 업로드할때는 form 태그와 input[type=file]과 함께 사용하는 경우가 많다.
이 경우 form의 인코딩 타입은 multipart/form-data인데, 이런 형식의 데이터를 쉽게 처리하기 위해서 multer를 사용한다.

```js
fs.readdir("uploads", (error) => {
  if (error) {
    console.info("uploads 폴더를 생성합니다.");
    fs.mkdirSync("uploads");
  }
});
```

위 코드를 `routers/post.js`에 추가해준다.
uploads 폴더가 없다면 자동으로 생성해주는 코드다.
