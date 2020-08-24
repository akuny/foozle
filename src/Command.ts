export interface iCommand {
    isValid(): boolean;
    getCommand(): {
        type: string;
        action: string;
        item: string;
    };
}

export class Command {
    private valid: boolean;
    private type: string;
    private action: string;
    private item: string;
    private validMovementCommands: string[];
    private validUseCommands: string[];
    private validUtilityCommands: string[];

    constructor(rawInput: string) {
        this.valid = false;
        this.type = '';
        this.action = '';
        this.item = '';
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
        this.validUseCommands = ['use', 'play', 'take'];
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
            item: this.item,
        };
    }

    private validate(rawInput: string) {
        const trimmedInput = rawInput.toLowerCase().trim();
        const splitInput = trimmedInput.split(' ');

        this.action = splitInput[0];

        if (splitInput.length > 1) {
            this.item = splitInput[1];
        }

        if (this.validMovementCommands.includes(this.action)) {
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
                default:
                    break;
            }

            return (this.type = 'move');
        }

        if (this.validUseCommands.includes(this.action)) {
            this.valid = true;
            return (this.type = 'use');
        }

        if (this.validUtilityCommands.includes(this.action)) {
            this.valid = true;
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
            return (this.type = 'other');
        }
    }
}
