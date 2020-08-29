import { iInventory, iItem, iItemPayload } from '../../ts/interfaces';

export abstract class Inventory implements iInventory {
    items: iItem[];

    constructor(itemArr: iItem[]) {
        this.items = itemArr;
    }

    showItems(): string {
        const names = this.items.map((obj) => {
            return obj.itemName;
        });

        if (names.length <= 1) {
            return names[0];
        }

        return names.join(', ');
    }

    findItem(passedItemArr: string[]): iItemPayload {
        const emptyItem = {
            hasItem: false,
            item: {
                id: 0,
                itemName: '',
                canTake: false,
                isKey: false,
                canUseIn: '',
                result: '',
                descriptionPhrase: '',
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

    addItem(itemToAdd: iItem) {
        return this.items.push(itemToAdd);
    }

    removeItem(itemToRemove: iItem): iItem[] {
        return this.items.filter((item) => {
            return item.itemName !== itemToRemove.itemName;
        });
    }
}
