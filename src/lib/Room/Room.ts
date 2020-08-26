import Inventory from '../Inventory';
import { iInventory, iRoom, iRoomConnection } from '../../ts/interfaces';

export class Room {
    name: string;
    description: string;
    hasPlayer: boolean;
    connections: iRoomConnection[];
    inventory: iInventory;

    constructor(room: iRoom) {
        this.name = room.name;
        this.description = room.description;
        this.hasPlayer = room.hasPlayer;
        this.connections = room.connections;
        this.inventory = new Inventory(room.items);
    }

    hasConnection(direction: string) {
        let result = this.connections.filter((obj) => {
            return obj.direction === direction;
        });

        if (result.length > 0) {
            let matchedDirection = result[0];

            if (!matchedDirection.locked) {
                return {
                    hasRoom: true,
                    newRoom: matchedDirection.room,
                };
            }
        }

        return { hasRoom: false, newRoom: null };
    }

    hasInInventory(itemNames: string[]) {
        return this.inventory.hasItem(itemNames);
    }
}
