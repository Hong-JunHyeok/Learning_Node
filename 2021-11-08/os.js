const { isAbsolute } = require("path");
const path = require("path");

const string = __filename;

console.log(path.sep);
console.log(path.delimiter);
console.log(__dirname);
console.log(path.dirname(string));
console.log(path.extname(string));
console.log(path.basename(string, path.extname(string)));
console.log(path.parse(string));
console.log(
  path.format({
    base: "os.js",
    dir: "/Users/hongjunhyeok/Documents/GitHub/Learning_Node/2021-11-08",
    ext: ".js",
    name: "os",
    root: "/",
  })
);
console.log(isAbsolute("C:\\"));
console.log(isAbsolute("./class.js"));
console.log(path.normalize("C://users\\\\zerocho\\path.js"));
