import { iCommand } from '../../ts/interfaces';

export class Command implements iCommand {
    private valid: boolean;
    private type: string;
    private action: string;
    private items: string[];
    private validMovementCommands: string[];
    private validUseCommands: string[];
    private validTakeCommands: string[];
    private validUtilityCommands: string[];

    constructor(rawInput: string) {
        this.valid = false;
        this.type = '';
        this.action = '';
        this.items = ['none'];
        this.validMovementCommands = [
            'n',
            'north',
            's',
            'south',
            'e',
            'east',
            'w',
            'west',
        ];
        this.validUseCommands = ['use', 'play', 'open'];
        this.validTakeCommands = ['take'];
        this.validUtilityCommands = [
            'h',
            'help',
            'l',
            'look',
            'i',
            'inventory',
        ];
        this.validate(rawInput);
    }

    isValid() {
        return this.valid;
    }

    getCommand() {
        return {
            type: this.type,
            action: this.action,
            items: this.items,
        };
    }

    private validate(rawInput: string) {
        const trimmedInput = rawInput.toLowerCase().trim();
        const splitInput = trimmedInput.split(' ');

        for (let i = 0; i < splitInput.length; i++) {
            if (this.validMovementCommands.includes(splitInput[i])) {
                this.valid = true;
                this.action = splitInput[i];

                switch (this.action) {
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

            if (this.validUseCommands.includes(splitInput[i])) {
                this.valid = true;
                this.action = splitInput[i];
                this.type = 'use';
            }

            if (this.validTakeCommands.includes(splitInput[i])) {
                this.valid = true;
                this.action = splitInput[i];
                this.type = 'take';
            }

            if (this.validUtilityCommands.includes(splitInput[i])) {
                this.valid = true;
                this.action = splitInput[i];
                switch (this.action) {
                    case 'h':
                        this.action = 'help';
                        break;
                    case 'l':
                        this.action = 'look';
                        break;
                    case 'iprivate items: string[];':
                        this.action = 'inventory';
                        break;
                    default:
                        break;
                }
                this.type = 'other';
            }

            const allCommands = this.validMovementCommands
                .concat(this.validTakeCommands)
                .concat(this.validUseCommands)
                .concat(this.validUtilityCommands);

            if (!allCommands.includes(splitInput[i])) {
                console.log('ELSE!!!!!!!!!');

                const cleanItemsArr = this.items.filter((str) => {
                    return str !== 'none';
                });
                this.items = cleanItemsArr;
                this.items.push(splitInput[i]);
            }
        }
    }
}
