import { Player } from './Player';
import { iPlayerPayload } from '../../ts/interfaces';

const mockPlayerPayload: iPlayerPayload = {
    alive: true,
    inventory: [
        {
            id: 2,
            itemName: 'Key',
            canTake: true,
            isKey: true,
            canUseIn: 'Foyer',
            descriptionPhrase: 'There is a rusty key on the table. ',
            result: 'You take the rusty key and put it in your pocket.',
            triggers: ['takeKey', 'useKey'],
        },
    ],
};

describe('Player class', () => {
    test('Is not undefined', () => {
        expect(new Player(mockPlayerPayload)).toBeDefined();
    });
});
