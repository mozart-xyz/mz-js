"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NFTItem = void 0;
/**
 * NFTItem is a data class that represents an NFT item
 */
class NFTItem {
    constructor() {
        /** The name of the NFT*/
        this.name = "";
        /** The image url for the nft */
        this.image = "";
        /** The description of the nft */
        this.description = "";
        /** The price */
        this.price = "";
        this.priceTokenId = "";
        this.priceTokenName = "";
        /** Template ID for template items */
        this.itemTemplateId = "";
    }
}
exports.NFTItem = NFTItem;
//# sourceMappingURL=NFTItem.js.map