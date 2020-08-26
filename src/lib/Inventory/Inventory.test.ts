import { Inventory } from './Inventory';
import { iItem } from '../../ts/interfaces';

describe('ItemHolder class', () => {
    describe('findItem() method', () => {
        test('Returns true if item is in inventory', () => {
            const mockInventory: iItem[] = [
                {
                    id: 66,
                    itemName: 'Pencil',
                    canTake: true,
                    canUseOn: '',
                    result: 'You write your name!',
                    descriptionPhrase: 'It is on the table. ',
                    triggers: ['bigParty'],
                },
            ];

            class TestClass extends Inventory {
                constructor(inventoryArr: iItem[]) {
                    super(inventoryArr);
                }
            }
            const testInstance = new TestClass(mockInventory);
            const result = testInstance.findItem(['the', 'Pencil']);

            expect(result.hasItem).toBe(true);
        });
    });
});
