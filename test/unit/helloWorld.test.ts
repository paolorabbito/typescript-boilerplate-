import { describe, it } from "node:test";
import assert from 'node:assert';
import {printHelloWorld} from "../../src/helloWorld";

describe("Hello World Test", () => {
    it('should return hello world string', () => {
        assert.strictEqual(printHelloWorld(), "Hello World!");
    });
});