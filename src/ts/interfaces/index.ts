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
    findItem(itemNames: string[]): object;
    removeItem(itemToRemove: iItem): iItem[];
}

export interface iItem {
    id: number;
    itemName: string;
    canTake: boolean;
    isKey: boolean;
    canUseIn: string;
    result: string;
    descriptionPhrase?: string;
    triggers: string[];
}

export interface iItemPayload {
    hasItem: boolean;
    item: iItem;
}

export interface iPlayerPayload {
    alive: boolean;
    inventory: iItem[];
}

export interface iRoom {
    name: string;
    hasPlayer: boolean;
    connections: iRoomConnection[];
    roomStates: iRoomState[];
    items: iItem[];
}

export interface iRoomState {
    active: boolean;
    trigger: string;
    description: string;
}

export interface iRoomConnection {
    direction: string;
    room: string;
    locked: boolean;
}
