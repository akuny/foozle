import { iItem, iPlayer } from '../../ts/interfaces';

export class Player {
    alive: boolean;
    inventory: iItem[];

    constructor(player: iPlayer) {
        this.alive = player.alive;
        this.inventory = player.inventory;
    }

    hasInInventory(itemNames: string[]) {
        let hasItem = false;
        itemNames.forEach((itemName) => {
            this.inventory.find((itemObj) => {
                if (itemObj.itemName.toLowerCase() === itemName) {
                    hasItem = true;
                }
            });
        });
        return hasItem;
    }
}
