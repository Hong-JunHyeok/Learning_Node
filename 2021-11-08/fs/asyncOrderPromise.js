const fs = require("fs").promises;

console.log("시작");
fs.readFile(__dirname + "/readme.txt")
  .then((data) => {
    console.log("1번", data.toString());
    return fs.readFile(__dirname + "/readme.txt");
  })
  .then((data) => {
    console.log("2번", data.toString());
    return fs.readFile(__dirname + "/readme.txt");
  })
  .then((data) => {
    console.log("3번", data.toString());
    return fs.readFile(__dirname + "/readme.txt");
  })
  .catch((error) => console.error(error));
