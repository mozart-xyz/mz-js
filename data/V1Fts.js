"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.V1Fts = void 0;
class V1Fts {
    constructor() {
        /*[string] The id of the FT.*/
        this.id = '';
        /*[string] The ticker symbol for your FT. This must be 4 letters long.*/
        this.symbol = '';
        /*[string] The name of the FT.
    */
        this.name = '';
        /*[string] The image url associated with the FT.
    */
        this.imageUrl = '';
        /*[string] The description of the FT.
    */
        this.description = '';
        /*[object] This includes a variable number of key/value pairs as metadata of the FT.
    */
        this.metadata = {};
        /*[string] The number of this FT that has been created. FTs automatically belong to your org default user when FTs
    are created or when the supply of FTs increases.
    */
        this.supply = '';
    }
}
exports.V1Fts = V1Fts;
//# sourceMappingURL=V1Fts.js.map