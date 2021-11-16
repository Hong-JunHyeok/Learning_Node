# Learning_Node

🐹 Node.js 🐹

> Node.js의 매력은 뭘까? 예전 C++개발자의 저유뮬처럼 생각되었던 고성능 서버 프로그램 개발의 문턱을 획기적으로 낮추었다.
> 그 외에 NPM을 통해 다운로드할 수 있는 다양한 모듈들 덕분에 짧은 시간 빨리 성장할 수 있었다.

# 목차

- [2021-11-05](./2021-11-05/README.md)
- [2021-11-06](./2021-11-06/README.md)
- [2021-11-08](./2021-11-08/README.md)
- [2021-11-09](./2021-11-09/README.md)
- [2021-11-10](./2021-11-10/README.md)
- [2021-11-11](./2021-11-11/README.md)
- [2021-11-12](./2021-11-12/README.md)
- [2021-11-15](./2021-11-15/README.md)
- [SNS-service](./SNS-service)

# 평범한 자바스크립트가 아니다.

- Node가 클라이언트 개발 시에 사용했던 것과 거의 동일한 자바스크립트를 기반으로 한다.
- Node는 서버 기술이므로, 브라우저 환경에서 예상할 수 있는 일부 기능과 안전창치가 Node에는 존재하지 않는데다 완전히 새롭고 생소한 기능들도 존재한다.

# 왜 Node인가?

Node는 입출력은 많지만 연산은 간단한 에플리케이션에서 사용되도록 설계되었다.
더욱 중요한 점은 이러한 기능을 바로 직접 제공한다는 것이다.

애플리케이션이 파일 로드가 완료되거나 데이터베이스가 업데이트될 때까지 다른 처리를 차단하는 것에 대해 염려한 필요가 없는데, 대부분의 기능들이 기본적으로 비동기이기 때문이다.(블로킹 현상을 막아준다.) Node는 단일 쓰레드로 구현되므로 쓰레드를 다루는 것에 대해서도 걱정할 필요가 없다.

**비동기 처리란?**

> 애플리케이션이 코드의 다음 단계로 진행하기 전에 입력/출력 프로세스를 기다리지 않는 것을 의미한다.
> 특정 이벤트를 기다리고 있다가 해당 이벤트가 발생하면 적절하게 응답한다.
> Node는 이벤트 기능이 완료되는 것을 기다리는 동안 다른 요청이 들어오는 것을 차단하지 않으며, 이벤트는 비교적 간단한 이벤트 루프 내에서 들어온 순서대로 처리된다.

# 웹 API서버

API서버는 프론트엔드와 분리되어 운영된다.
API란 Application Programming Interface의 약어다.
애플리케이션에서 현재 프로그램의 기능을 사용할 수 있게 허용하는 접점을 의미한다.

웹 API는 다른 웹 서비스의 기능을 사용하거나 자원을 가져올 수 있는 창구이다.
API를 만들었다는 의미는 다른 프로그램에서 현재 기능을 사용할 수 있게 허용하였음을 의미한다.

서버에 API를 올려서 URL을 통해 접근할 수 있게 만든것을 웹 API서버라고 한다.

웹 서비스를 만들 때 공개해도 되는 정보들은 API로 만들어 API를 통해서 가져가게 하는것이 좋다. (API가 없을 경우에는 크롤링같은 기법으로 데이터를 발췌해야 하는데, 이는 트래픽 증가의 원인이된다.)

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
