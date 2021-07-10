import { IInventory } from '../../ts/interfaces';
import { Item } from '../../ts/types';

export class Inventory implements IInventory {
    items: Item[] = [];

    add(item: Item | Item[]): void {
        if (Array.isArray(item)) {
            this.items = this.items.concat(item);
        } else {
            this.items.push(item);
        }
    }

    remove(item: Item): void {
        this.items.filter((v) => {
            return v.itemName !== item.itemName;
        });
    }

    find(searchTerms: string[]): Item {
        const nothing: Item = {
            id: 0,
            itemName: '',
            isKey: false,
            canTake: false,
            canUse: false,
            canUseIn: '',
            takeResult: "You can't take that!",
            useResult: "You can't use that!",
            triggers: [''],
        };

        if (this.size() <= 0) {
            return nothing;
        }

        const itemSearchResult = this.items.filter((item) =>
            searchTerms.includes(item.itemName)
        );

        if (itemSearchResult.length === 1) {
            return itemSearchResult[0];
        }

        return nothing;
    }

    size(): number {
        if (this.items.length > 0) {
            return this.items.filter((item) => item.id !== 0).length;
        }

        return 0;
    }

    description(): string {
        const names = this.items
            .map((obj) => obj.itemName)
            .filter((v, i, arr) => arr.indexOf(v) === i);

        if (names.length === 0) {
            return 'You don\'t have anything in your pockets';
        }

        return `Here's what you have in your pockets: ${names.join(', ')}`;
    }
}
