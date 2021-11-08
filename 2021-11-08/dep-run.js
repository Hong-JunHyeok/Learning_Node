const dep1 = require("./dep1");
const dep2 = require("./dep2");
dep1();
dep2();

// 순환 참조가 발생한다.
// 이때, 에러가 발생하지 않고 빈 객체가 반환된다.
