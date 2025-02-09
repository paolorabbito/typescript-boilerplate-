import {QueryParamsType} from "./types/queryParams.type";
import {JsonPayload} from "./types/jsonPayload.type";

export class HttpRequest {
    public static async get(url: string, queryParams?: QueryParamsType[]): Promise<Response> {
        if (queryParams) {
            url = this.getUrlWithQueryParams(url, queryParams);
        }
        return await fetch(url);
    }

    public static async post(url: string, data: JsonPayload) {
        return await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }

    private static getUrlWithQueryParams(url: string, queryParams: QueryParamsType[]) {
        return url += '?' + queryParams.map(param => `${param.key}=${param.value}`).join('&');
    }
}