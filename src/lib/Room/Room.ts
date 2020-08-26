import ItemHolder from '../ItemHolder';
import { iRoom, iRoomConnection } from '../../ts/interfaces';

export class Room extends ItemHolder {
    name: string;
    description: string;
    hasPlayer: boolean;
    connections: iRoomConnection[];

    constructor(room: iRoom) {
        super(room.items);
        this.name = room.name;
        this.description = room.description;
        this.hasPlayer = room.hasPlayer;
        this.connections = room.connections;
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
}
