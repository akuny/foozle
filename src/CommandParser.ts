export interface iCommand {
    isValid: boolean;
    type: string;
    action: string;
    item: string;
}

export class CommandParser {
    validCommands: string[];

    constructor() {
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
    }

    processRawInput(rawInput: string) {
        return this.validate(rawInput);
    }

    validate(rawInput: string) {
        const input: string = rawInput.toLowerCase().trim();
        let item = '';
        const splitInput = input.split(' ');

        if (splitInput.length > 0) {
            item = splitInput[1];
        }

        let result: iCommand = {
            isValid: false,
            type: '',
            action: input,
            item: item,
        };

        if (this.validCommands.includes(input)) {
            result.isValid = true;

            switch (result.action) {
                case 'n':
                    result.action = 'north';
                    break;
                case 's':
                    result.action = 'south';
                    break;
                case 'e':
                    result.action = 'east';
                    break;
                case 'w':
                    result.action = 'west';
                    break;
                case 'h':
                    result.action = 'help';
                    break;
                case 'l':
                    result.action = 'look';
                    break;
                case 'i':
                    result.action = 'inventory';
                    break;
                default:
                    break;
            }

            switch (result.action) {
                case 'north':
                case 'south':
                case 'east':
                case 'west':
                    result.type = 'move';
                case 'use':
                    result.type = 'use';
                    result.item = item;
                case 'help':
                case 'look':
                case 'inventory':
                    result.type = 'move';
                default:
                    break;
            }

            return result;
        }

        return result;
    }
}
