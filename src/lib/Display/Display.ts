import { IDisplay } from '../../ts/interfaces';

export class Display implements IDisplay {
    target: HTMLDivElement;
    broadcastChange: (text: string) => void;
    commandLine: HTMLFormElement;
    inputField: HTMLInputElement;
    screen: HTMLUListElement;

    constructor(target: HTMLDivElement, handler: (text: string) => void) {
        this.target = target;
        this.broadcastChange = handler;
        this.commandLine = document.createElement('form');
        this.inputField = document.createElement('input');
        this.inputField.setAttribute('id', 'terminal');
        this.inputField.setAttribute('class', 'terminal');
        this.commandLine.appendChild(this.inputField);
        this.screen = document.createElement('ul');
    }

    show(description: string): void {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(description));
        this.screen.appendChild(li);
    }

    turnOn(firstRoomDescription: string): void {
        let welcome = document.createElement('li');
        welcome.appendChild(
            document.createTextNode(
                'Welcome to foozle. Enter "help" to see a list of valid commands.'
            )
        );
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
            this.broadcastChange(input.value);
            input.value = '';
        });
    }
}
