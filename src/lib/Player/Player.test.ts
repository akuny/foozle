import Inventory from '../Inventory';
import { Player } from './Player';

const player = {
    alive: true,
    items: [
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
        test('A newly created player is alive', () => {
            expect(new Player(player, new Inventory()).isAlive()).toBe(true);
        });
    });
});
