var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { MozartManager } from "./mozart";
//An example of how to use the Mozart javascript SDK to login and load the store
let mozartTest = new MozartManager("B98Fkb6bk7o", "JFwZnxoEceu");
(() => __awaiter(void 0, void 0, void 0, function* () {
    let url = yield mozartTest.LoginOAuthAndGetLoginURL();
    mozartTest.StartLoginStatusMonitor(30, 2, (result) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Login status monitor result: " + result);
        if (result) {
            let result = yield mozartTest.RequestUserData();
            result = yield mozartTest.LoadStore();
        }
    }));
    console.log(url);
}))();
//# sourceMappingURL=mztest.js.map