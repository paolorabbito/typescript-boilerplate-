import { describe, it } from "node:test";
import assert from 'node:assert';
import {HttpRequest} from "../../../src/httpRequest";
import {JsonPayload} from "../../../src/types/jsonPayload.type";
import {QueryParamsType} from "../../../src/types/queryParams.type";

describe("Http Request Test", () => {
    it('should make a GET request to Google without query parameters', async () => {
        const response = await HttpRequest.get('https://google.com');
        assert.strictEqual(response.status, 200);
    });

    it('should make a GET request with query parameters', async () => {
        const url = 'https://jsonplaceholder.typicode.com/posts';
        const queryParams: QueryParamsType[] = [{key: 'userId', value: '1'}];

        const response = await HttpRequest.get(url, queryParams);
        assert.strictEqual(response.status, 200);
        const body: any[] = await response.json();
        assert.notEqual(body, []);
    });

    it('should make a GET request with multiple query parameters', async () => {
        const url = 'https://pokeapi.co/api/v2/pokemon';
        const queryParams: QueryParamsType[] = [
            { key: 'limit', value: 9 },
            { key: 'offset', value: 0 }
        ];
        const expectedBody = {
            count: 1304,
            next: 'https://pokeapi.co/api/v2/pokemon?offset=9&limit=9',
            previous: null,
            results: [
                { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
                { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
                { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
                { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
                { name: 'charmeleon', url: 'https://pokeapi.co/api/v2/pokemon/5/' },
                { name: 'charizard', url: 'https://pokeapi.co/api/v2/pokemon/6/' },
                { name: 'squirtle', url: 'https://pokeapi.co/api/v2/pokemon/7/' },
                { name: 'wartortle', url: 'https://pokeapi.co/api/v2/pokemon/8/' },
                { name: 'blastoise', url: 'https://pokeapi.co/api/v2/pokemon/9/' }
            ]
        }


        const response = await HttpRequest.get(url, queryParams);
        assert.strictEqual(response.status, 200);
        const body = await response.json();

        assert.strictEqual(body.count, expectedBody.count);
        assert.strictEqual(body.next, expectedBody.next);
        assert.strictEqual(body.previous, expectedBody.previous);
        assert.deepStrictEqual(body.results, expectedBody.results);
    });

    it('should POST fake user and return 201', async () => {
        const payload: JsonPayload = {
            name: 'paolo',
            job: 'rabbito'
        }

        const response = await HttpRequest.post('https://reqres.in/api/users', payload);
        assert.strictEqual(response.status, 201);
    });

    it("should throw an error if the URL is invalid", async () => {
        const url = " invalid-url";
        try {
            await HttpRequest.get(url);
            assert.fail("Expected an error to be thrown");
        } catch (error: Error) {
            assert.strictEqual(error.message, "Failed to parse URL from  invalid-url");
        }
    });
});