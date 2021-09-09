//Getting all required elements

const start_btn = document.querySelector(".start_btn button");
const rules_box = document.querySelector(".rules_box");
const exit_btn = rules_box.querySelector(".quit");
const continue_btn = rules_box.querySelector(".restart");
const quiz_box = document.querySelector(".quiz_box");
const option_list = document.querySelector('.option_list');
const timeCount = document.querySelector('.timer_seconds');
const timeLine = document.querySelector('.time_line');
const timeOff = document.querySelector('.time_text');

// If Start Quiz Buttton clicked
start_btn.onclick = ()=>{
    rules_box.classList.add("activeRule"); //show the instructions box
}

// If Exit Buttton clicked
exit_btn.onclick = ()=>{
    rules_box.classList.remove("activeRule"); //hide the instructions box
}

// If Continue Buttton clicked
continue_btn.onclick = ()=>{
    rules_box.classList.remove("activeRule"); //hide the instructions box
    quiz_box.classList.add("activeQuiz"); //show the quiz box

    displayQuestions(0);
    queCounter(1);
    startTimer(20);
    startTimerLine(0);
}

let que_count = 0;
let que_numb = 1;
let counter;
let counterLine;
let timeValue = 20;
let widthValue = 0;
let userScore = 0;

const next_btn = quiz_box.querySelector('.next_btn');
const feedback_box = document.querySelector('.feedback_box');
const restart_quiz = feedback_box.querySelector('.restart');
const quit_quiz = feedback_box.querySelector('.quit');
const leave_icon = document.querySelector('.leave');
const refresh_icon = document.querySelector('.refresh');

//If the replay quiz button is clicked
restart_quiz.onclick = ()=> {
    quiz_box.classList.add('activeQuiz');
    feedback_box.classList.remove('activeFeedback');
    let que_count = 0;
    let que_numb = 1;
    let timeValue = 20;
    let widthValue = 0;
    displayQuestions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    next_btn.style.display = 'none';
    timeOff.textContent = "Time Left";
}

//If the replay quiz button is clicked
refresh_icon.onclick = ()=> {
    quiz_box.classList.add('activeQuiz');
    let que_count = 0;
    let que_numb = 1;
    let timeValue = 20;
    let widthValue = 0;
    displayQuestions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    next_btn.style.display = 'none';
    timeOff.textContent = "Time Left";
}

// If the quit quiz button is clicked
quit_quiz.onclick = ()=> {
    window.location.reload();
}

// If the leave Icon is clicked
leave_icon.onclick = ()=> {
    window.location.reload();
}

//If Next Button is clicked
next_btn.onclick = ()=> {
    if(que_count < questions.length -1){
        que_count++;
        que_numb++;
        displayQuestions(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        next_btn.style.display = 'none';
        timeOff.textContent = "Time Left";
    } else {
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        console.log("Completed");
        displayFeedbackBox();
    }
}

//Getting questions and options from array
function displayQuestions(index){
    const questions_text = document.querySelector('.questions_text');
    let que_tag = '<span>' + questions[index].numb + '. ' + questions[index].question +'</span>';
    let option_tag = '<div class="option">'+ questions[index].options[0] +'<span></span></div>'
                     + '<div class="option">'+ questions[index].options[1] +'<span></span></div>'
                     + '<div class="option">'+ questions[index].options[2] +'<span></span></div>'
                     + '<div class="option">'+ questions[index].options[3] +'<span></span></div>';
    questions_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;

    const option = option_list.querySelectorAll('.option');
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute('onclick', 'optionSelected(this)')
    }
}

//Getting tick and cross Icons
let tickIcon = '<div class="icon_tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon_cross"><i class="fas fa-times"></i></div>';

//Getting user answers
function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    let userAnswer = answer.textContent;
    let correctAnswer = questions[que_count].answer;
    let allOptions = option_list.children.length;
    if(userAnswer == correctAnswer){
        userScore += 1;
        console.log(userScore);
        answer.classList.add('correct')
        console.log('Good Answer');
        answer.insertAdjacentHTML('beforeend', tickIcon); //Tick Icon when answer is right(help from YouTube Tutorial)
    } else {
        answer.classList.add('incorrect')
        console.log('Wrong Answer');
        answer.insertAdjacentHTML('beforeend', crossIcon); //Cross Icon when answer is wrong
    }

    //Disable all other options when user selects one option
    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
    }
    next_btn.style.display = 'block';
}

//Getting the feedback box
function displayFeedbackBox() {
    rules_box.classList.remove('activeInfo'); //hide the info box
    quiz_box.classList.remove('activeQuiz'); //hide the quiz box
    feedback_box.classList.add('activeFeedback'); // show the feedback box
    const scoreText = feedback_box.querySelector('.score_text');
    if(userScore > 3) {
        let scoreTag = '<span>and congratulations! You got <p>'+ userScore  +'</p> out of <p>' +  questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else if (userScore > 1) {
        let scoreTag = '<span>and nice! You got <p>'+ userScore  +'</p> out of <p>' +  questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else if (userScore == 1) {
        let scoreTag = '<span>and sorry! You got only <p>'+ userScore  +'</p> out of <p>' +  questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else {
        let scoreTag = '<span>and really sorry! You failed the quiz</span>';
        scoreText.innerHTML = scoreTag;
    }
}

//Setting total questions
function queCounter(index) {
    const questions_counter = quiz_box.querySelector('.total_question');
    let totalQuestionTag = '<span><p>'+ index +'</p>of<p>'+ questions.length +'</p>Questions</span>'
    questions_counter.innerHTML = totalQuestionTag;
}

//Setting Time Counter
function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer () {
        timeCount.textContent = time;
        time--;
        if(time < 9){
            let addZero = timeCount.textContent;
            timeCount.textContent = '0' + addZero; 
        }
        if (time < 0){
            clearInterval(counter);
            timeCount.textContent = '0';
            timeOff.textContent = "Time Off";

            //Disable all options when time left and display the next button
            let allOptions = option_list.children.length;

            for (let i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled");
            }
            next_btn.style.display = 'block';
        }
    }
}

//Setting Time Line (help from Youtube Tutorial)
function startTimerLine(time){
    counterLine = setInterval(timer, 35);
    function timer () {
        time += 1;
        timeLine.style.width = time + 'px';
        if (time > 598){
            clearInterval(counterLine);
        }
    }
}