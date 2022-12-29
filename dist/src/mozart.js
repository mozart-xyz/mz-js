"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MozartManager = void 0;
const webrequest_1 = require("./webrequest");
const NFTItem_1 = require("./data/NFTItem");
const User_1 = require("./data/User");
const V1FtsBalances_1 = require("./data/V1FtsBalances");
class MozartManager {
    constructor(gameId, currencyId) {
        //***************************************** */
        this.gameId = "";
        this.currencyId = "";
        //***************************************** */
        this.isLoggedIn = false;
        this.userData = new User_1.User();
        this.authState = "";
        this.jwtToken = "";
        /// <summary>
        /// This is a list of items loaded from the store for this app
        /// </summary>
        this.storeItems = new Array();
        /// <summary>
        /// This is a list of items the user actually has in their inventory for this app
        /// </summary>
        this.inventoryItems = new Array();
        this.balances = new V1FtsBalances_1.V1FtsBalances();
        ///Events that fire when certain things happen - your sdk can listen to these events
        this.onLoggedIn = new Array();
        this.onStoreLoaded = new Array();
        this.onInventoryLoaded = new Array();
        this.onUserDataLoaded = new Array();
        this.onPurchaseComplete = new Array();
        this.gameId = gameId;
        this.currencyId = currencyId;
        MozartManager.instance = this;
    }
    //Helper function to fire events to all listeners
    FireEvent(event, data) {
        for (let i = 0; i < event.length; i++) {
            event[i](data);
        }
    }
    /// Login to Mozart using OAuth
    /// @param authMethod The OAuth method to use (google, facebook, github)
    /// @returns The URL to redirect the user to
    LoginOAuthAndGetLoginURL(authMethod = "google") {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield webrequest_1.WebRequest.get(MozartManager.AUTH_URL_BASE + "/login?gameId=" + this.gameId);
            this.authState = result.oauthState;
            if (authMethod == "google")
                return result.googleUrl;
            if (authMethod == "facebook")
                return result.facebookUrl;
            if (authMethod == "github")
                return result.githubUrl;
            throw new Error("No valid auth method specified -- must be google, facebook, or github");
        });
    }
    /// This is called after LoginOAuthAndGetLoginURL() is called and it checks periodically to see if the user has logged in
    /// @param maxRetryCount The maximum number of times to check for login status
    /// @param timeBetweenRetriesInSeconds The number of seconds to wait between each check
    /// @param callback The function to call when the user has logged in or the login has timed out
    StartLoginStatusMonitor(maxRetryCount = 30, timeBetweenRetriesInSeconds = 2, callback = null) {
        return __awaiter(this, void 0, void 0, function* () {
            let retryCount = 0;
            let oauthURL = MozartManager.AUTH_URL_BASE + "/login_status?oauthState=" + this.authState;
            let checkStatusInterval = setInterval(() => {
                webrequest_1.WebRequest.get(oauthURL).then((result) => {
                    retryCount++;
                    if (result.status && result.status.toLowerCase() === "ok") {
                        this.isLoggedIn = true;
                        this.jwtToken = result.jwtToken;
                        webrequest_1.WebRequest.jwt = result.jwtToken;
                        clearInterval(checkStatusInterval);
                        if (callback)
                            callback(true);
                        this.FireEvent(this.onLoggedIn, null);
                        console.log("Logged in! JWT Token: " + this.jwtToken);
                        return;
                    }
                    if (retryCount > maxRetryCount) {
                        clearInterval(checkStatusInterval);
                        if (callback)
                            callback(false);
                        console.log("Login timed out");
                        return;
                    }
                });
            }, timeBetweenRetriesInSeconds * 1000);
        });
    }
    /// <summary>
    /// Requests additional user data like balances, nfts, and user info
    /// The MozartSDKLoginButton has logic to automatically call this.
    /// </summary>
    RequestUserData() {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield webrequest_1.WebRequest.get_autheticated(MozartManager.API_URL_BASE + "/v1/client/me?gameId=" + this.gameId);
            this.userData = result.user;
            let nfts = result.nfts;
            this.balances = result.balances;
            this.inventoryItems.length = 0;
            this.storeItems.length = 0;
            for (let idx in nfts) {
                let nft = nfts[idx];
                let newItem = new NFTItem_1.NFTItem();
                newItem.name = nft.name;
                newItem.image = nft.imageUrl;
                newItem.description = nft.description;
                this.inventoryItems.push(newItem);
            }
            this.FireEvent(this.onUserDataLoaded, null);
            return result;
        });
    }
    /// <summary>
    /// Buy a specific item from the store and give it to the user
    /// </summary>
    /// <param name="item"></param>
    BuyItem(ItemTemplateID) {
        return __awaiter(this, void 0, void 0, function* () {
            let postData = { "factoryListingId": ItemTemplateID };
            let buyResponse = yield webrequest_1.WebRequest.post(MozartManager.API_URL_BASE + "/v1/client/factory_items/buy", postData);
            this.FireEvent(this.onPurchaseComplete, null);
            return buyResponse;
        });
    }
    /// <summary>
    /// Load the store for the current app
    /// </summary>
    LoadStore() {
        return __awaiter(this, void 0, void 0, function* () {
            // /v1/client/factory_items/for_sale
            let result = yield webrequest_1.WebRequest.get_autheticated(MozartManager.API_URL_BASE + "/v1/client/factory_items/for_sale?gameId=" + this.gameId);
            this.storeItems.length = 0;
            for (let idx in result) {
                let nft = result[idx];
                let newItem = new NFTItem_1.NFTItem();
                newItem.name = nft.name;
                newItem.image = nft.imageUrl;
                newItem.description = nft.description;
                newItem.price = nft.price;
                newItem.priceTokenName = nft.priceTokenName;
                newItem.priceTokenId = nft.priceTokenId;
                newItem.itemTemplateId = nft.factoryListingId;
                this.storeItems.push(newItem);
            }
            this.FireEvent(this.onStoreLoaded, null);
            return result;
        });
    }
    /// <summary>
    /// Add funds calls on the AddFunds system to add more funds to the application
    /// </summary>
    AddFunds() {
        if (this.jwtToken == null)
            throw new Error("You must be logged in to add funds");
        if (this.gameId == null)
            throw new Error("You must set the game id before adding funds");
        return MozartManager.APP_URL_BASE + "/checkout?gameId=" + this.gameId + "&ftId=" + this.currencyId + "&jwt=" + this.jwtToken;
    }
}
exports.MozartManager = MozartManager;
MozartManager.instance = null;
//URL for the auth service
MozartManager.AUTH_URL_BASE = "https://testnet-api.mozart.xyz/v1/auth";
//URL for the API
MozartManager.API_URL_BASE = "https://testnet-api.mozart.xyz";
//URL For the dashboard app
MozartManager.APP_URL_BASE = "https://testnet-dashboard.mozart.xyz";
//# sourceMappingURL=mozart.js.map