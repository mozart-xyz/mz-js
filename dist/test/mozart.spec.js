"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const mozart_1 = require("../src/mozart");
const webrequest_1 = require("../src/webrequest");
const mozart = new mozart_1.MozartManager("B98Fkb6bk7o", "JFwZnxoEceu");
const jwt = "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJtb3phcnQueHl6IiwiZXhwIjoxNjc0NzgzNDQ1LCJuYmYiOjE2NzIyNzc4NDUsImlhdCI6MTY3MjI3Nzg0NSwiRW1haWwiOiJiZW5AbW96YXJ0Lnh5eiIsIkF1dGhJZCI6IjM1RWVTeTN1dFVCTUJmQnYxY1JIYjgifQ.jJzRWfA-eYpX9XaM8yCi1P47YkV_eAqOexJubMSAF3GHMOZYS71Hdczz9aNCFa57pk0DyugpSwlJPfUQtVKD8Q"; //"eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJtb3phcnQueHl6IiwiZXhwIjoxNjc0NTg3NTI5LCJuYmYiOjE2NzIwODE5MjksImlhdCI6MTY3MjA4MTkyOSwiRW1haWwiOiJiZW5AbW96YXJ0Lnh5eiIsIkF1dGhJZCI6Ijd3Unh6blo1YVRIM2htUFhwVDE2elUifQ.FwqEf3WUp0JmCtay0-EcYrpwgc1eWaB-yOCyRxGbWvYRe9VoVWkBN0QIjiEDc_zdKLr4VTW9i3BttNCMB0IpVA";
describe("Test OAuth", () => __awaiter(void 0, void 0, void 0, function* () {
    it("should return oauth url and oauthstate", () => __awaiter(void 0, void 0, void 0, function* () {
        let url = yield mozart.LoginOAuthAndGetLoginURL();
        //Inject JWT for further testing
        chai_1.assert.isTrue(url != null && url.indexOf("https://") == 0);
        chai_1.assert.isTrue(mozart.authState != null);
    }));
}));
describe("Test /me request user endpoint", () => __awaiter(void 0, void 0, void 0, function* () {
    it("should return user data", () => __awaiter(void 0, void 0, void 0, function* () {
        mozart.jwtToken = jwt;
        webrequest_1.WebRequest.jwt = jwt;
        let result = yield mozart.RequestUserData();
        console.log("");
        console.log("REQUEST USER DATA RESULT:\n\n" + JSON.stringify(result));
        chai_1.assert.isTrue(result != null);
        chai_1.assert.isTrue(mozart.userData != null);
    }));
}));
describe("Test LoadStore Endpoint", () => __awaiter(void 0, void 0, void 0, function* () {
    it("should return store data", () => __awaiter(void 0, void 0, void 0, function* () {
        mozart.jwtToken = jwt;
        webrequest_1.WebRequest.jwt = jwt;
        let result = yield mozart.LoadStore();
        console.log("LOAD STORE RESULT:\n\n" + JSON.stringify(result));
        chai_1.assert.isTrue(result != null);
        chai_1.assert.isTrue(mozart.storeItems != null);
    }));
}));
describe("Test Buying Endpoint", () => __awaiter(void 0, void 0, void 0, function* () {
    it("should return buy item success data", () => __awaiter(void 0, void 0, void 0, function* () {
        mozart.jwtToken = jwt;
        webrequest_1.WebRequest.jwt = jwt;
        let result = yield mozart.BuyItem("287jwtXLW32");
        console.log("BUY ITEM RESULT:\n\n" + JSON.stringify(result));
        chai_1.assert.isTrue(result != null);
        chai_1.assert.isTrue(result.status == "success");
    }));
}));
//# sourceMappingURL=mozart.spec.js.map