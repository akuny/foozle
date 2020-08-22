interface iRoomConnection {
    direction: string;
    room: string;
}

interface iRoomFixedItems {
    canUse: { item: string; result: string }[];
}

interface iRoomMoveableItems {
    canTake: {
        id: number;
        itemName: string;
        canUseOn: string;
        result: string;
    }[];
}

export interface iRoom {
    name: string;
    description: string;
    hasPlayer: boolean;
    connections: iRoomConnection[];
    canUse: iRoomFixedItems[];
    canTake: iRoomMoveableItems[];
}

export class Room {
    name: string;
    description: string;
    hasPlayer: boolean;
    connections: iRoomConnection[];
    canUse: iRoomFixedItems[];
    canTake: iRoomMoveableItems[];

    constructor(room: iRoom) {
        this.name = room.name;
        this.description = room.description;
        this.hasPlayer = room.hasPlayer;
        this.connections = room.connections;
        this.canUse = room.canUse;
        this.canTake = room.canTake;
    }

    hasConnection(direction: string) {
        let result = this.connections.filter((obj) => {
            return obj.direction === direction;
        });

        if (result.length > 0) {
            let matchedDirection = result[0];

            return {
                hasRoom: true,
                newRoom: matchedDirection.room,
            };
        }

        return { hasRoom: false, newRoom: null };
    }
}
