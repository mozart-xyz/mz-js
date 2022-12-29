import { assert } from "chai";
import { MozartManager } from "../src/mozart";
import { WebRequest } from "../src/webrequest";
const mozart:MozartManager = new MozartManager("B98Fkb6bk7o", "JFwZnxoEceu");
const jwt = "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJtb3phcnQueHl6IiwiZXhwIjoxNjc0NzgzNDQ1LCJuYmYiOjE2NzIyNzc4NDUsImlhdCI6MTY3MjI3Nzg0NSwiRW1haWwiOiJiZW5AbW96YXJ0Lnh5eiIsIkF1dGhJZCI6IjM1RWVTeTN1dFVCTUJmQnYxY1JIYjgifQ.jJzRWfA-eYpX9XaM8yCi1P47YkV_eAqOexJubMSAF3GHMOZYS71Hdczz9aNCFa57pk0DyugpSwlJPfUQtVKD8Q";//"eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJtb3phcnQueHl6IiwiZXhwIjoxNjc0NTg3NTI5LCJuYmYiOjE2NzIwODE5MjksImlhdCI6MTY3MjA4MTkyOSwiRW1haWwiOiJiZW5AbW96YXJ0Lnh5eiIsIkF1dGhJZCI6Ijd3Unh6blo1YVRIM2htUFhwVDE2elUifQ.FwqEf3WUp0JmCtay0-EcYrpwgc1eWaB-yOCyRxGbWvYRe9VoVWkBN0QIjiEDc_zdKLr4VTW9i3BttNCMB0IpVA";
describe("Test OAuth", async () => {
      it("should return oauth url and oauthstate", async () => {
      let url:any = await mozart.LoginOAuthAndGetLoginURL();
      //Inject JWT for further testing
      assert.isTrue(url != null && url.indexOf("https://") == 0);
      assert.isTrue(mozart.authState != null);
   });
});

describe("Test /me request user endpoint", async () => {
      it("should return user data", async () => {
      mozart.jwtToken = jwt;
      WebRequest.jwt = jwt;
      let result = await mozart.RequestUserData();
      console.log("");
      console.log("REQUEST USER DATA RESULT:\n\n" + JSON.stringify(result));
      assert.isTrue(result != null);
      assert.isTrue(mozart.userData != null);
   });
});

describe("Test LoadStore Endpoint", async () => {
      it("should return store data", async () => {
      mozart.jwtToken = jwt;
      WebRequest.jwt = jwt;
      let result = await mozart.LoadStore();
      console.log("LOAD STORE RESULT:\n\n" + JSON.stringify(result));
      assert.isTrue(result != null);
      assert.isTrue(mozart.storeItems != null);
   });
});

describe("Test Buying Endpoint", async () => {
   it("should return buy item success data", async () => {
   mozart.jwtToken = jwt;
   WebRequest.jwt = jwt;
   let result = await mozart.BuyItem("287jwtXLW32");
   console.log("BUY ITEM RESULT:\n\n" + JSON.stringify(result));
   assert.isTrue(result != null);
   assert.isTrue(result.status == "success");
});
});
