import { GameState, Item } from '../types';

export interface ICommand {
    getPayload(): {
        type: string;
        action: string;
        items: string[];
    };
    isValid(): boolean;
}

export interface IDisplay {
    show(description: string): void;
    turnOn(description: string): void;
}

export interface IGame {
    start(): string;
    update(command: ICommand): GameState;
}

export interface IHasInventory {
    drop(): boolean;
    look(): string;
    search(items: string[]): Item;
    take(): boolean;
}

export interface IInventory {
    add(item: Item | Item[]): void;
    remove(itemToRemove: Item): void;
    find(itemNames: string[]): Item;
    size(): number;
    description(): string;
}

export interface IPlayer {
    isAlive(): boolean;
}

export interface IRoom {
    hasConnection(direction: string): { hasRoom: boolean; newRoom: string };
    showState(): string;
    updateState(item: Item): void;
}
