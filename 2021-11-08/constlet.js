if (true) {
  var x = 3; // 함수 스코프를 가지므로 if 블록문으로 스코프를 가질 수 없다.
}

console.log(x);

if (true) {
  const y = 3; // 블록 스코프를 가지므로 밖에서는 접근할 수 없다.
}

console.log(y);

const a = 0;
a = 1; //! Error

let b = 0;
b = 1;

const c;//! Error

//* JavaScript를 사용할 때 한 번 초기화했던 변수에 다른 값을 할당하는 경우는 의외로 적다.
//* 따라서 const를 기본적으로 사용하고 다른 값을 할당해야 하는 상황이 생겼을 때 let을 사용하면 된다.