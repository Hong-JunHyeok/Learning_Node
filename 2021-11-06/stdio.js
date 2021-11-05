process.stdin.resume(); // stdin 스트림은 중지되어 있으므로 resume호출.
process.stdin.on("data", function (chunk) {
  process.stdout.write("data: " + chunk);
});
