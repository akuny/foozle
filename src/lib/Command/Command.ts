import { iCommand } from '../../ts/interfaces';

import {
    validMovementCommands,
    validUseCommands,
    validTakeCommands,
    validUtilityCommands,
} from './commands';

export class Command implements iCommand {
    private valid: boolean;
    private type: string;
    private action: string;
    private items: string[];
    private validMovementCommands: string[];
    private validUseCommands: string[];
    private validTakeCommands: string[];
    private validUtilityCommands: string[];
    private allCommands: string[];

    constructor(rawInput: string) {
        this.valid = false;
        this.type = '';
        this.action = '';
        this.items = ['none'];
        this.validMovementCommands = validMovementCommands;
        this.validUseCommands = validUseCommands;
        this.validTakeCommands = validTakeCommands;
        this.validUtilityCommands = validUtilityCommands;
        this.allCommands = this.validMovementCommands
            .concat(this.validTakeCommands)
            .concat(this.validUseCommands)
            .concat(this.validUtilityCommands);
        this.validate(rawInput);
    }

    isValid(): boolean {
        return this.valid;
    }

    getPayload(): { type: string; action: string; items: string[] } {
        return {
            type: this.type,
            action: this.action,
            items: this.items,
        };
    }

    private validate(rawInput: string) {
        const splitInput = rawInput.toLowerCase().trim().split(' ');

        splitInput.forEach((word) => {
            if (this.allCommands.includes(word)) {
                this.valid = true;
                this.action = word;
            } else {
                this.items = this.items.filter((str) => {
                    return str !== 'none';
                });
                this.items.push(word);
            }

            if (this.validMovementCommands.includes(word)) {
                this.handleMovementCommand(word);
            }

            if (this.validUseCommands.includes(word)) {
                this.handleUseCommand(word);
            }

            if (this.validTakeCommands.includes(word)) {
                this.handleTakeCommand(word);
            }

            if (this.validUtilityCommands.includes(word)) {
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
