import { Inventory } from './Inventory';
import { iItem, iInventory } from '../../ts/interfaces';

describe('Inventory class', () => {
    describe('hasInInventory() method', () => {
        test('Returns true if item is in inventory', () => {
            const mockItems: iItem[] = [
                {
                    id: 66,
                    itemName: 'Pencil',
                    canTake: true,
                    canUseOn: [''],
                    result: 'You write your name!',
                },
            ];
            const testInventory = new Inventory(mockItems);
            expect(testInventory.hasItem(['the', 'pencil'])).toBe(true);
        });
    });
});
