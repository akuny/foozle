import ItemHolder from '../ItemHolder';
import { iPlayerPayload } from '../../ts/interfaces';

export class Player extends ItemHolder {
    alive: boolean;

    constructor(player: iPlayerPayload) {
        super(player.inventory);
        this.alive = player.alive;
    }
}
