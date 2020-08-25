import { iCommandPayload, iDisk } from '../../ts/interfaces';
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
            return this.updateGame(command.getPayload());
        }

        return this.display.render("That's an invalid command, amigo");
    }

    private updateGame(command: iCommandPayload) {
        this.gameState.update(command, (newGamestate, output) => {
            this.gameState = newGamestate;
            return this.display.render(output);
        });
    }
}
