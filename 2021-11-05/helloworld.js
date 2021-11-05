//http 모듈을 로드
var http = require("http");
http
  // http 서버를 생성
  .createServer(function (req, res) {
    // 컨텐츠 헤더
    res.writeHead(200, { "content-type": "text/plain" });
    //메시지를 쓰고 통신이 완료되었다는 신호를 보냄.
    res.end("Hello, World\n");
  })
  .listen(8124);

console.log("Server running on 8124");
// RUN :  node 2021-11-05/helloworld.js
