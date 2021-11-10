# NPM이란?

다른 사람들이 작성해놓은 코드나 모듈을 APP Store처럼 공유해서 다운받아서 내 코드에 적용해 볼수도 있고 내 코드를 다른 사람들에게 공유해 놓을수도 있다.

npm은 Node Package Manager의 약어이다.

> yarn은 npm의 대체자이다.
> npm보다 쉽고 빠른 속도로 많은 사랑을 받고 있다.

# package.json으로 패키지 관리하기

노드에 패키지를 여러개 추가하다 보면 몇백개를 넘어가는 상황이 발생한다. 또한, 각 패키지는 버전이 있으므로 이를 기록해놓는 어딘가가 필요하다. 그것이 package.json이다.

프로젝트를 시작하기 전에 package.json파일을 만들고 시작하는 것이 좋다.

```console
npm init
```

--save 옵션은 npm@5부터는 기본값이므로 지정해줄 필요가 없다.

```console
npm install (--save) [Module_Name]
```

package-lock.json은 설치한 해당 모듈 외에도 node_modules에 들어있는 패키지들의 정보가 담겨있다. npm으로 패키지를 설치, 수정, 삭제할 때마다 내부 의존 관계를 이 파일에 저장한다.

--save-dev옵션은 개발용 모듈을 설치할 때 사용한다. 이는 devDependancies에 저장된다.

--global옵션은 적역적으로 설치하는 커맨드다. 환경 변수에 지정되므로 콘솔의 커맨드로 사용할 수 있게된다.

**npx 명령어**
전역 설치를 기피하는 경우가 있는데, package.json에 기록되지 않아 다시 설치할 때 어려움이 있기 때문에 npx라는 명령어를 사용한다.

# express-generator로 프로젝트를 생성할 때 폴더구조

bin > www => 서버를 실행하는 스크립트
public => 외부에서 접근 가능한 파일들을 모아놓은 폴더 (image, css, js등...)
routes => 주소별 라우터들을 모아놓은 곳
views => 템플릿 파일을 모아둔 곳

## MVC 패턴이란?

모델 - 뷰 - 컨트롤러 패턴의 줄임말이다.
Express에서 모델은 데이터 부분 뷰는 템플릿, 마지막으로 컨트롤러는 라우터라고 생각하면 된다.

# Express 구조 이해하기

## www 파일

bin폴더에 www파일은 .js확장자가 없다.
#!/use/bin/env node라는 주석으로 www파일을 콘솔 명령어로 만들 수 있다.

www파일의 전체적인 구조는 포트를 설정하는 부분, 서버를 생성하는 부분, 서버의 이벤트를 listening하는 부분 이렇게 크게 3가지가 있다.

## app모듈 돌아가는 방식

express 패키지를 호출하여 app이라는 변수 객체를 만든다. 이제 이 변수에 다양한 미들웨어를 넣고 각종 기능을 연결한다.

app.set 메서드로 익스프레스 앱을 설정할 수 있다.

app.use는 미들웨어를 장착하는 부분이다.

app객체를 모듈로 만든다.

# 미들웨어

미들웨어는 요청과 응답 그 사이에 존재하는 것이다.
미들웨어는 요청과 응답을 조작하여 기능을 추가하기도 하고 요청을 필터링하기도 한다.

app.use()로 장착한 미들웨어는 순차적으로 거친 후 라우터에서 클라이언트로 응답을 보낸다.

> express-generator로 만든 코드는 ES5의 문법이다.

```js
// 커스텀 미들웨어 만들기
app.use(function (req, res, next) {
  console.log(req.url, "나 미들웨어다.");
  next(); // 다음 미들웨어 호출
});
```

next를 호출하지 않으면 미들웨어의 흐름이 끊겨서 응답을 주지않고 무한 로딩상태가 된다.

```js
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
```

에러 핸들러의 라우터를 보면 매개변수가 네 개다.
next함수에 넣어준 인자가 err매개변수로 연결된다. 일반적으로 에러 핸들러는 미들웨어의 가장 하단부에 위치한다.

# app.use의 응용법

하나의 use에 미들웨어를 여러 개 장착할 수 있다.

```js
app.use(
  function (req, res, next) {
    console.log("첫번째 미들웨어");
    next();
  },
  function (req, res, next) {
    console.log("두번째 미들웨어");
    next();
  },
  function (req, res, next) {
    console.log("세번째 미들웨어");
    next();
  }
);
```

이때 순서대로 실행된다.

또한 next의 성질을 이용해 다음과 같은 미들웨어도 만들 수 있다.

```js
app.use(
  function (req, res, next) {
    if (Date.now() % 2 === 0) {
      return res.status(404).send("실패");
    } else {
      next();
    }
  },
  function (req, res, next) {
    return res.status(200).send("성공");
    next();
  }
);
```

