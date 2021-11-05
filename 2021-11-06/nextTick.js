var asyncFunction = function (data, callback) {
  process.nextTick(function () {
    callback(data);
  });
};
