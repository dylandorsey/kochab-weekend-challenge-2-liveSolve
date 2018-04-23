console.log('js');

let currentType = '';

let historyNow = () => {
    console.log('in historyNow');
    // GET call to /history
    $.ajax({
        method: 'GET',
        url: '/history'
    }).then(function (response) {
        console.log('back from server with: ', response);
        let el = $('#historyOut');
        el.empty();
        for (let i = 0; i < response.history.length; i++) {
            el.append('<li>' + response.history[i].x + ' ' +
                response.history[i].type + ' ' + response.history[i].y +
                ' = ' + response.history[i].answer + '</li>');
        }// end ajax
    });
    // display on DOM
    // loop through the array for unordered list elements
} // end historyNow


let answerMeThis = () => {
    console.log('in answerMeThis');
    $.ajax({
        method: 'GET',
        url: '/answer'
    }).then(function (response) {
        console.log('back from the server with:', response);
        // target #answerOut, clear, and append text
        let el = $('#answerOut');
        el.empty();
        el.append('Answer: ', response.answer);
    });
} // end answerMeThis


let doMathNow = () => {
    if ($('#xIn').val() === '' || $('#yIn').val() === '' || currentType === '' ) {
        alert('no empties, yo!');
    }// end I gotz empties
    else {
        console.log('in doMathNow');
        // target elements with ids of xIn and yIn and get their values
        // create object to send
        let objectToSend = {
            x: $('#xIn').val(),
            y: $('#yIn').val(),
            type: currentType
        }// end object to send
        console.log('sending to server:', objectToSend);
        $.ajax({
            method: 'POST',
            url: '/doMath',
            data: objectToSend
        })
            .then(function (response) {
                console.log('back from server with:', response);
                answerMeThis();
                historyNow();
            });// end AJAX
    }// end no empties
} // end doMathNow

let clearAll = () => {
    console.log('in clearAll');
    $('#xIn').val('');
    $('#yIn').val('');
    currentType = '';
}// end clearAll

function setOperator() {
    currentType = $(this).text();
    console.log(`in set Operator: ${currentType}`);
    
}// end answerMeThis

let readyNow = () => {
    console.log('in jQ');
    // click handler for element with id of doMathButton
    $('#doMathButton').on('click', doMathNow);
    $('#goAwayButton').on('click', clearAll);
    $('.operatorButton').on('click', setOperator);
    historyNow();
}// end doc ready

// with ES6 declare first before calling!

$(document).ready(readyNow);

