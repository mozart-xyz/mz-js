
export class Collection
{
	/*[string] The id of the Collection*/
	 public id:string = '';

	/*[integer] The total number of NFTs in circulation that are associated with this collection.*/
	 public currentSupply:number = 1;

	/*[string] The name of the collection. This will be shown on third party marketplaces such as OpenSea.*/
	 public name:string = '';

	/*[integer] The max number of NFTs that can be created and associated with this collection. If not included, there is an unlimited supply of NFTs that can be created for this collection.*/
	 public maxSupply:number = 1;

	/*[string] The image associated with the collection. This will be shown on third party marketplaces such as OpenSea.*/
	 public imageUrl:string = '';

	/*[string] The description of the collection. This will be shown on third party marketplaces such as OpenSea.*/
	 public description:string = '';

	/*[string] The address of the smart contract associated with the Collection.*/
	 public contractAddress:string = '';

	/*[array] An array of gameIds that this item is associated with*/
	 public gameIds:Array<string> = [];


}