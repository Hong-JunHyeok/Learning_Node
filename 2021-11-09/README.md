# HTTP 모듈로 서버 만들기

## 요청과 응답

클라이언트는 서버에 요청을 보내고 서버는 클라이언트에 응답을 보내게 된다.
즉, 서버는 요청을 받는 부분과 응답을 보내는 부분이 있어야 한다.

```js
http.createServer((req, res) => {
  // 서버 동작 코드
});
```

req : 요청에 관한 정보들이 담겨있는 객체
res : 응답에 관한 정보들이 담겨있는 객체

```js
const http = require("http");

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<h1>Hello Node!</h1>");
    res.end("<p>Hello Server!</p>");
  })
  .listen(8080, () => {
    console.log(`Server is running at 8080`);
  });
```

![](https://images.velog.io/images/hjh040302/post/1e193562-bcd4-4ed5-9729-572118860c9a/image.png)

# Localhost와 포트

localhost = 컴퓨터 내부의 주소

외부에서는 접근할 수 없고 자신의 컴퓨터에서만 접근할 수 있다.

localhost === 127.0.0.1

포트는 서버 내에서 프로세스를 구분하는 번호다.
서버는 프로세스에 포트를 다르게 할당하여 들어오는 요청을 구분한다.

만약 포트가 충돌된다면 에러가 발생한다.

헤더 - 정보가 기록되는 부분
바디 - 데이터가 기록되는 부분

**서버는 소스코드가 변경될 때 자동으로 변경사항을 반영하지 않는다.**

# 한번에 여러 서버를 실행하는 방법

```js
const http = require("http");

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<h1>Hello Node!</h1>");
    res.end("<p>Hello Server!</p>");
  })
  .listen(8080, () => {
    console.log(`Server is running at 8080`);
  });

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<h1>Hello Node!</h1>");
    res.end("<p>Hello Server!</p>");
  })
  .listen(8081, () => {
    console.log(`Server is running at 8081`);
  });
```

단, 포트가 달라야만 한다.

# fs로 데이터 전달하기

```js
const http = require("http");
const fs = require("fs").promises;

http
  .createServer(async (req, res) => {
    try {
      const data = await fs.readFile(__dirname + "/server2.html");
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(data);
    } catch (error) {
      console.error(error);
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(error.message);
    }
  })
  .listen(8080, () => {
    console.log(`Server is running at 8080`);
  });
```

data 변수에 저장된 버퍼를 그대로 클라이언트에 보내면 된다.

이때, 요청 처리 과정에서 에러가 발생하든지 여부와 관계없이 응답을 보내야한다.
그렇지 않으면 요청한 클라이언트 측에서 하염없이 응답을 기다리게 된다.

## REST와 라우팅 사용해보기

요청의 내용이 주소를 통해 표현되므로 서버가 이해하기 쉬운 주소를 사용하는 것이 좋다.
주소에 의미가 있는 것, 그것이 REST이다. 이는 일종의 약속이므로 REST API라고도 부른다.

[REST API설명글](https://meetup.toast.com/posts/92)

만약, 로그인같이 애매한 동작이 있다면 POST를 사용하면 된다.

> GET 메서드는 가져올때, 브라우저에서 캐싱되서 가져올수도 있다. (성능 향상)

# 쿠키와 세션

클라이언트에서 보내는 요청은 누가 요청을 보내는지 알 수가 없다. (IP주소나 브라우저의 정보를 받을 수는 있지만 여러 컴퓨터가 공통으로 IP주소를 가지거나 한 컴퓨터를 여러 사람이 사용할 수도 있다.)

이때, "누가 요청했는지" 알기 위해서 쿠키와 세션을 이해하여야 한다. 이것이 로그인하는 작업이다.

누구인지 기억하기 위해서 서버는 요청에 대한 응답을 할 때 쿠키라는 것을 보낸다.
쿠키는 키-값의 형태의 쌍이고 브라우저에서 쿠키를 저장해두었다가 서버에 요청할때 쿠키를 담아서 보낸다.
이제 서버는 브라우저에서 누가 요청했는지 찾을 수 있다.

브라우저에 쿠키가 있다면 자동으로 동봉해서 보내주기 때문에 클라이언트 단에서는 처리할 필요가 없다.
서버 -> 브라우저로 쿠키를 보낼 때만 코드를 처리하면 된다.

**쿠키는 곧 사용자의 정보인데, 이것이 노출되면 안되니까 주기적으로 지우라고 권고한다.**
쿠키는 요청에 header에 담아서 전송한다. 브라우저는 응답의 헤더에 따라 쿠키를 저장한다.

[Cookie 사용법 예시코드](./cookie-session/cookie2.js)
