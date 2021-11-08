const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.write("<h1>Hello Node!</h1>");
  res.end("<p>Hello Server!</p>");
});
server.listen(8080);

server.on("listening", () => {
  console.log("Server is running at 80080");
});
server.on("error", (error) => {
  console.error(error);
});
