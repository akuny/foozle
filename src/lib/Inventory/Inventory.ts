import { iInventory, iItem } from '../../ts/interfaces';

export class Inventory implements iInventory {
    items: iItem[];

    constructor(itemArr: iItem[]) {
        this.items = itemArr;
    }

    hasItem(itemNames: string[]) {
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
