const fs = require("fs").promises;

fs.writeFile(__dirname + "/writename.txt", "글이 입력됩니다.")
  .then(() => {
    return fs.readFile(__dirname + "/writename.txt");
  })
  .then((data) => {
    console.log(data.toString());
  })
  .catch((error) => {
    console.error(error);
  });
