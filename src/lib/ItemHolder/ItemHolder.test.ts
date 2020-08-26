import { ItemHolder } from './ItemHolder';
import { iItem } from '../../ts/interfaces';

describe('Inventory class', () => {
    describe('hasInInventory() method', () => {
        test('Returns true if item is in inventory', () => {
            const mockInventory: iItem[] = [
                {
                    id: 66,
                    itemName: 'Pencil',
                    canTake: true,
                    canUseOn: [''],
                    result: 'You write your name!',
                },
            ];

            class TestClass extends ItemHolder {
                constructor(inventoryArr: iItem[]) {
                    super(inventoryArr);
                }
            }
            const testInstance = new TestClass(mockInventory);
            expect(testInstance.hasItem(['the', 'pencil'])).toBe(true);
        });
    });
});
