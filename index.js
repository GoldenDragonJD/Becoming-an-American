const express = require('express');
const jsonData = require('./database.json');
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/full-test', (req, res) => {
    res.sendFile(__dirname + '/public/full-test.html');
});

app.get('/short-test', (req, res) => {
    res.sendFile(__dirname + '/public/short-test.html');
});

app.get('/full-database', (req, res) => {
    res.json({ data: jsonData.map(item => item).sort((a, b) => Math.random() - 0.5) });
})

app.get('/partial-database', (req, res) => {
    res.json({ data: jsonData.map(item => item).sort((a, b) => Math.random() - 0.5).slice(0, 10) });
})

app.listen(3000, () => {
    console.log('Server started on port 3000');
});