import { WebRequest } from "./webrequest";
import { NFTItem } from "./data/NFTItem";
import { User } from "./data/User";
import { V1FtsBalances } from "./data/V1FtsBalances";
export class MozartManager {
    //***************************************** */
    public gameId: string = "";
    public currencyId: string = "";
    //***************************************** */

    public isLoggedIn: boolean = false;
    public userData: User = new User();
    public static instance: MozartManager = null;

    public authState: string = "";
    public jwtToken: string = "";

    /**This is a list of items loaded from the store for this app*/
    public storeItems: NFTItem[] = new Array<NFTItem>();
    
    
    /** This is a list of items the user actually has in their inventory for this app  */ 
    
    public inventoryItems: NFTItem[] = new Array<NFTItem>();

    public balances: V1FtsBalances = new V1FtsBalances();

    //Events that fire when certain things happen - your sdk can listen to these events, just push a function into one of these arrays
    /** Fires when user logs in */
    public onLoggedIn: Array<Function> = new Array<Function>();
    /** Fires when the store is loaded */
    public onStoreLoaded: Array<Function> = new Array<Function>();
    /** Fires when the inventory is loaded */
    public onInventoryLoaded: Array<Function> = new Array<Function>();
    /** Fires when userData is loaded */
    public onUserDataLoaded: Array<Function> = new Array<Function>();
    /** Fires when purchase is completed */
    public onPurchaseComplete: Array<Function> = new Array<Function>();

    /**URL for the auth service */
    private static AUTH_URL_BASE: string = "https://testnet-api.mozart.xyz/v1/auth";

    /** URL for the API */
    private static API_URL_BASE: string = "https://testnet-api.mozart.xyz";

    /** URL For the dashboard app */
    private static APP_URL_BASE: string = "https://testnet-dashboard.mozart.xyz";
    constructor(gameId: string, currencyId: string) {
        this.gameId = gameId;
        this.currencyId = currencyId;
        MozartManager.instance = this;
    }

    /** Helper function to fire events to all listeners */
    private FireEvent(event: Array<Function>, data: any) {
        for (let i = 0; i < event.length; i++) {
            event[i](data);
        }
    }

    /** Login to Mozart using OAuth
        @param authMethod The OAuth method to use (google, facebook, github)
        @returns The URL to redirect the user to
        */
    public async LoginOAuthAndGetLoginURL(authMethod: string = "google"): Promise<string> {
        let result = await WebRequest.get(MozartManager.AUTH_URL_BASE + "/login?gameId=" + this.gameId);
        this.authState = result.oauthState;

        if (authMethod == "google") return result.googleUrl;
        if (authMethod == "facebook") return result.facebookUrl;
        if (authMethod == "github") return result.githubUrl;
        throw new Error("No valid auth method specified -- must be google, facebook, or github");
    }

    /**This is called after LoginOAuthAndGetLoginURL() is called and it checks periodically to see if the user has logged in
    @param maxRetryCount The maximum number of times to check for login status
    @param timeBetweenRetriesInSeconds The number of seconds to wait between each check
    @param callback The function to call when the user has logged in or the login has timed out */
    public async StartLoginStatusMonitor(maxRetryCount: number = 30, timeBetweenRetriesInSeconds = 2, callback: Function = null) {
        let retryCount = 0;
        let oauthURL: string = MozartManager.AUTH_URL_BASE + "/login_status?oauthState=" + this.authState;
        let checkStatusInterval: number = setInterval(() => {
            WebRequest.get(oauthURL).then((result: any) => {
                retryCount++;
                
                if (result.status && result.status.toLowerCase() === "ok") {
                    this.isLoggedIn = true;
                    this.jwtToken = result.jwtToken;
                    WebRequest.jwt = result.jwtToken;
                    clearInterval(checkStatusInterval);
                    if (callback) callback(true);
                    this.FireEvent(this.onLoggedIn, null);
                    console.log("Logged in! JWT Token: " + this.jwtToken);
                    return;
                }
                if (retryCount > maxRetryCount) {
                    clearInterval(checkStatusInterval);
                    if (callback) callback(false);
                    console.log("Login timed out");
                    return;
                }
            });
        }, timeBetweenRetriesInSeconds * 1000);
    }

    /**
    Requests additional user data like balances, nfts, and user info
    The MozartSDKLoginButton has logic to automatically call this.
     */
        public async RequestUserData() {
        let result = await WebRequest.get_autheticated(MozartManager.API_URL_BASE + "/v1/client/me?gameId=" + this.gameId);
        this.userData = result.user;
        let nfts = result.nfts;
        this.balances = result.balances;
        this.inventoryItems.length = 0;
        this.storeItems.length = 0;
        for (let idx in nfts) {
            let nft = nfts[idx];
            let newItem: NFTItem = new NFTItem();
            newItem.name = nft.name;
            newItem.image = nft.imageUrl;
            newItem.description = nft.description;
            this.inventoryItems.push(newItem);
        }
        this.FireEvent(this.onUserDataLoaded, null);
        return result;
    }

    /**
     * 
     * @param ItemTemplateID The ID of the item to buy
     * @returns 
     */
    public async BuyItem(ItemTemplateID: string) {
        let postData = {"factoryListingId": ItemTemplateID};
        let buyResponse = await WebRequest.post(MozartManager.API_URL_BASE + "/v1/client/factory_items/buy", postData);
        this.FireEvent(this.onPurchaseComplete, null);
        return buyResponse;
    }

    /**
     * This loads the store items from the Mozart API
     * @returns store items
     */
    public async LoadStore() {
        // /v1/client/factory_items/for_sale
        let result = await WebRequest.get_autheticated(MozartManager.API_URL_BASE + "/v1/client/factory_items/for_sale?gameId=" + this.gameId);
        this.storeItems.length = 0;
        for (let idx in result) {
            let nft = result[idx];
            let newItem: NFTItem = new NFTItem();
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
    }

    /**
     * This returns the URL to redirect the user to to add funds to their account
     * @returns The URL to redirect the user to to add funds to their account
     */
    public AddFunds(): string {
        if (this.jwtToken == null) throw new Error("You must be logged in to add funds");
        if (this.gameId == null) throw new Error("You must set the game id before adding funds");
        return MozartManager.APP_URL_BASE + "/checkout?gameId=" + this.gameId + "&ftId=" + this.currencyId + "&jwt=" + this.jwtToken;
    }
}