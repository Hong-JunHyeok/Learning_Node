exports.odd = "홀수입니다.";
exports.even = "짝수입니다.";

// module.exports === exports

console.log(module.exports); // 어떤 값이든 대입해도 거눙하다.
console.log(exports);

// exports와 module.exports에는 참조 관계가 있으므로 한 모듈에 exports 객체와 module.exports를 동시에 사용하지 않는 것이 좋다.
