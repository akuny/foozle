import { IInventory, IPlayer } from '../../ts/interfaces';
import { Item } from '../../ts/types';
import HasInventory from '../HasInventory';

export class Player extends HasInventory implements IPlayer {
    alive: boolean;

    constructor(
        player: { alive: boolean; items: Item[] },
        inventory: IInventory
    ) {
        super(inventory, player.items);

        this.alive = player.alive;
    }

    isAlive() {
        return this.alive;
    }
}
