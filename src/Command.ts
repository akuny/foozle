export interface iCleanCommand {
    type: string;
    action: string;
    item: string;
}

export class Command {
    rawInput: string;
    valid: boolean;
    type: string;
    action: string;
    item: string;
    validCommands: string[];

    constructor(rawInput: string) {
        this.rawInput = '';
        this.valid = false;
        this.type = '';
        this.action = '';
        this.item = '';
        this.validCommands = [
            'n',
            'north',
            's',
            'south',
            'e',
            'east',
            'w',
            'west',
            'h',
            'help',
            'l',
            'look',
            'i',
            'inventory',
            'u',
            'use',
        ];
        this.validate(rawInput);
    }

    validate(rawInput: string) {
        const trimmedInput = rawInput.toLowerCase().trim();
        const splitInput = trimmedInput.split(' ');

        this.action = splitInput[0];

        if (splitInput.length > 1) {
            this.item = splitInput[1];
        }

        if (this.validCommands.includes(this.action)) {
            this.valid = true;

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
                case 'h':
                    this.action = 'help';
                    break;
                case 'l':
                    this.action = 'look';
                    break;
                case 'i':
                    this.action = 'inventory';
                    break;
                case 'u':
                    this.action = 'use';
                    break;
                default:
                    break;
            }

            switch (this.action) {
                case 'north':
                case 'south':
                case 'east':
                case 'west':
                    this.type = 'move';
                    break;
                case 'use':
                    this.type = 'use';
                    break;
                case 'help':
                case 'look':
                case 'inventory':
                    this.type = 'other';
                    break;
                default:
                    break;
            }

            return this;
        }

        return this;
    }

    isValid() {
        return this.valid;
    }

    getCleanCommand() {
        return {
            type: this.type,
            action: this.action,
            item: this.item,
        };
    }
}
