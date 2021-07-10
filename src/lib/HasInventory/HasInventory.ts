import { IInventory } from '../../ts/interfaces';
import { Item } from '../../ts/types';

export abstract class HasInventory {
    inventory: IInventory;

    constructor(inventory: IInventory, items: Item[]) {
        this.inventory = inventory;
        this.inventory.add(items);
    }

    drop(item: Item): void {
        this.inventory.remove(item);
    }

    look(): string {
        return this.inventory.description();
    }

    search(terms: string[]): Item {
        return this.inventory.find(terms);
    }

    take(item: Item): void {
        this.inventory.add(item);
    }
}
