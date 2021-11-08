const fs = require("fs");

fs.readFile(__dirname + "/readme.txt", (error, data) => {
  if (error) {
    throw error;
  }
  console.log(data);
  console.log(data.toString());
});
