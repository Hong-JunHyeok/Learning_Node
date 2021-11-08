var Human = function (type) {
  this.type = type || "Human";
};

Human.isHuman = function (human) {
  return human instanceof Human;
};

Human.prototype.breathe = function () {
  alert("h-a-a-m");
};

var Hong = function (type, firstName, lastName) {
  Human.apply(this.arguments);
  this.firstName = firstName;
  this.lastName = lastName;
};

Hong.prototype = Object.create(Human.prototype);
Hong.prototype.constructor = Hong; // 상속
Hong.prototype.sayName = function () {
  alert(`${this.name} ${this.lastName}`);
};

var oldHong = new Hong("human", "Hong", "Jun");
console.log(Human.isHuman(oldHong));
