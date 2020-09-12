import { iInventory } from '../../ts/interfaces';
import { Item } from '../../ts/types';

export abstract class Inventory implements iInventory {
    items: Item[];

    constructor(itemArr: Item[] | []) {
        this.items = [];
        itemArr.forEach((item) => this.items.push(item));
    }

    addItem(itemToAdd: Item) {
        return this.items.push(itemToAdd);
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

    getInventoryLength(): number {
        return this.getItemsArr().length;
    }

    removeItem(itemToRemove: Item): Item[] {
        return this.items.filter((item) => {
            return item.itemName !== itemToRemove.itemName;
        });
    }

    showItems(): string {
        const names = this.getItemsArr().map((obj) => {
            return obj.itemName;
        });

        if (names.length === 0) {
            return "You don't have anything in your pockets";
        }

        return names.join(', ');
    }

    private getItemsArr(): Item[] {
        return this.items.filter((item) => {
            return item.id !== 0;
        });
    }
}
