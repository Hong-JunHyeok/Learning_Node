// http 모듈 로드
var http = require("http");
var fs = require("fs");

http
  .createServer(function (req, res) {
    // helloworld.js를 열고 읽음.
    // __dirname은 현재 경로를 의미한다.
    fs.readFile(__dirname + "/helloworld.js", "utf-8", function (error, data) {
      res.writeHead(200, { "Content-Type": "text/plain" });
      if (error) {
        res.write("Could not find or open for reading\n");
      } else {
        res.write(data);
      }
      res.end();
    });
  })
  .listen(8124, function () {
    console.log("bound to port 8124");
  });
console.log("Server is running on 8124");
