const path = require('path');
const express = require('express');
const app = express();

const port = 3000;
const dist = path.resolve(__dirname, 'dist');

app.use(express.static(dist));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist/index.html'));
});

app.listen(port, () => {
    console.log(`foozle is listening at http://localhost:${port}`);
});
