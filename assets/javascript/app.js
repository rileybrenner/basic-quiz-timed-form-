$(document).ready(function(){

$("#time-remaining").hide();
$("#start").on('click', trivia.startGame);
$(document).on('click', '.option', trivia.guessChecker);

})
// properties for trivia
var trivia = {
unanswered: 0,
currentSet: 0,
correct: 0,
incorrect: 0,
timer: 10,
timerOn: false,
timerId: '',

questions: {
    q1: 'Who is the lead singer of Led Zeppelin?',
    q2: 'What musician plays the song Hey Joe?',
    q3: 'What is the name of the influential rock festival in the 1960/70s in New York?',
    q4: 'What is the name of the common rock band who plays the song Rambling Man?',
    q5: 'What is the hit song by the 1960s band Jefferson Airplane?', 
},

options: {
    q1: ['Robert Plant', 'Simon & Garfunkle', 'Metallica', 'Jack Johnson'],
    q2: ['Bob Dylan', 'Neil Young', 'Jimi Hendrix', 'Ricky Martin'],
    q3: ['Monterey Pop Fest', 'Electric Daisy Carnival', 'Outsidelands', 'Woodstock'],
    q4: ['Crosby Stills & Nash', 'Allman Brothers', 'Led Zeppelin', 'Bob Dyland'],
    q5: ['White Unicorn', 'Free', 'White Rabbit', 'Fire'],
},
answers: {
    q1: 'Robert Plant',
    q2: 'Jimi Hendrix',
    q3: 'Woodstock',
    q4: 'Allman Brothers',
    q5: 'White Rabbit',
},
// start game function
startGame: function(){
    trivia.incorrect = 0;
    trivia.unanswered = 0;
    trivia.currentSet = 0;
    trivia.correct = 0;
    clearInterval(trivia.timerId);

    $('#trivia').show();

    $('#results').html('');

    $('#timer').text(trivia.timer);

    $('#start').hide();

    $('#time-remaining').show();

    trivia.nextQuestion();

},

// loop through and display questions and options
 
nextQuestion : function(){

    trivia.timer = 10;

    $('#timer').removeClass('last-seconds');
    $('#timer').text(trivia.timer);

    if(!trivia.timerOn){
        trivia.timerId = setInterval(trivia.timerRunning, 1000);
    }
    // grab all questions and index the current question

    var questionContent = Object.values(trivia.questions)[trivia.currentSet];
    $('#question').text(questionContent);

    // an array of all the user options for the current question

    var triviaOptions = Object.values(trivia.options)[trivia.currentSet];

    $.each(triviaOptions, function(index, key) {
        $('#options').append($('<button class = "option btn btn-info btn-lg">'+key+'</button>'));
    })

    },
    // decrement counter and unanswered question

    timerRunning : function() {
        // if time still has time left
        // trivia.timer = 10000;

        if(trivia.timer > -1 && trivia.currentSet <Object.keys(trivia.questions).length){
            $('#timer').text(trivia.timer);
            trivia.timer--;
                if(trivia.timer ===4){
                    $('#timer').addClass('last-seconds');
                }
        }

        // the timer has run out and increment unanwered run result

        else if(trivia.timer === -1) {
            trivia.unanswered++;
            trivia.result = false;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 1000);
            $('#results').html('<h3>Out of time! The answer was ' + Object.values(trivia.answers)[trivia.currentSet] + '</h3>');
        }
        else if(trivia.currentSet === Object.keys(trivia.questions).length){

            $('#results')
            .html('<h3>Thank you for playing!</h3>' +
            '<p>Correct: ' + trivia.correct + '</p>' +
            '<p>Incorrect: ' + trivia.incorrect + '</p>' +
            '<p>Unanswered: ' + trivia.unanswered + '</p>' +
            '<p>Play again!</p>');
// hide trivia section
            $('#trivia').hide();

            // show start button to begin trivia
            $('#start').show();

        }
        
    },

    guessChecker : function() {

var resultId;

var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
//mark correct
if($(this).text()=== currentAnswer) {

    $(this).addClass('btn-success').removeClass('btn-info');
// turn button green for correct
    trivia.correct++;
    clearInterval(trivia.timerId);
    resultId = setTimeout(trivia.guessResult, 1000);
    $('#results').htm;('<h3>Correct Answer!</h3>');

}
else {

    $(this).addClass('btn-danger').removeClass('btn-info');

    trivia.incorrect++;
    clearInterval(trivia.timerId);
    resultId = setTimeout(trivia.guessResult, 1000);
    $('#results').html('<h3>Better luck next time! '+ currentAnswer + '</h3>');
}

},

// remove previous results and options
guessResult : function() {

    // increment the questions to next set

    trivia.currentSet++;
 
    // remove options and results
    $('.option').remove();
    $('#results h3').remove();

    // begin next question
    trivia.nextQuestion();
}
    }
