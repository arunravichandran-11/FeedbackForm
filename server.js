const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
app.use(express.static(__dirname));

const questions = require('./data/questions');

app.get('/questions', (req, res) => {
  res.status(200).send(questions);
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});
app.listen(port);
