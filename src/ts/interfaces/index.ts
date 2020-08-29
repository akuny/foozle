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

export interface iDisplay {
    render(description: string): void;
    turnOn(description: string): void;
}

export interface iInventory {
    findItem(itemNames: string[]): object;
    removeItem(itemToRemove: iItem): iItem[];
}

export interface iItem {
    id: number;
    itemName: string;
    isKey: boolean;
    canTake: boolean;
    canUse: boolean;
    canUseIn: string;
    takeResult: string;
    useResult: string;
    triggers: string[];
}

export interface iItemPayload {
    hasItem: boolean;
    item: iItem;
}

export interface iGame {
    getCurrentRoom(): string;
    update(
        command: iCommandPayload,
        cb: (game: iGame, output: string) => void
    ): void;
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
