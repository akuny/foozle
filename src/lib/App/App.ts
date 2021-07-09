import { IGame } from '../../ts/interfaces';
import { Disk, GameState } from '../../ts/types';
import Command from '../Command';
import Display from '../Display';
import Game from '../Game';

export class App {
    target: HTMLDivElement;
    display: Display;
    game: IGame;

    constructor(target: HTMLDivElement, disk: Disk) {
        this.target = target;
        this.display = new Display(this, this.target);
        this.game = new Game(disk);
    }

    init() {
        this.display.turnOn(this.game.start());
    }

    handleUserInput(userInput: string) {
        let command = new Command(userInput);

        if (!command.isValid()) {
            return this.display.render('Sorry, that\'s an invalid command. Enter "help" to see a list of valid commands.');
        }

        const { game, description }: GameState = this.game.update(command);
        this.game = game;
        return this.display.render(description);
    }
}
