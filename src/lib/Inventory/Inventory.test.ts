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

const fakeItem: Item = {
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

describe('Inventory class', () => {
    describe('add() method', () => {
        test('Adds new item to inventory', () => {
            // Setup
            const inventory = new Inventory();
            inventory.add(fakeInventory);

            expect(inventory.size()).toBe(2);

            inventory.add(fakeItem);

            expect(inventory.size()).toBe(3);
        });
    });
    describe('find() method', () => {
        test('Finds an item if it has that item', () => {
            // Setup
            const inventory = new Inventory();
            inventory.add(fakeInventory);

            const result = inventory.find(['the', 'pencil']);

            expect(result.canTake).toBe(true);
        });
    });
    describe('size() method', () => {
        test('Returns quantity of items in inventory', () => {
            // Setup
            const inventory = new Inventory();
            inventory.add(fakeItem);

            expect(inventory.size()).toBe(1);
        });
    });
    describe('description() method', () => {
        test('Returns comma-separated list of items if inventory contains more than one item', () => {
            // Setup
            const inventory = new Inventory();
            inventory.add(fakeInventory);

            expect(inventory.description()).toBe(
                "Here's what you have in your pockets: pencil, mug"
            );
        });
        test('Returns single item if only one item is in inventory', () => {
            // Setup
            const inventory = new Inventory();
            inventory.add(fakeItem);

            expect(inventory.description()).toBe(
                "Here's what you have in your pockets: camera"
            );
        });
        test('Returns empty inventory message if inventory contains no items', () => {
            // Setup
            const inventory = new Inventory();

            expect(inventory.description()).toBe(
                "You don't have anything in your pockets"
            );
        });
    });
});
