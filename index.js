const STORE=[
  {
    question:"How old was Tiger Woods when he appeared on the Mike Douglas Show with Bob Hope?", 
    answers:["2", "3", "4", "5"], 
    correctAnswer:"2"
  }, 
  {
    question:"Tiger went to which of these prestigious Colleges?", 
    answers:["Harvard", "Yale", "Stanford", "Duke"], 
    correctAnswer:"Stanford"
  },
  {
    question:"In a 1996 interview when Tiger said that it was his nature to only join tournaments in order to win, which fellow player told him, 'You'll learn'?", 
    answers:["Phil Mickelson", "Vijay Singh", "Curtis Strange", "Bubba Watson"], 
    correctAnswer:"Curtis Strange"
  },
  {
    question:"What color does Tiger always wear on the closing day of a tournament?", 
    answers:['Red', 'Black', 'Blue', 'White'], 
    correctAnswer:"Red"
  },
  {
    question:"Where did the name 'Tiger' come about?", 
    answers:['From the big striped cat', 'From a vietnamese soldier his dad fought aside with', 'It was assumed his nickname due to the ferocity he competed with at a young age', 'Tigers are his favorite animal'], 
    correctAnswer:"From a vietnamese soldier his dad fought aside with"
  },
  {
    question:"Tiger is the only golfer to ever hold all 4 PGA majors at once. Which of these is not a PGA major golf tournament?", 
    answers:['US Open', 'British Open', 'The Players Championship', 'The Masters'], 
    correctAnswer:"The Players Championship"
  },
]

let score = 0;

let questionNumber = 0;

let questionIndex = 0;

function startQuiz() {
  $('.startBox').on('click', '.startButton', function (event) {
    $('.startBox').hide();
    $('.questionBox').show();
    $('#question').addClass('box');
    $('.questionNumber').text(1);
    $('.score').text(0);
    questionText();
  });
}

function submitAnswer() {
  $('.questionBox').on('submit', function() {
    event.preventDefault();
    let checked = $('input:checked');
    let answer = checked.val();
    let correct = STORE[questionIndex].correctAnswer;
    if (answer === correct) {
      correctAnswer();
    }
    else {
      wrongAnswer();
    }
  })
}

function nextButton() {
  $('.resultBox').append(`<button type="button" class="nextButton button"> Next Question </button>`);
}

function finalButton() {
  $('.finalBox').html(`<button type="button" class="finalButton button"> Check Score! </button>`);
}

function correctAnswer() {
  updateScore();
  updateQuestionIndex();
  $('.questionBox').hide();
  $('.resultBox').show();
  correctAnswerText();
  if ((questionNumber +1) < STORE.length) {
    nextButton();
  }
  else {
    $('.finalBox').show();
    finalButton();
  }
}

function correctAnswerText() {
  $('.resultBox').html(
    `<h3> Right down the middle, nice shot!</h3>
    <img src="images/celebratingTiger.jpg" alt="Tiger celebrating a big shot" class="image" width="200px">`);
}

function wrongAnswer() {
  updateQuestionIndex();
  $('.questionBox').hide();
  wrongAnswerText();
  $('.resultBox').show();
  if ((questionNumber +1) < STORE.length) {
    nextButton();
  }
  else {
    $('.finalBox').show();
    finalButton();
  }
}

function wrongAnswerText(){
  $('.resultBox').html(`
  <h3> Shank!</h3>
  <img src="images/bewildered-tiger.jpg" alt="Tiger bewildered after a bad read" class="image" width="200px">
  <p>The correct answer was ${STORE[questionIndex - 1].correctAnswer}</p>`);
}

function updateQuestionNumber() {
  questionNumber++;
  $('.questionNumber').text(questionNumber + 1);
}

function nextQuestion() {
  $('.resultBox').on('click', '.nextButton', function (event) {
    updateQuestionNumber();
    $('.resultBox').hide();
    $('.questionBox').show();
    questionText();
 })
  
}

function questionText() {
  $('.questionBox').html(`
  <form>
  <legend>${STORE[questionIndex].question}
  </legend>
  <label> <input type="radio" id="0" value="${STORE[questionIndex].answers[0]}" name="answer" required> <span>${STORE[questionIndex].answers[0]}<span> </label>
  <label> <input type="radio" id="1" value="${STORE[questionIndex].answers[1]}" name="answer" required> <span>${STORE[questionIndex].answers[1]}<span> </label>
  <label> <input type="radio" id="2" value="${STORE[questionIndex].answers[2]}" name="answer" required> <span>${STORE[questionIndex].answers[2]}<span> </label>
  <label> <input type="radio" id="3" value="${STORE[questionIndex].answers[3]}" name="answer" required> <span>${STORE[questionIndex].answers[3]}<span> </label>
  <button type="submit" class="submitButton button"> Submit</button>
  </form>`);
}

function updateScore() {
  score++;
  $('.score').text(score);
}

function updateQuestionIndex() {
  questionIndex++;
}

function finalScore() {
  $('.finalBox').on('click', '.finalButton', function (event) {
    $('.resultBox').hide();
    finalScoreMessage();
  })
}

function finalScoreMessage() {
  $('.finalBox').html(`<h3>Your final score is ${score} out of 6.<h3>`);
  if (score >= 5) {
    $('.finalBox').append(`<p>Well done! You might actually know a bit about the Big Cat!<p>`)
  }
  else if (score < 5 && score > 2) {
    $('.finalBox').append(`<p>Well...  you're no super fan... but at least you know something about him?<p>`)
  }
  else {
    $('.finalBox').append(`<p> Time to get out from under your rock buddy. Do you even know what golf is?<p>`)
  }
  $('.finalBox').append(`<button type="button" class="restartButton button"> Try Again? </button>`)
}

function restartQuiz() {
  $('.finalBox').on('click', '.restartButton', function (event) {
    restart();
    startText();
    $('.startBox').show();
    $('.finalBox').hide();
    $('.resultBox').hide();
  })
}

function startText() {
  $('.startBox').html(`
  <section class="startBox">
  <h1>Do you even know Tiger Woods?</h1>
  <button type="button" class="startButton button">Begin</button>
  </section>`)
}

function restart() {
  score = 0;
  questionIndex = 0;
  questionNumber = 0;
  $('.score').text(0);
  $('.questionNumber').text(0);
}

function quizTime() {
  startQuiz();
  submitAnswer();
  nextQuestion();
  finalScore();
  restartQuiz();
}

$(quizTime);
