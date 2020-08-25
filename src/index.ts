import App from './lib/App';
const game = require('../game.json');

let app = new App(<HTMLInputElement>document.getElementById('app'), game);

app.init();
