import {QueryParams} from "./types/queryParams";

export class HttpRequest {
    public static async get(url: string, queryParams?: QueryParams[]): Promise<Response> {
        if (queryParams) {
            url = this.getUrlWithQueryParams(url, queryParams);
        }
        return await fetch(url);
    }

    public static async post(url: string, data: any) {
        return await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }

    private static getUrlWithQueryParams(url: string, queryParams: QueryParams[]) {
        return url += '?' + queryParams.map(param => `${param.key}=${param.value}`).join('&');
    }
}