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
            item: {
                id: 0,
                itemName: '',
                result: '',
                descriptionPhrase: '',
                triggers: [''],
            },
        };

        if (this.items.length <= 0) {
            return emptyItem;
        }

        // TODO clean up
        const [result] = this.items.filter((item) => {
            return passedItemArr.includes(item.itemName);
        });

        if (typeof result !== 'undefined') {
            return { hasItem: true, item: result };
        }
        return emptyItem;
    }

    addItem(itemToAdd: iItem) {
        return this.items.push(itemToAdd);
    }

    removeItem(itemToRemove: iItem): iItem[] {
        //TODO clean up
        return this.items.filter((item) => {
            return item.itemName !== itemToRemove.itemName;
        });
    }
}
