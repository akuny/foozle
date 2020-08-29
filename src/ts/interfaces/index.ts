import { Item } from '../types';

export interface iCommand {
    getPayload(): {
        type: string;
        action: string;
        items: string[];
    };
    isValid(): boolean;
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
    hasConnection(direction: string): { hasRoom: boolean; newRoom: string };
    showCurrentRoomState(): string;
    updateCurrentRoomState(item: Item): void;
}
