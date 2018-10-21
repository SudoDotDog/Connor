/**
 * @author WMXPY
 * @namespace Connor
 * @description Error Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { ErrorCreationFunction } from '../src/declare';
import { Connor } from '../src/index';

describe('Given an <ErrorCreator> function', (): void => {

    const twoDescription: string = 'two {}, two {}';
    const threeDescription: string = 'three {}, three {}, three {}';

    before((): void => {

        Connor.dictionary({
            2: twoDescription,
            3: threeDescription,
        });
    });

    after(Connor.refresh);

    const chance: Chance.Chance = new Chance('error-creator');

    it('should be able to get description', (): void => {

        const description: string = Connor.instance.getRawDescription(2);
        expect(description).to.be.equal(twoDescription);
    });

    it('should be able throw error', (): void => {

        const exec: () => void = () => Connor.instance.getRawDescription(chance.natural());
        expect(exec).to.be.throw('0: Connor Internal Error: Error not found');
    });
});

describe('Given an <ConnorError> class', (): void => {

    const twoDescription: string = 'two {}, two {}';

    before((): void => {

        Connor.dictionary({
            2: twoDescription,
        });
    });

    after(Connor.refresh);

    const chance: Chance.Chance = new Chance('connor-error-class');


    it('should be able to get description', (): void => {

        const slot1: string = chance.string();
        const error: ErrorCreationFunction = Connor.getErrorCreator('connor-error-class');

        const expected: string = '2: ' + twoDescription.replace('{}', slot1);

        expect(error(2, slot1).message).to.be.equal(expected);
    });
});
