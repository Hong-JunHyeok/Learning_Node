const fs = require("fs");

fs.watch(__dirname + "/readme.txt", (eventType, fileName) => {
  console.log(eventType, fileName);
});