# body-parser

요청의 본문을 해석해주는 미들웨어다.

사용법은 다음과 같다.

```js
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
```

하지만 express 4.16버전부터는 body-parser의 기능이 익스프레스에 내장되어있기 때문에 다음과 같이 수정할 수 있다.

```js
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
```

json()은 JSON형식의 데이터 전달 방식이고, URL-encoded는 주소 형식으로 데이터를 보내는 방식이다.
extended옵션은 false인 경우 내장함수인 querystring을 사용하여 해석하고 true면 qs를 사용해여 해석한다.

일반적인 경우에는 위와같이 하면 되지만 본문 데이터가 버퍼, 텍스트일때는 body-parser모듈을 사용해야한다.

```js
app.use(bodyParser.raw());
app.use(bodyParser.text());
```

body-parser를 이용하면 요청의 본문이 req.body에 자동으로 추가된다.
URL-encoded형식으로 데이터를 보내면 JSON 형태로 req.body에 들어간다.

# cookie-parser

쿠키 파서는 res에 동봉된 쿠키를 JSON형태로 해석해준다.
이때 해석된 쿠키들은 req.cookies 객체에 들어가게 된다.

쿠키 파서에 첫 번째 인자로 문자열을 넣는데, 암호화된 쿠키가 있는 경우 제공한 문자열을 키로 삼아 복호화할 수 있다.

# static

static미들웨어는 정적인 파일들을 제공한다.

```js
app.use(express.static(path.join(__dirname, "public")));
```

express.static 인자에 정적 파일의 위치를 넣어주면 된다.

```js
app.use("/image", express.static(path.join(__dirname, "public")));
```

위와 같이 정적파일을 제공할 주소도 지정할 수 있다.
그러면 아래와 같은 주소로 요청을 보낼 수 있다.
`http://localhost:3000/image/abc.png`
만약, 파일을 찾지 못했다면 요청을 라우터로 넘긴다.
때문에 정적 파일과 관련된 미들웨어는 최대한 위쪽으로 옮기는게 좋다.

# express-session

세션을 관리하기 위한 미들웨어다.

```js
app.use(cookieParser("secret code"));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "secret code",
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);
```

resave - 요청이 왔을 때 세션에 수정사항이 생기지 않더라도 세션을 다시 저장할지에 대한 설정
saveUninitialized - 세션에 저장할 내역이 없더라도 세션을 저장할것인가 (방문자 추적)
secret - 위에 설정한 cookieParser에 인자값과 동일한 값을 전달해주면 된다.

express-session은 세션 관리 시 클라이언트에 쿠키를 보낸다.

# Router 객체로 라우팅 분리하기

기존에 http 모듈로 라우팅을 할 때에는 url을 if문으로 돌아서 코딩을 했어야했는데, 그런 방식을 Express에서는 Router 객체로 쉽게 라우팅을 할 수 있다. (Express의 장점)

라우터도 하나의 미들웨어이다.

첫번째 인자로 받은 URL로 요청이 들어오게 되면, 뒤의 콜백함수를 실행하는 형태로 동작한다.
use말고 HTTP Method로 사용할 수 있다. (좀 더 직관적인 코드 작성가능 + 해당 메소드의 요청만 들어왔을 때 실행)

각 라우터마다 기능별로 폴더를 나누는 것이 효과적인 방법이다.
ex) user router, post router둘을 각 라우터로 분기해서 코드를 짜는 것

```js
// index.js
router.use("/user", userRouter);
router.use("/post", postRouter);
```

```js
// user router
router.delete("/:userId", deleteUser); //* => DELETE /user/:userId
```

```js
// post router
router.get("/:postId", getPost); //* => GET /post/:postId
```

next 함수에는 특수 기능이 있는데, next('route')다.
이는, 라우터에 연결된 미들웨어를 건너뛸 때 사용된다.

```js
router.get(
  "/",
  function (req, res, next) {
    next("route");
  },
  function (req, res, next) {
    console.log("실행이 안됩니다");
  },
  function (req, res, next) {
    console.log("실행이 안됩니다");
  }
);

router.get("/", function (req, res) {
  console.log("실행이 됩니다.");
  next();
});
```

# 라우터 주소의 특수한 패턴

## Params

'/user/:id' -> /user/123 이나 /user/281 같은 라우터도 걸린다.
req.params => { id: 123 } or { id: 281 } ...

## Query

'/user/123?name=hong'
req.query => { name : 'hong' } (Express URLEncoded Middleware)

## 특수한 패턴을 사용할 때에 주의점

일반 라우터보다 뒤에 위치시켜야한다.
와일드카드 역할을 하므로 일반 라우터보다는 뒤에 위치해야 다른 라우터를 방해하지 않는다.
