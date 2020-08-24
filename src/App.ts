import { Command, iCommand } from './Command';
import { Display } from './Display';
import { Game } from './Game';

const game = require('../game.json');

export class App {
    target: HTMLDivElement;
    display: Display;
    gameState: Game;

    constructor(target: HTMLDivElement) {
        this.target = target;
        this.display = new Display(this, this.target);
        this.gameState = new Game(game);
    }

    init() {
        this.display.turnOn(this.gameState.getCurrentRoom());
    }

    handleUserInput(userInput: string) {
        let command = new Command(userInput);

        if (command.isValid()) {
            return this.updateGame(command);
        }

        return this.display.render("That's an invalid command, amigo");
    }

    private updateGame(command: iCommand) {
        this.gameState.update(command, (newGamestate, output) => {
            this.gameState = newGamestate;
            return this.display.render(output);
        });
    }
}
