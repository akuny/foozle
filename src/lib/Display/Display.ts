import { IDisplay } from '../../ts/interfaces';
import App from '../App';

export class Display implements IDisplay {
    app: App;
    target: HTMLDivElement;
    commandLine: HTMLFormElement;
    inputField: HTMLInputElement;
    screen: HTMLUListElement;

    constructor(app: App, target: HTMLDivElement) {
        this.app = app;
        this.target = target;
        this.commandLine = document.createElement('form');
        this.inputField = document.createElement('input');
        this.inputField.setAttribute('id', 'terminal');
        this.inputField.setAttribute('class', 'terminal');
        this.commandLine.appendChild(this.inputField);
        this.screen = document.createElement('ul');
    }

    show(description: string) {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(description));
        this.screen.appendChild(li);
    }

    turnOn(firstRoomDescription: string) {
        let welcome = document.createElement('li');
        welcome.appendChild(document.createTextNode('Welcome to foozle. Enter "help" to see a list of valid commands.'));
        this.screen.appendChild(welcome);
        let begin = document.createElement('li');
        begin.appendChild(document.createTextNode(firstRoomDescription));
        this.screen.appendChild(begin);

        this.target.appendChild(this.screen);
        this.target.appendChild(this.commandLine);

        const input = this.inputField;
        input.focus();
        this.commandLine.addEventListener('submit', (e) => {
            e.preventDefault();
            this.app.handleUserInput(input.value);
            input.value = '';
        });
    }
}
