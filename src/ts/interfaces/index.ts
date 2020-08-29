import { Item } from '../types';

export interface iCommand {
    isValid(): boolean;
    getPayload(): {
        type: string;
        action: string;
        items: string[];
    };
}

export interface iDisk {
    player: iPlayer;
    rooms: iRoom[];
}

export interface iDisplay {
    render(description: string): void;
    turnOn(description: string): void;
}

export interface iGame {
    getCurrentRoom(): string;
    update(command: iCommand, cb: (game: iGame, output: string) => void): void;
}

export interface iInventory {
    findItem(itemNames: string[]): object;
    removeItem(itemToRemove: Item): Item[];
}

export interface iPlayer extends iInventory {
    alive: boolean;
}

export interface iRoom extends iInventory {
    changeCurrentRoomState(item: Item): void;
    showCurrentRoomState(): string;
    hasConnection(direction: string): { hasRoom: boolean; newRoom: string };
}
