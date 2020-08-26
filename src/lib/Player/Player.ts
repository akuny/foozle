import Inventory from '../Inventory';
import { iPlayerPayload } from '../../ts/interfaces';

export class Player extends Inventory {
    alive: boolean;

    constructor(player: iPlayerPayload) {
        super(player.inventory);
        this.alive = player.alive;
    }
}
