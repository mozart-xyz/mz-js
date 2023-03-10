"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Media = void 0;
class Media {
    constructor() {
        /*[string] The display name you would like to set for the file.*/
        this.fileName = '';
        /*[string] Contents of a file, represented in base64 format. Get this by loading the bytes of a file into memory,
    then converting them into a base64 string. Then using that base64 string as the value for this field.
    */
        this.data = '';
    }
}
exports.Media = Media;
//# sourceMappingURL=Media.js.map