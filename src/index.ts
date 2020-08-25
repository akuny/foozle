import App from './lib/App';
const disk = require('../disk.json');

let app = new App(<HTMLInputElement>document.getElementById('app'), disk);

app.init();
