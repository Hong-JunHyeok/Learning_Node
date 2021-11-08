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
