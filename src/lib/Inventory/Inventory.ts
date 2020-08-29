import { iInventory } from '../../ts/interfaces';
import { Item } from '../../ts/types';

export abstract class Inventory implements iInventory {
    items: Item[];

    constructor(itemArr: Item[]) {
        this.items = itemArr;
    }

    showItems(): string {
        const names = this.items.map((obj) => {
            return obj.itemName;
        });

        if (names.length <= 1) {
            return "You don't have anything in your pockets";
        }

        return names.join(', ');
    }

    findItem(passedItemArr: string[]): { hasItem: boolean; item: Item } {
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

        if (this.items.length <= 0) {
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

    addItem(itemToAdd: Item) {
        return this.items.push(itemToAdd);
    }

    removeItem(itemToRemove: Item): Item[] {
        return this.items.filter((item) => {
            return item.itemName !== itemToRemove.itemName;
        });
    }
}
