import { Player } from './Player';

const mockPlayerPayload = {
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
    describe('isAlive() method', () => {
        test('Newly instantiated Player is alive', () => {
            expect(new Player(mockPlayerPayload).isAlive()).toBe(true);
        });
    });
});
