'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const questions = [
  {
     "type":"rating",
     "question":"How do you rate the delivery experience?",
     "options":[
        {
           "text":"Great",
           "points":"10"
        },
        {
           "text":"Not so Great",
           "points":"5"
        },
        {
           "text":"Awful",
           "points":"0"
        }
     ]
  },
  {
     "type":"rating",
     "question":"How do you rate the Freshness of the fruits?",
     "options":[
        {
           "text":"Great",
           "value":"10"
        },
        {
           "text":"Not so Great",
           "value":"5"
        },
        {
           "text":"Awful",
           "value":"0"
        }
     ]
  },
  {
     "type":"boolean",
     "question":"Would you order again?",
     "options":[
        {
           "text":"Yes, Definitely",
           "value":true
        },
        {
           "text":"Not so Great",
           "value":false
        }
     ]
  },
  {
     "type":"text",
     "question":"Any comments?"
  }
];

app.use(bodyParser.json());

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../home.html'));
});

router.get('/questions', (req, res) => {
   res.status(200).json({ questions: questions });
});

router.post('/answers', (req, res) => { 
   res.status(200).json({success: true});
});

// app.use(express.static(__dirname, 'build'));

app.use('/.netlify/functions/server', router);  // path must route to lambda

app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);

// router.post('/answers', (req, res) => {
//    if(!req.body.answers) {
//      res.status(401).send({
//        error: 'question id with answers are missing'
//      })
//    }
//    res.status(200).send({success: true});
// });