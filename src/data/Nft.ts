
export class Nft
{
	/*[string] The id of the Nft.*/
	 public id:string = '';

	/*[string] The base10 id of the Nft.*/
	 public nftIdBase10:string = '';

	/*[string] NO DESCRIPTION, PLEASE ADD TO API.YAML*/
	 public userId:string = '';

	/*[string] NO DESCRIPTION, PLEASE ADD TO API.YAML*/
	 public collectionId:string = '';

	/*[string] NO DESCRIPTION, PLEASE ADD TO API.YAML*/
	 public templateId:string = '';

	/*[string] The name of the NFT. This will be shown on third party marketplaces such as OpenSea.
*/
	 public name:string = '';

	/*[string] The image url associated with the NFT. This will be shown on third party marketplaces such as OpenSea.
*/
	 public imageUrl:string = '';

	/*[string] The description of the NFT. This will be shown on third party marketplaces such as OpenSea
*/
	 public description:string = '';

	/*[string] Address of the deployed contract for the NFT.*/
	 public contractAddress:string = '';

	/*[object] This includes a variable number of key/value pairs as metadata of the NFT.
*/
	 public metadata:Object = {};


}