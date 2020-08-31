import { Inventory } from './Inventory';
import { Item } from '../../ts/types';

const fakeInventory: Item[] = [
    {
        id: 66,
        itemName: 'pencil',
        isKey: false,
        canTake: true,
        canUse: true,
        canUseIn: '',
        takeResult: 'You pick up the pencil',
        useResult: 'You write a reminder to yourself to pick up milk.',
        triggers: ['writeNote'],
    },
];

const fakeItem = {
    id: 77,
    itemName: 'camera',
    isKey: false,
    canTake: true,
    canUse: true,
    canUseIn: '',
    takeResult: "You pick up the camera. It's pretty heavy.",
    useResult: 'You take a snazy picture.',
    triggers: ['becomeFamouse'],
};

describe('ItemHolder class', () => {
    describe('addItem() method', () => {
        test('Adds new item to inventory', () => {
            class TestClass extends Inventory {
                constructor(inventoryArr: Item[]) {
                    super(inventoryArr);
                }
            }
            const testInstance = new TestClass(fakeInventory);
            testInstance.addItem(fakeItem);
            expect(testInstance.items.length).toBe(2);
        });
    });
    describe('findItem() method', () => {
        test('Returns true if item is in inventory', () => {
            class TestClass extends Inventory {
                constructor(inventoryArr: Item[]) {
                    super(inventoryArr);
                }
            }
            const testInstance = new TestClass(fakeInventory);
            const result = testInstance.findItem(['the', 'pencil']);

            expect(result.hasItem).toBe(true);
        });
    });
});
