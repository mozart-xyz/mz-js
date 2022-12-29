export declare class WebRequest {
    static jwt: string;
    /** Regular GET Request Cross platform */
    static get(url: string): Promise<any>;
    /**
     * GET Request with JWT Cross Platform
     * @param url
     * @returns
     */
    static get_autheticated(url: string): Promise<any>;
    /**
     * POST Request cross platform
     * @param url the relative url to post to
     * @param data a javascript OBJECT that contains the data to send
     * @returns
     */
    static post(url: string, data: any): Promise<any>;
}
