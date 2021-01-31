import { iCommand, iDisk } from '../../ts/interfaces';
import Command from '../Command';
import Display from '../Display';
import Game from '../Game';

export class App {
    target: HTMLDivElement;
    display: Display;
    gameState: Game;

    constructor(target: HTMLDivElement, disk: iDisk) {
        this.target = target;
        this.display = new Display(this, this.target);
        this.gameState = new Game(disk);
    }

    init() {
        this.display.turnOn(this.gameState.getCurrentRoom());
    }

    handleUserInput(userInput: string) {
        let command = new Command(userInput);

        if (command.isValid()) {
            return this.updateGame(command);
        }

        return this.display.render('Sorry, that\'s an invalid command. Enter "help" to see a list of valid commands.');
    }

    private updateGame(command: iCommand) {
        this.gameState.update(command, (newGamestate, output) => {
            this.gameState = newGamestate;
            return this.display.render(output);
        });
    }
}
