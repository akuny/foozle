import { Player } from './Player';
import { iPlayer } from '../../ts/interfaces';

describe('Player class', () => {
    describe('hasInInventory() method', () => {
        test('Returns true if item is in inventory', () => {
            const playerArgument: iPlayer = {
                alive: true,
                inventory: [
                    {
                        id: 66,
                        canTake: true,
                        canUseOn: [''],
                        itemName: 'Pencil',
                        result: 'You write your name!',
                    },
                ],
            };
            const testPlayer = new Player(playerArgument);
            expect(testPlayer.hasInInventory(['the', 'pencil'])).toBe(true);
        });
        test('', () => {});
    });
    describe(' method', () => {
        test('', () => {});
        test('', () => {});
    });
});
