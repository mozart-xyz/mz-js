import { NFTItem } from "./data/NFTItem";
import { User } from "./data/User";
import { V1FtsBalances } from "./data/V1FtsBalances";
export declare class MozartManager {
    gameId: string;
    currencyId: string;
    isLoggedIn: boolean;
    userData: User;
    static instance: MozartManager;
    authState: string;
    jwtToken: string;
    /**This is a list of items loaded from the store for this app*/
    storeItems: NFTItem[];
    /** This is a list of items the user actually has in their inventory for this app  */
    inventoryItems: NFTItem[];
    balances: V1FtsBalances;
    /** Fires when user logs in */
    onLoggedIn: Array<Function>;
    /** Fires when the store is loaded */
    onStoreLoaded: Array<Function>;
    /** Fires when the inventory is loaded */
    onInventoryLoaded: Array<Function>;
    /** Fires when userData is loaded */
    onUserDataLoaded: Array<Function>;
    /** Fires when purchase is completed */
    onPurchaseComplete: Array<Function>;
    /**URL for the auth service */
    private static AUTH_URL_BASE;
    /** URL for the API */
    private static API_URL_BASE;
    /** URL For the dashboard app */
    private static APP_URL_BASE;
    constructor(gameId: string, currencyId: string);
    /** Helper function to fire events to all listeners */
    private FireEvent;
    /** Login to Mozart using OAuth
        @param authMethod The OAuth method to use (google, facebook, github)
        @returns The URL to redirect the user to
        */
    LoginOAuthAndGetLoginURL(authMethod?: string): Promise<string>;
    /**This is called after LoginOAuthAndGetLoginURL() is called and it checks periodically to see if the user has logged in
    @param maxRetryCount The maximum number of times to check for login status
    @param timeBetweenRetriesInSeconds The number of seconds to wait between each check
    @param callback The function to call when the user has logged in or the login has timed out */
    StartLoginStatusMonitor(maxRetryCount?: number, timeBetweenRetriesInSeconds?: number, callback?: Function): Promise<void>;
    /**
    Requests additional user data like balances, nfts, and user info
    The MozartSDKLoginButton has logic to automatically call this.
     */
    RequestUserData(): Promise<any>;
    /**
     *
     * @param ItemTemplateID The ID of the item to buy
     * @returns
     */
    BuyItem(ItemTemplateID: string): Promise<any>;
    /**
     * This loads the store items from the Mozart API
     * @returns store items
     */
    LoadStore(): Promise<any>;
    /**
     * This returns the URL to redirect the user to to add funds to their account
     * @returns The URL to redirect the user to to add funds to their account
     */
    AddFunds(): string;
}
