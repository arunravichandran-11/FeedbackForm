// const express = require('express');
// const path = require('path');
// const bodyParser = require('body-parser');

// const port = 9000;
// const app = express();
// app.use(express.static(__dirname));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// const questions = require('./data/questions');

// app.get('/questions', (req, res) => {
//   res.status(200).send(questions);
// });

// app.post('/answers', (req, res) => {
//   if(!req.body.answers) {
//     res.status(401).send({
//       error: 'question id with answers are missing'
//     })
//   }
//   res.status(200).send({success: true});
// });

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'index.html'));
// });
// app.listen(port);


'use strict';

const app = require('./express/server');

app.listen(3000, () => console.log('Local app listening on port 3000!'));
