var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import cfetch from 'cross-fetch';
/// Wrapper around fetch to make it easier to use
export class WebRequest {
    /** Regular GET Request Cross platform */
    static get(url) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(url);
            return yield (yield cfetch(url)).json();
        });
    }
    /**
     * GET Request with JWT Cross Platform
     * @param url
     * @returns
     */
    static get_autheticated(url) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(url);
            console.log(WebRequest.jwt);
            return yield (yield cfetch(url, {
                headers: {
                    'Authorization': 'Bearer ' + WebRequest.jwt
                }
            })).json();
        });
    }
    /**
     * POST Request cross platform
     * @param url the relative url to post to
     * @param data a javascript OBJECT that contains the data to send
     * @returns
     */
    static post(url, data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(url);
            return yield (yield cfetch(url, {
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
WebRequest.jwt = '';
//# sourceMappingURL=webrequest.js.map