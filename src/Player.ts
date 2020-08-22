export interface iPlayer {
    alive: boolean;
    inventory: string[];
}

export class Player {
    alive: boolean;
    inventory: string[];

    constructor(player: iPlayer) {
        this.alive = player.alive;
        this.inventory = player.inventory;
    }

    hasInInventory(item: string) {
        let thisItem = this.inventory.find((i) => i === item);
        let result = thisItem === undefined ? false : true;
        return result;
    }
}
