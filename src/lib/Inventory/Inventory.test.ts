import { Inventory } from './Inventory';
import { Item } from '../../ts/types';

describe('ItemHolder class', () => {
    describe('findItem() method', () => {
        test('Returns true if item is in inventory', () => {
            const mockInventory: Item[] = [
                {
                    id: 66,
                    itemName: 'Pencil',
                    isKey: false,
                    canTake: true,
                    canUse: true,
                    canUseIn: '',
                    takeResult: 'You pick up the pencil',
                    useResult: 'You write your name',
                    triggers: ['bigParty'],
                },
            ];

            class TestClass extends Inventory {
                constructor(inventoryArr: Item[]) {
                    super(inventoryArr);
                }
            }
            const testInstance = new TestClass(mockInventory);
            const result = testInstance.findItem(['the', 'Pencil']);

            expect(result.hasItem).toBe(true);
        });
    });
});
