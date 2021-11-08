const url = require("url");

const { URL } = url;
const myURL = new URL("http://www.hlog.site/user/2?type=json");
console.log(myURL);
console.log(url.format(myURL));
