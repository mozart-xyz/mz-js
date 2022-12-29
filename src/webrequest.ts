import cfetch from 'cross-fetch';

/// Wrapper around fetch to make it easier to use
export class WebRequest
{
    public static jwt: string = '';
    /** Regular GET Request Cross platform */
    public static async get(url: string): Promise<any> {
        console.log(url);
        return await (await cfetch(url)).json();
    } 

    /**
     * GET Request with JWT Cross Platform
     * @param url 
     * @returns 
     */
    public static async get_autheticated(url: string): Promise<any> {
        console.log(url);
        console.log(WebRequest.jwt);
        return await (await cfetch(url, {
            headers: {
                'Authorization': 'Bearer ' + WebRequest.jwt
            }
        })).json();
    }

    /**
     * POST Request cross platform
     * @param url the relative url to post to
     * @param data a javascript OBJECT that contains the data to send
     * @returns 
     */
    public static async post(url: string, data: any): Promise<any> {
        console.log(url);
        return await (await cfetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + WebRequest.jwt
            },
        })).json();
    }
}