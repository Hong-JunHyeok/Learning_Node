setInterval(() => {
  console.log("시작");
  try {
    throw new Error("서버 에러");
  } catch (error) {
    console.error(error);
  }
}, 1000);
