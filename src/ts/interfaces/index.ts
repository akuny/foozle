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
    player: iPlayerPayload;
    rooms: iRoom[];
}

export interface iInventory {
    hasItem(itemNames: string[]): boolean;
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
    inventory: iInventory;
    hasInInventory(itemNames: string[]): boolean;
}

export interface iPlayerPayload {
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
