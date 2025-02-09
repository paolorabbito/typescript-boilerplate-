import { describe, it } from "node:test";
import assert from 'node:assert';
import {HttpRequest} from "../../../src/httpRequest";
import {JsonPayload} from "../../../src/types/jsonPayload.type";

describe("Http Request Test", () => {
    it('google request should return 200', async () => {
        const response = await HttpRequest.get('https://google.com');
        assert.strictEqual(response.status, 200);
    });

    it('request with params should return array of result', async () => {
        const response = await HttpRequest.get('https://jsonplaceholder.typicode.com/posts', [{key: 'userId', value: '1'}]);
        assert.strictEqual(response.status, 200);
        const body = await response.json();
        assert.notEqual(body, []);
    });

    it('POST fake users should return 201', async () => {
        const payload: JsonPayload = {
            name: 'paolo',
            job: 'rabbito'
        }

        const response = await HttpRequest.post('https://reqres.in/api/users', payload);
        assert.strictEqual(response.status, 201);
    });
});