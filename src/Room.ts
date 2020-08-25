interface iRoomConnection {
    direction: string;
    room: string;
    locked: boolean;
}

interface iItem {
    item: {
        id: number;
        itemName: string;
        canUse: boolean;
        result: string;
    }[];
}

export interface iRoom {
    name: string;
    description: string;
    hasPlayer: boolean;
    connections: iRoomConnection[];
    items: iItem[];
}

export class Room {
    name: string;
    description: string;
    hasPlayer: boolean;
    connections: iRoomConnection[];
    items: iItem[];

    constructor(room: iRoom) {
        this.name = room.name;
        this.description = room.description;
        this.hasPlayer = room.hasPlayer;
        this.connections = room.connections;
        this.items = room.items;
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
