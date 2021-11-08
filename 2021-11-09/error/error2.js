const fs = require("fs");

setInterval(() => {
  fs.unlink("./abcd.js", (error) => {
    if (error) {
      console.error(error);
    }
  });
}, 1000);
