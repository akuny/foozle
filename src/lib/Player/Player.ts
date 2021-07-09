import { IPlayer } from '../../ts/interfaces';
import { Item } from '../../ts/types';
import Inventory from '../Inventory';

export class Player extends Inventory implements IPlayer {
    alive: boolean;

    constructor(player: { alive: boolean; inventory: Item[] }) {
        super(player.inventory);
        this.alive = player.alive;
    }

    isAlive() {
        return this.alive;
    }
}
