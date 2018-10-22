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
});
