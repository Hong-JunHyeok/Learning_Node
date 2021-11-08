const buffer = Buffer.from("버퍼 바뀌기 전");
console.log(buffer);
console.log(buffer.length);
console.log(buffer.toString());

const array = [
  Buffer.from("띄엄 "),
  Buffer.from("띄엄 "),
  Buffer.from("띄어쓰기"),
];
const buffer2 = array.concat(array);
console.log(buffer2.toString());

const buffer3 = Buffer.alloc(5);
console.log(buffer3);
