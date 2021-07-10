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

export interface IInventory {
    findItem(itemNames: string[]): object;
    removeItem(itemToRemove: Item): Item[];
}

export interface IPlayer extends IInventory {
    isAlive(): boolean;
}

export interface IRoom extends IInventory {
    hasConnection(direction: string): { hasRoom: boolean; newRoom: string };
    showState(): string;
    updateState(item: Item): void;
}
