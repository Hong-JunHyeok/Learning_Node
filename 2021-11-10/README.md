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
