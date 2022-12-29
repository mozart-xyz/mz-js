/**
 * NFTItem is a data class that represents an NFT item
 */
export class NFTItem
{
    /** The name of the NFT*/
    public name:string = "";
    /** The image url for the nft */
    public image:string = "";
    /** The description of the nft */
    public description:string = "";
    /** The price */
    public price:string = "";
    public priceTokenId:string = "";
    public priceTokenName:string = "";
    /** Template ID for template items */
    public itemTemplateId:string = "";
}