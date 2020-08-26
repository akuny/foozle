import { iPlayer, iPlayerPayload } from '../../ts/interfaces';
import Inventory from '../Inventory';

export class Player implements iPlayer {
    alive: boolean;
    inventory: Inventory;

    constructor(player: iPlayerPayload) {
        this.alive = player.alive;
        this.inventory = new Inventory(player.inventory);
    }

    hasInInventory(itemNames: string[]) {
        return this.inventory.hasItem(itemNames);
    }
}
