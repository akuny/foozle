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
    {
        id: 77,
        itemName: 'mug',
        isKey: false,
        canTake: true,
        canUse: true,
        canUseIn: '',
        takeResult: 'You pick up the mug',
        useResult: 'You drink the coffe in the mug.',
        triggers: ['drinkCoffee'],
    },
];

const fakeItem = {
    id: 88,
    itemName: 'camera',
    isKey: false,
    canTake: true,
    canUse: true,
    canUseIn: '',
    takeResult: "You pick up the camera. It's pretty heavy.",
    useResult: 'You take a snazy picture.',
    triggers: ['becomeFamouse'],
};

class TestClass extends Inventory {
    constructor(inventoryArr: Item[]) {
        super(inventoryArr);
    }
}

describe('Inventory class', () => {
    describe('addItem() method', () => {
        test('Adds new item to inventory', () => {
            const testInstance = new TestClass(fakeInventory);
            testInstance.addItem(fakeItem);

            expect(testInstance.getInventoryLength()).toBe(3);
        });
    });
    describe('findItem() method', () => {
        test('Returns true if item is in inventory', () => {
            const testInstance = new TestClass(fakeInventory);
            const result = testInstance.findItem(['the', 'pencil']);

            expect(result.hasItem).toBe(true);
        });
    });
    describe('showItems() method', () => {
        test('Returns comma-separated list of itemName values if inventory contains more than one item', () => {
            const testInstance = new TestClass(fakeInventory);

            expect(testInstance.showItems()).toBe('pencil, mug');
        });
        test('Returns single itemName value if only one item is in inventory', () => {
            const testInstance = new TestClass([
                {
                    id: 66,
                    itemName: 'pencil',
                    isKey: false,
                    canTake: true,
                    canUse: true,
                    canUseIn: '',
                    takeResult: 'You pick up the pencil',
                    useResult:
                        'You write a reminder to yourself to pick up milk.',
                    triggers: ['writeNote'],
                },
            ]);

            expect(testInstance.showItems()).toBe('pencil');
        });
        test('Returns empty inventory message if inventory contains no items', () => {
            const testInstance = new TestClass([]);

            expect(testInstance.showItems()).toBe(
                "You don't have anything in your pockets"
            );
        });
    });
});
