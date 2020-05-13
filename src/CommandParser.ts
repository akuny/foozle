export interface iCommand {
    isValid: boolean,
    command: string
}

export class CommandParser {

    validCommands: string[];

    constructor() {

        this.validCommands = [
            'n', 'north', 's', 'south', 'e', 'east', 'w', 'west', 'h', 'help',
            'l', 'look', 'i', 'inventory'
        ]

    }

    processRawInput(rawInput: string) {

        return this.validate(rawInput);
        
    }

    validate(rawInput: string) {

        const input: string = rawInput.toLowerCase().trim();

        let result: iCommand = {
            isValid: false,
            command: input
        };

        if (this.validCommands.includes(input)) {
 
            result.isValid = true;

            switch (result.command) {
                case 'n':
                    result.command = 'north';
                    break;
                case 's':
                    result.command = 'south';
                    break;
                case 'e':
                    result.command = 'east';
                    break;
                case 'w':
                    result.command = 'west';
                    break;
                case 'h':
                    result.command = 'help';
                    break;
                case 'l':
                    result.command = 'look';
                    break;
                case 'i':
                    result.command = 'inventory';
                    break;
                default:
                    break;
            }

            return result;

        }

        return result;

    }

}
