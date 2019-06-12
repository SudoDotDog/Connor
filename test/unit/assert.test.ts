/**
 * @author WMXPY
 * @namespace Connor
 * @description Assert
 * @override Unit
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { Assert } from '../../src/assert';

describe('Given an <Assert> function', (): void => {

    const chance: Chance.Chance = new Chance('connor-assert');

    it('exist should be fine if element is exist', (): void => {

        const value: number = chance.integer();
        const result: number = Assert.that(value).to.be.exist().value;

        expect(result).to.be.equal(value);
    });

    it('number should be fine if element is number', (): void => {

        const value: number = chance.integer();
        const result: number = Assert.that(value).to.be.number().value;

        expect(result).to.be.equal(value);
    });

    it('string should be fine if element is string', (): void => {

        const value: string = chance.string();
        const result: string = Assert.that(value).to.be.string().value;

        expect(result).to.be.equal(value);
    });

    it('array should be fine if element is array', (): void => {

        const element: string = chance.string();
        const value: string[] = [element];
        const result: string[] = Assert.that(value).to.be.array().value;

        expect(result).to.be.deep.equal([element]);
    });

    it('has should be fine if element is has target key', (): void => {

        const key: string = chance.string();
        const value: string = chance.string();
        const record: Record<string, string> = {
            [key]: value,
        };
        const result: Record<string, string> = Assert.that(record).to.be.has(key).value;

        expect(result).to.be.deep.equal({
            [key]: value,
        });
    });

    it('number should be fine if element not is string with reverse', (): void => {

        const value: string = chance.natural() as any;
        const result: string = Assert.that(value).to.be.not.string().value;

        expect(result).to.be.equal(value);
    });

    it('string should be thrown if element is not string', (): void => {

        const message: string = chance.string();
        const error: Error = new Error(message);
        const value: number = chance.string() as any;

        const exec = () => {
            Assert.that(value).to.be.number(error);
        };

        expect(exec).to.be.throw(message);
    });
});
