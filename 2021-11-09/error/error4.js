process.on("uncaughtException", (error) => {
  console.error("예상치 못한 에러 : " + error);
});

setInterval(() => {
  throw new Error("서버 에러");
}, 1000);

setTimeout(() => {
  console.log("실행됩니다.");
}, 2000);
