import { App } from './App';

export class Display {
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

    render(description: string) {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(description));
        this.screen.appendChild(li);
    }

    turnOn(firstDescription: string) {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(firstDescription));
        this.screen.appendChild(li);
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
