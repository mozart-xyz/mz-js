
export class V1Fts
{
	/*[string] The id of the FT.*/
	 public id:string = '';

	/*[string] The ticker symbol for your FT. This must be 4 letters long.*/
	 public symbol:string = '';

	/*[string] The name of the FT.
*/
	 public name:string = '';

	/*[string] The image url associated with the FT.
*/
	 public imageUrl:string = '';

	/*[string] The description of the FT.
*/
	 public description:string = '';

	/*[object] This includes a variable number of key/value pairs as metadata of the FT.
*/
	 public metadata:Object = {};

	/*[string] The number of this FT that has been created. FTs automatically belong to your org default user when FTs
are created or when the supply of FTs increases.
*/
	 public supply:string = '';


}