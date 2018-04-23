// requires
let express = require('express');
let app = express();
let bodyParser = require('body-parser');

// uses
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extende:true}));

// globals
const port = 23456;
let currentAnswer = 0;
let history = [];

// spin up server
app.listen(port, function (){
    console.log('server is up on:', port);
});// end server up

app.get('/answer', function (req,res) {
    res.send({answer: currentAnswer});
});

app.get('/history', function (req,res) {
    res.send({ history: history});
});

app.post('/doMath', function (req,res) {
    console.log('in doMath POST', req.body);
    if (req.body.type === '-') {
        currentAnswer = Number(req.body.x) - Number(req.body.y);
    }
    else if (req.body.type === '*') {
        currentAnswer = Number(req.body.x) * Number(req.body.y);
    }
    else if (req.body.type === '/') {
        currentAnswer = Number(req.body.x) / Number(req.body.y);
    }
    else if (req.body.type === '+') {
        currentAnswer = Number(req.body.x) + Number(req.body.y);
    }
    req.body.answer = Number(currentAnswer);
    history.unshift(req.body);
    res.sendStatus(200);
});

