export class Nft {
    constructor() {
        /*[string] The id of the Nft.*/
        this.id = '';
        /*[string] The base10 id of the Nft.*/
        this.nftIdBase10 = '';
        /*[string] NO DESCRIPTION, PLEASE ADD TO API.YAML*/
        this.userId = '';
        /*[string] NO DESCRIPTION, PLEASE ADD TO API.YAML*/
        this.collectionId = '';
        /*[string] NO DESCRIPTION, PLEASE ADD TO API.YAML*/
        this.templateId = '';
        /*[string] The name of the NFT. This will be shown on third party marketplaces such as OpenSea.
    */
        this.name = '';
        /*[string] The image url associated with the NFT. This will be shown on third party marketplaces such as OpenSea.
    */
        this.imageUrl = '';
        /*[string] The description of the NFT. This will be shown on third party marketplaces such as OpenSea
    */
        this.description = '';
        /*[string] Address of the deployed contract for the NFT.*/
        this.contractAddress = '';
        /*[object] This includes a variable number of key/value pairs as metadata of the NFT.
    */
        this.metadata = {};
    }
}
//# sourceMappingURL=Nft.js.map