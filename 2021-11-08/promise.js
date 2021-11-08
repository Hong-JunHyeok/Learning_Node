const condition = true;
const promise = new Promise((resolve, reject) => {
  if (condition) {
    resolve("성공");
  } else {
    reject("실패");
  }
});
const promise2 = new Promise((resolve, reject) => {
  if (condition) {
    resolve("성공2");
  } else {
    reject("실패2");
  }
});

promise
  .then((message) => {
    console.log(message);
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    console.log("끝");
  });

// 실행은 바로 하되, 결과값은 나중에 받는 객체.

Promise.all([promise, promise2]).then(console.log).catch(console.error);
