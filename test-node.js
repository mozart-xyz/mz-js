console.log("Testing NodeJS support for Mozart-JS SDK");
console.log("Using REQUIRE");
let mozart = require("./dist/src/mozart.js")

let mz = new mozart.MozartManager();
console.log("MozartManager created successfully!");
console.log("Initial userData:");
console.log(mz.userData);
