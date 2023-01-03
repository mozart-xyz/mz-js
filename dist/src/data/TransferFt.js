"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransferFt = void 0;
class TransferFt {
    constructor() {
        /*[string] The id of the previous owner of the FT*/
        this.prevOwnerId = '';
        /*[string] The id of the new owner of the FT*/
        this.newOwnerId = '';
        /*[string] The id of the FT that was transferred*/
        this.ftId = '';
        /*[string] The amount of the FT that was transferred from prevOwner to newOwner*/
        this.amount = '';
        /*[string] The id of the previous owner of the FT*/
        this.prevOwnerBalance = '';
        /*[string] The id of the new owner of the FT*/
        this.newOwnerBalance = '';
    }
}
exports.TransferFt = TransferFt;
//# sourceMappingURL=TransferFt.js.map