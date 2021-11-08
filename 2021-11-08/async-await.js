// Promise 패턴의 then, catch 체이닝의 반복이 불편함.
// async/await은 프로미스 기반의 새로운 비동기 문법이다.

const condition = true;

const getCondition = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (condition) {
        resolve("성공");
      } else {
        reject("실패");
      }
    }, 1000);
  });
};

async function asyncFunction() {
  try {
    // getCondition이 resolve될 때까지 기다림.
    const result = await getCondition();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

asyncFunction();
