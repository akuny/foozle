import { IInventory } from '../../ts/interfaces';
import { Item } from '../../ts/types';

export abstract class Inventory implements IInventory {
    items: Item[];

    constructor(itemArr: Item[]) {
        this.items = itemArr.map((item) => item);
    }

    addItem(itemToAdd: Item) {
        return this.items.push(itemToAdd);
    }

    findItem(passedItemArr: string[]) {
        const emptyItem = {
            hasItem: false,
            item: {
                id: 0,
                itemName: '',
                isKey: false,
                canTake: false,
                canUse: true,
                canUseIn: '',
                takeResult: "You can't take that!",
                useResult: "You can't use that!",
                triggers: [''],
            },
        };

        if (this.getItemsArr().length === 0) {
            return emptyItem;
        }

        const [itemSearchResult] = this.items.filter((item) => {
            return passedItemArr.includes(item.itemName);
        });

        if (itemSearchResult) {
            return { hasItem: true, item: itemSearchResult };
        }

        return emptyItem;
    }

    getInventoryLength() {
        return this.getItemsArr().length;
    }

    removeItem(itemToRemove: Item) {
        return this.items.filter((item) => {
            return item.itemName !== itemToRemove.itemName;
        });
    }

    showItems() {
        const names = this.getItemsArr().map((obj) => {
            return obj.itemName;
        });

        if (names.length === 0) {
            return 'You don\'t have anything in your pockets';
        }

        return `Here's what you have in your pockets: ${names.join(', ')}`;
    }

    private getItemsArr() {
        return this.items.filter((item) => {
            return item.id !== 0;
        });
    }
}
