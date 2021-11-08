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
