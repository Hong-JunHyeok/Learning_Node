const fs = require("fs");

const readStream = fs.createReadStream(__dirname + "/readme.md");
const writeStream = fs.createWriteStream(__dirname + "/readme-copy.txt");
readStream.pipe(writeStream);
