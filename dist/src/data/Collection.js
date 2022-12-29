"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collection = void 0;
class Collection {
    constructor() {
        /*[string] The id of the Collection*/
        this.id = '';
        /*[integer] The total number of NFTs in circulation that are associated with this collection.*/
        this.currentSupply = 1;
        /*[string] The name of the collection. This will be shown on third party marketplaces such as OpenSea.*/
        this.name = '';
        /*[integer] The max number of NFTs that can be created and associated with this collection. If not included, there is an unlimited supply of NFTs that can be created for this collection.*/
        this.maxSupply = 1;
        /*[string] The image associated with the collection. This will be shown on third party marketplaces such as OpenSea.*/
        this.imageUrl = '';
        /*[string] The description of the collection. This will be shown on third party marketplaces such as OpenSea.*/
        this.description = '';
        /*[string] The address of the smart contract associated with the Collection.*/
        this.contractAddress = '';
        /*[array] An array of gameIds that this item is associated with*/
        this.gameIds = [];
    }
}
exports.Collection = Collection;
//# sourceMappingURL=Collection.js.map