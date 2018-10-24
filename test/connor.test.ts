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
import { CONNOR_MODULE } from '../src/static';

describe('Given an <Connor> class', (): void => {

    const twoDescription: string = 'two {}, two {}';
    const threeDescription: string = 'three {}, three {}, three {}';

    const moduleName: string = 'connor-class-test';

    const chance: Chance.Chance = new Chance('connor-class');

    before((): void => {

        Connor.dictionary(moduleName, {
            2: twoDescription,
            3: threeDescription,
        });
    });

    it('should be able to call error with out replace', (): void => {

        const error: ErrorCreationFunction = Connor.getErrorCreator(moduleName);
        const result: ConnorError = error(2);

        expect(result.message).to.be.equal(moduleName + ' [2]: ' + twoDescription);
    });

    it('should be able to call error with replace', (): void => {

        const error: ErrorCreationFunction = Connor.getErrorCreator(moduleName);
        const replace: string = chance.string();
        const result: ConnorError = error(2, replace);

        expect(result.message).to.be.equal(moduleName + ' [2]: ' + twoDescription.replace('{}', replace));
    });

    it('should be able to call error with string symbol', (): void => {

        const error: ErrorCreationFunction = Connor.getErrorCreator(moduleName);
        const replace: string = chance.string();
        const result: ConnorError = error("test {}", replace);

        expect(result.message).to.be.equal(moduleName + ' [1]: ' + "test {}".replace('{}', replace));
    });

    it('should be able to get raw description with symbol string', (): void => {

        const symbol: string = chance.string();
        const result: string = Connor.instance(moduleName).getRawDescription(symbol);

        expect(result).to.be.equal(symbol);
    });

    it('should be able to throw when asking for not defined error creator', (): void => {

        const exec: () => void = () => {
            Connor.getErrorCreator(chance.string());
        };

        expect(exec).to.be.throw('CONNOR [0]: Module not found');
    });

    it('should be able to throw when asking for not defined assert creator', (): void => {

        const exec: () => void = () => {
            Connor.getAssertCreator(chance.string());
        };

        expect(exec).to.be.throw('CONNOR [0]: Module not found');
    });

    it('should be able to throw when create connor module', (): void => {

        const exec: () => void = () => {
            Connor.instance(CONNOR_MODULE.CONNOR);
        };

        expect(exec).to.be.throw('CONNOR [1]: Module name is occupied');
    });

    it('should be able to throw when create assert module', (): void => {

        const exec: () => void = () => {
            Connor.instance(CONNOR_MODULE.ASSERT);
        };

        expect(exec).to.be.throw('CONNOR [1]: Module name is occupied');
    });
});
