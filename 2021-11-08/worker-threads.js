const { Worker, isMainThread, parentPort } = require("worker_threads");

if (isMainThread) {
  const worker = new Worker(__filename);
  worker.on("message", (message) => console.log(message));
  worker.on("exit", () => console.log("worker exit"));
  worker.postMessage("ping");
} else {
  parentPort.on("message", (value) => {
    console.log(value);
    parentPort.postMessage("pong");
    parentPort.close();
  });
}
