import { IGame } from '../../ts/interfaces';
import { Disk, GameState } from '../../ts/types';
import Command from '../Command';
import Display from '../Display';
import Game from '../Game';

export class App {
    game: IGame;
    target: HTMLDivElement;
    display: Display;

    constructor(target: HTMLDivElement, disk: Disk) {
        this.game = new Game(disk);
        this.target = target;
        this.display = new Display(
            this.target,
            this.handleUserInput.bind(this)
        );
    }

    init(): void {
        this.display.turnOn(this.game.start());
    }

    handleUserInput(userInput: string): void {
        let command = new Command(userInput);

        if (!command.isValid()) {
            return this.display.show(
                'Sorry, that\'s an invalid command. Enter "help" to see a list of valid commands.'
            );
        }

        const { game, description }: GameState = this.game.update(command);
        this.game = game;
        this.display.show(description);
    }
}
