/**
 * @author WMXPY
 * @namespace Connor
 * @description Connor Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { ErrorCreationFunction } from '../src/declare';
import { ConnorError } from '../src/error';
import { Connor } from '../src/index';
import { CONNOR_ERROR_DESCRIPTION } from '../src/static';

describe('Given an <Connor> class', (): void => {

    const twoDescription: string = 'two {}, two {}';
    const threeDescription: string = 'three {}, three {}, three {}';

    const moduleName: string = 'connor-class-test';

    const chance: Chance.Chance = new Chance('connor-class');

    before((): void => {

        Connor.dictionary({
            2: twoDescription,
            3: threeDescription,
        });
    });

    after(Connor.refresh);

    it('should be able to call error with out replace', (): void => {

        const error: ErrorCreationFunction = Connor.getErrorCreator(moduleName);
        const result: ConnorError = error(2);

        expect(result.message).to.be.equal('2: ' + twoDescription);
    });

    it('should be able to call error with replace', (): void => {

        const error: ErrorCreationFunction = Connor.getErrorCreator(moduleName);
        const replace: string = chance.string();
        const result: ConnorError = error(2, replace);

        expect(result.message).to.be.equal('2: ' + twoDescription.replace('{}', replace));
    });

    it('should be able to call error with string symbol', (): void => {

        const error: ErrorCreationFunction = Connor.getErrorCreator(moduleName);
        const replace: string = chance.string();
        const result: ConnorError = error("test {}", replace);

        expect(result.message).to.be.equal('1: ' + "test {}".replace('{}', replace));
    });

    it('should be able to get raw description with symbol string', (): void => {

        const symbol: string = chance.string();
        const result: string = Connor.instance.getRawDescription(symbol);

        expect(result).to.be.equal(symbol);
    });

    it('should be able to throw error when combine conflict', (): void => {

        const error: ErrorCreationFunction = Connor.getErrorCreator(moduleName);
        const symbol: string = chance.string();
        const exec: () => void = () => {
            Connor.dictionary({ 1: symbol });
        };

        expect(exec).to.be.throw(error(0, CONNOR_ERROR_DESCRIPTION.CORE_0_1_ARE_OCCUPIED).message);
    });
});
