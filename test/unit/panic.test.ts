/**
 * @author WMXPY
 * @namespace Connor
 * @description Panic
 * @override
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { Connor } from '../../src/connor';
import { Panic } from '../../src/panic';

describe('Given a <Panic> class', (): void => {

    const twoDescription: string = 'two {}, two {}';
    const threeDescription: string = 'three {}, three {}, three {}';

    const moduleName: string = 'connor-panic-test';

    before((): void => {

        Connor.dictionary(moduleName, {
            2: twoDescription,
            3: threeDescription,
        });
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance: Chance.Chance = new Chance('panic');

    it('should be able to create a panic class', (): void => {

        const panic: Panic<any> = Panic.fromModule(moduleName);
        expect(panic).to.be.instanceOf(Panic);
    });
});
