import { Player } from './Player';
import { iPlayerPayload } from '../../ts/interfaces';

const mockPlayerPayload: iPlayerPayload = {
    alive: true,
    inventory: [
        {
            id: 2,
            itemName: 'key',
            isKey: true,
            canTake: true,
            canUse: true,
            canUseIn: 'foyer',
            takeResult: 'You take the rusty key and put it in your pocket.',
            useResult: 'You unlock the cellar',
            triggers: ['takekey', 'usekey'],
        },
    ],
};

describe('Player class', () => {
    test('Is not undefined', () => {
        expect(new Player(mockPlayerPayload)).toBeDefined();
    });
});
