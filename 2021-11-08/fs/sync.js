const fs = require("fs");

console.log("시작");
let data = fs.readFileSync(__dirname + "/readme.txt");
console.log("1번", data.toString());
data = fs.readFileSync(__dirname + "/readme.txt");
console.log("2번", data.toString());
data = fs.readFileSync(__dirname + "/readme.txt");
console.log("3번", data.toString());
console.log("끝");
//! 위 방식으로 하게 된다면 수백 개 이상의 작업을 할 때 성능에 문제가 생긴다.
//! 동기적인 방식이므로 블로킹 현상이 발생한다.
