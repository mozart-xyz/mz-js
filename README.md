# mz-js
Cross platform typescript and javascript client SDK for Mozart

# Commands for configuration

## npm run build-node 
Builds nodejs version of the SDK and puts it into dist/src - you can use it in node using require("@mozartxyz/mozartjs"), example:

```
let mz = require("@mozartxyz/mozartjs");
let manager = new mz.MozartManager(); //Note: you need to pass a gameId and a currencyId here for this to work properly
//manager loaded, will show a blank userdata object
console.log(manager.userData);
```

## npm run build-web
Builds web version of the SDK and puts it into dist/src/esm - you can use it on web applications as a global variable called MozartManager.  An example is provided in the public folder and you can launch the example by typing npm run dev

# Documentation
### Class documentation can be found here: https://mozart-xyz.github.io/mz-js/classes/MozartManager.html
