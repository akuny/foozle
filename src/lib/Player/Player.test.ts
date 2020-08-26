import { Player } from './Player';
import { iPlayerPayload } from '../../ts/interfaces';

const mockPlayerPayload: iPlayerPayload = {
    alive: true,
    inventory: [
        {
            id: 66,
            itemName: 'Pencil',
            canTake: true,
            canUseOn: '',
            result: 'You write your name!',
            descriptionPhrase: 'It is on the table. ',
            triggers: ['bigParty'],
        },
    ],
};

describe('Player class', () => {
    test('Is not undefined', () => {
        expect(new Player(mockPlayerPayload)).toBeDefined();
    });
});
