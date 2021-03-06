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

사용자의 정보가 쿠키에 전달되는 행위는 매우 위험한 행위이기 때문에 쿠키에 정보를 담는 대신에, 그 정보를 식별할 수 있는 유니크한 값을 전달해주는것이 더 안전한 방법이다. 이를 세션 쿠키라고 한다.

![](https://images.velog.io/images/hjh040302/post/c4be4271-218f-452f-9655-4ac7dd334ad7/image.png)

실제로는 세션의 정보들을 변수에 저장하지 않는다.왜냐하면 서버가 멈추거나 재실행되면 변수가 초기화되기 때문이다. 그래서 Redis나 Memcached같은 DB에 저장해둔다.

# HTTPS

https 모듈은 웹 서버에 SSL암호화를 추가한다.
GET이나 POST요청을 할 때 오가는 데이터를 암호화해서 중간에 해킹을 못하도록 하는 보안시스템이다.
로그인, 결제 시스템 등 보안이 중요시되는 작업에서 http는 필수라고 볼 수 있다.

https 적용 방법은 인증서를 발급받아야한다. 또한, 자신의 도메인도 있어야해서 과정이 꽤나 복잡하다.
인증서를 받았다면 인증서 경로, 도메인 인증서 경로 등의 설정을 해줘야만 HTTPs 설정이 된다.
https를 사용한다면 기본 http가 80포트였다면 443으로 포트를 변경한다.

# HTTP2

http2는 기본의 http/1.1보다 개선되어서 효율적으로 요청을 보낸다. 웹의 속도가 많이 개선되는 효과를 볼 수 있다.

# Cluster

클러스터 모듈은 싱글 쓰레드로 동작하는 노드가 CPU 코어를 모두 사용할 수 있게 해주는 모듈이다.
포트를 공유하는 노드 프로세스를 여러 개 둘 수도 있으므로 요청이 많이 들어왔을 때 병렬로 실행된 서버의 개수만큼 요청이 분산되게 할 수 있다.
성능이 향상되지만 메모리를 공유하지 못하는 등의 단점이 있다. 즉, 세션을 메모리에 저장하는 경우에는 서로 세션을 공유하지 못한다. 그래서 Redis같은 서비스를 도입해서 해결한다.

# Express 라이브러리 소개

라우트의 개수가 많아질수록 코드가 길어지고 관리하기도 힘들다. 그리고 쿠키와 세션 로직을 추가하게 된다면 더욱 복잡해질것이다. 때문에 Express 모듈을 이용하여 이를 해결한다.
