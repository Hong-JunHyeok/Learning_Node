const http = require("http");
const fs = require("fs").promises;
const qs = require("querystring");
const url = require("url");

const PORT = 3080;

const cookieParse = (cookieString = "") =>
  cookieString
    .split(";")
    .map((v) => v.split("="))
    .reduce((acc, [key, value]) => {
      acc[key.trim()] = decodeURIComponent(value);
      return acc;
    }, {});

const server = http
  .createServer(async (req, res) => {
    const cookie = cookieParse(req.headers.cookie);
    if (req.url.startsWith("/login")) {
      //* 로그인 요청
      const { query } = url.parse(req.url);
      const { name } = qs.parse(query);
      const expires = new Date();

      expires.setMinutes(expires.getMinutes() + 1);
      res.writeHead(302, {
        Location: "/",
        "Set-Cookie": `name=${encodeURIComponent(
          name
        )}; Expires=${expires.toDateString()}; HttpOnly; Path=/`,
      });
      return res.end();
    } else if (cookie.name) {
      //* 쿠키가 있는 경우
      console.log(cookieParse(req.headers.cookie));
      res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
      return res.end(`${cookie.name}님, 환영합니다.`);
    } else {
      //* 쿠키가 없는 경우 (로그인 페이지)
      try {
        const data = await fs.readFile(__dirname + "/login-page.html");
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(data);
      } catch (err) {
        res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
        res.end(err.message);
      }
    }
  })
  .listen(PORT);

server.on("listening", () => {
  console.log(`Server is running at ${PORT}`);
});
