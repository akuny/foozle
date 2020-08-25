export interface iCommand {
    isValid(): boolean;
    getPayload(): iCommandPayload;
}

export interface iCommandPayload {
    type: string;
    action: string;
    items: string[];
}

export interface iDisk {
    player: iPlayer;
    rooms: iRoom[];
}

export interface iItem {
    id: number;
    itemName: string;
    canTake: boolean;
    canUseOn: string[];
    result: string;
}

export interface iPlayer {
    alive: boolean;
    inventory: iItem[];
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
