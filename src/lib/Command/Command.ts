import { ICommand } from '../../ts/interfaces';

import {
    MOVEMENT_COMMANDS,
    USE_COMMANDS,
    TAKE_COMMANDS,
    UTILITY_COMMANDS,
    ALL_COMMANDS,
} from './commands';

export class Command implements ICommand {
    private valid: boolean;
    private type: string;
    private action: string;
    private items: string[];

    constructor(rawInput: string) {
        this.valid = false;
        this.type = '';
        this.action = '';
        this.items = ['none'];
        this.validate(rawInput);
    }

    isValid() {
        return this.valid;
    }

    getPayload() {
        return {
            type: this.type,
            action: this.action,
            items: this.items,
        };
    }

    private validate(rawInput: string) {
        const splitInput = rawInput.toLowerCase().trim().split(' ');

        splitInput.forEach((word) => {
            if (ALL_COMMANDS.includes(word)) {
                this.valid = true;
                this.action = word;
            } else {
                this.items = this.items.filter((str) => {
                    return str !== 'none';
                });
                this.items.push(word);
            }

            if (MOVEMENT_COMMANDS.includes(word)) {
                this.handleMovementCommand(word);
            }

            if (USE_COMMANDS.includes(word)) {
                this.handleUseCommand(word);
            }

            if (TAKE_COMMANDS.includes(word)) {
                this.handleTakeCommand(word);
            }

            if (UTILITY_COMMANDS.includes(word)) {
                this.handleUtilityCommand(word);
            }
        });
    }

    private handleMovementCommand(word: string) {
        switch (word) {
            case 'n':
                this.action = 'north';
                break;
            case 's':
                this.action = 'south';
                break;
            case 'e':
                this.action = 'east';
                break;
            case 'w':
                this.action = 'west';
                break;
            default:
                break;
        }
        this.type = 'move';
    }

    private handleUseCommand(word: string) {
        this.type = 'use';
    }

    private handleTakeCommand(word: string) {
        this.type = 'take';
    }

    private handleUtilityCommand(word: string) {
        switch (this.action) {
            case 'h':
                this.action = 'help';
                break;
            case 'l':
                this.action = 'look';
                break;
            case 'i':
                this.action = 'inventory';
                break;
            default:
                break;
        }
        this.type = 'other';
    }
}
