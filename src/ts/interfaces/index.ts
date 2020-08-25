export interface iCommand {
    isValid(): boolean;
    getCommand(): {
        type: string;
        action: string;
        items: string[];
    };
}

export interface iGame {
    player: iPlayer;
    rooms: iRoom[];
}

export interface iItem {
    item: {
        id: number;
        itemName: string;
        canUse: boolean;
        result: string;
    }[];
}

export interface iPlayer {
    alive: boolean;
    inventory: string[];
}

export interface iRoom {
    name: string;
    description: string;
    hasPlayer: boolean;
    connections: iRoomConnection[];
    items: iItem[];
}

export interface iRoomConnection {
    direction: string;
    room: string;
    locked: boolean;
}
