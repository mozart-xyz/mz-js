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
exports.WebRequest = void 0;
const cross_fetch_1 = require("cross-fetch");
/// Wrapper around fetch to make it easier to use
class WebRequest {
    static get(url) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(url);
            return yield (yield (0, cross_fetch_1.default)(url)).json();
        });
    }
    static get_autheticated(url) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(url);
            console.log(WebRequest.jwt);
            return yield (yield (0, cross_fetch_1.default)(url, {
                headers: {
                    'Authorization': 'Bearer ' + WebRequest.jwt
                }
            })).json();
        });
    }
    static post(url, data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(url);
            return yield (yield (0, cross_fetch_1.default)(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + WebRequest.jwt
                },
            })).json();
        });
    }
}
exports.WebRequest = WebRequest;
WebRequest.jwt = '';
//# sourceMappingURL=webrequest.js.map