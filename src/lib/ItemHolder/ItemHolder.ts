import { iItemHolder, iItem } from '../../ts/interfaces';

export abstract class ItemHolder implements iItemHolder {
    items: iItem[];

    constructor(itemArr: iItem[]) {
        this.items = itemArr;
    }

    hasItem(itemNames: string[]): boolean {
        let hasItem = false;
        itemNames.forEach((itemName) => {
            this.items.find((itemObj) => {
                if (itemObj.itemName.toLowerCase() === itemName) {
                    hasItem = true;
                }
            });
        });
        return hasItem;
    }
}
