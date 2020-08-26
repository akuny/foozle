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

        return names.join(', ');
    }

    findItem(passedItemArr: string[]): iItemPayload {
        const emptyItem = {
            hasItem: false,
            item: { id: 0, itemName: '', result: '', descriptionPhrase: '' },
        };

        if (this.items.length <= 0) {
            return emptyItem;
        }

        const lowerCaseItemArr = passedItemArr.map((name) => {
            return name.toLowerCase().trim();
        });

        const [result] = this.items.filter((item) => {
            return lowerCaseItemArr.includes(
                item.itemName.toLowerCase().trim()
            );
        });

        if (typeof result !== 'undefined') {
            return { hasItem: true, item: result };
        }
        return emptyItem;
    }

    addItem(itemToAdd: iItem) {
        this.items.push(itemToAdd);
    }

    removeItem(itemToRemove: iItem): iItem[] {
        return this.items.filter((item) => {
            item.itemName !== itemToRemove.itemName;
        });
    }
}
