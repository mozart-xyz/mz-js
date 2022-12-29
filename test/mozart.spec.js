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
// tests/calculator.spec.tx
const chai_1 = require("chai");
const mozart_1 = require("../src/mozart");
describe("Test OAuth", () => __awaiter(void 0, void 0, void 0, function* () {
    it("should return an oauth url and oauthstate", () => __awaiter(void 0, void 0, void 0, function* () {
        const mozart = new mozart_1.MozartManager("LeQ7cWqedDp", "Lzz8QsX6hho");
        let url = yield mozart.LoginOAuthAndGetLoginURL();
        chai_1.assert.isTrue(url != null && url.indexOf("https://") == 0);
        chai_1.assert.isTrue(mozart.authState != null);
    }));
}));
//# sourceMappingURL=mozart.spec.js.map