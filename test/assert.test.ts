/**
 * @author WMXPY
 * @namespace Connor
 * @description Assert Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { AssertCreationFunction, ErrorCreationFunction } from '../src/declare';
import { Connor } from '../src/index';
import { ASSERT_ERROR_DESCRIPTION } from '../src/static';

describe('Given an <AssertCreator> function', (): void => {

    const twoDescription: string = 'two {}, two {}';
    const threeDescription: string = 'three {}, three {}, three {}';

    const moduleName: string = 'connor-assert-test';
    const error: ErrorCreationFunction = Connor.getErrorCreator();

    const chance: Chance.Chance = new Chance('connor-assert');

    before((): void => {

        Connor.dictionary({
            2: twoDescription,
            3: threeDescription,
        });
    });

    after(Connor.refresh);

    it('exist should be fine if element is exist', (): void => {

        const assert: AssertCreationFunction = Connor.getAssertCreator(moduleName);
        const value: number = chance.integer();
        const result: number = assert(value).to.be.exist().firstValue();

        expect(result).to.be.equal(value);
    });

    it('should check multiple element with and - happy path', (): void => {

        const assert: AssertCreationFunction = Connor.getAssertCreator(moduleName);
        const value: number = chance.integer();
        const value2: number = chance.integer();
        const test = (): void => {
            assert(value).and(value2).to.be.number().firstValue();
        };

        expect(test).to.be.not.throw();
    });

    it('should check multiple element with and - sad path', (): void => {

        const assert: AssertCreationFunction = Connor.getAssertCreator(moduleName);
        const value: number = chance.integer();
        const value2: string = chance.string();
        const test = (): void => {
            assert(value).and(value2 as any).to.be.number().firstValue();
        };

        expect(test).to.be.throw(error(0, ASSERT_ERROR_DESCRIPTION.ELEMENT_NOT_NUMBER).message);
    });

    it('exist should be throw an error if element is not exist', (): void => {

        const assert: AssertCreationFunction = Connor.getAssertCreator(moduleName);
        const errText: string = error(0, ASSERT_ERROR_DESCRIPTION.ELEMENT_NOT_EXIST).message;
        const exec: () => void = () => {
            assert(null).to.be.exist();
        };

        expect(exec).to.be.throw(errText);
    });

    it('exist should be fine if element is not exist, but reversed', (): void => {

        const assert: AssertCreationFunction = Connor.getAssertCreator(moduleName);
        const result: null = assert(null).to.be.not.exist().firstValue();

        // tslint:disable-next-line
        expect(result).to.be.null;
    });

    it('to be a array should work fine', (): void => {

        const assert: AssertCreationFunction = Connor.getAssertCreator(moduleName);
        const result: any[] = assert([]).to.be.array().firstValue();

        expect(result).to.be.deep.equal([]);
    });

    it('should return if element is a number', (): void => {

        const assert: AssertCreationFunction = Connor.getAssertCreator(moduleName);
        const value: number = chance.integer();
        const result: number = assert(value).to.be.number().firstValue();

        expect(result).to.be.deep.equal(value);
    });

    it('to be a array should work fine, when false', (): void => {

        const assert: AssertCreationFunction = Connor.getAssertCreator(moduleName);
        const errText: string = error(0, ASSERT_ERROR_DESCRIPTION.ELEMENT_NOT_ARRAY).message;
        const exec: () => void = () => {
            assert({ a: 1 }).to.be.array();
        };
        expect(exec).to.be.throw(errText);
    });

    it('true should be fine if element is true', (): void => {

        const assert: AssertCreationFunction = Connor.getAssertCreator(moduleName);
        const result: boolean = assert(true).to.be.true().firstValue();
        // tslint:disable-next-line
        expect(result).to.be.true;
    });

    it('true should throw when element is not', (): void => {

        const assert: AssertCreationFunction = Connor.getAssertCreator(moduleName);
        const errText: string = error(0, ASSERT_ERROR_DESCRIPTION.ELEMENT_NOT_TRUE).message;
        const exec: () => void = () => {
            assert(false).to.be.true();
        };
        expect(exec).to.be.throw(errText);
    });
});
