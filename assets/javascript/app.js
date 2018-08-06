// ========================================
// CLASSES
// ========================================
// Question class constructor
function Question (question, a1, a2, a3, a4, correctAnswer) {
    this.question      = question;
    this.a1            = a1;
    this.a2            = a2;
    this.a3            = a3;
    this.a4            = a4;
    this.correctAnswer = correctAnswer;
  }
  
  Question.prototype.checkAnswer = function(userAnswer) {
    if(userAnswer===this.correctAnswer) {
      // console.log("That's right!");
      return true;
    } else {
      // console.log("Nope. That's wrong.");
      return false;
    }
  };
  
  // ========================================
  // INITIALIZATION
  // ========================================
  // Array of Question objects
  var questions = [
      new Question(
        "Captain America was frozen in which war?",
        "American Civil War",
        "World War II",
        "Cold War",
        "World War I",
        "a2"),
      new Question(
        "Deadpool joined the Weapon X program because:",
        "He was forced to",
        "He wanted to fight justice",
        "He though it would be fun",
        "He had incurable cancer",
        "a4"),
      new Question(
        "Edwin Jarvis is the butler to:",
        "Bruce Banner",
        "Tony Stark",
        "Clint Barton",
        "Charles Xavier",
        "a2"),
      new Question(
        "What is Thor's axes' name?",
        "Jarnbjorn",
        "Thunder",
        "Mjolnir",
        "Lighting",
        "a1"),
      new Question(
        "The Thing has how many fingers on both hands, including thumbs?",
        "6",
        "10",
        "4",
        "8",
        "a4")
  ];
  // Current question counter
  var questionCounter = 0;
  // Default timer values
  var questionTimer;
  var answerTimer;
  var questionDuration = 10;
  var answerDuration = 3;
  // Score keeping
  var correct = 0;
  var incorrect = 0;
  var unanswered = 0;
  // ========================================
  // FUNCTIONS
  // ========================================
  function startGame() {
    var startButton = $("<button>");
    $(startButton).addClass(".start");
    $(startButton).html("IT'S GO TIME!");
    $(".stage").html("<h2>Hero!!!</h2> <p>Do you have the knowledge it takes to be a superhero?!</p>");
    $(".stage").append(startButton);
  
    $(startButton).click(function(){
      askQuestion();
    });
  }
  
  function reset() {
    questionCounter = 0;
    // Score keeping
    correct = 0;
    incorrect = 0;
    unanswered = 0;
    // Clear timers
    clearTimeout(answerTimer);
    clearInterval(questionTimer);
    startGame();
  }
  
  function startQuestionTimer(t, q) {
    // start countdown
    questionTimer = setInterval(function(){
      if (t <= 0) {
        renderWrong(q, true);
        return;
      } else {
        $("h4.timer span").text(t);
        t--;
      }
    }, 1000);
  }
  
  function startAnswerTimer(){
    console.log(answerDuration);
    answerTimer = setTimeout(function(){
      askQuestion();
    },answerDuration*1000);
  }
  
  function renderGameOver() {
    var output = "<h2>Let's see how you did...</h2>";
    output += "<table><tbody><tr><td class='left'>";
    output += "Correct:</td><td class='left'>  "+correct+"</td></tr><tr><td class='left'>";
    output += "Incorrect:</td><td class='left'>  "+incorrect+"</td></tr><tr><td class='left'>";
    output += "Unanswered:</td><td class='left'>  "+unanswered+"</td></tr></tbody></table>";
    output += "<button class='reset'>Go again</button>";
    $(".stage").html(output);
    $(".reset").click(function(){
      reset();
    });
  }
  
  function askQuestion() {
    // empty stage contents
    $(".stage").empty();
    // clear out timers
    clearTimeout(answerTimer);
    if(questionCounter < questions.length) {
      // grab next question from questions arrray
      var q = questions[questionCounter];
      // instantiate a new Question object with selected question
      var currentQuestion = new Question(q);
      // display it on the screen
      var output = "<h4 class='timer'> Time remaining: <span>"+questionDuration+"</span></h4>";
      output += "<h3>"+q.question+"</h3>";
      output += "<ul class='answers'>";
      output += "<li id='a1'>"+q.a1+"</li>";
      output += "<li id='a2'>"+q.a2+"</li>";
      output += "<li id='a3'>"+q.a3+"</li>";
      output += "<li id='a4'>"+q.a4+"</li>";
      output += "</ul>";
  
      // Put the question on the screen
      $(".stage").html(output);
  
      // start the question timer
      startQuestionTimer(questionDuration, q);
  
      // Increment current question global variable
      questionCounter++;
  
      // Check user answer on click
      // $("li").click(q.checkAnswer($(this).attr("id")));
      $("li").click(function(){
        $(this).addClass('selected');
        if(q.checkAnswer($(this).attr("id"))) {
          renderCorrect(q);
          // console.log("That's right!");
        } else {
          renderWrong(q);
          // console.log("That's WRONG!");
        }
      });
    } else {
      // we're out of questions...
      renderGameOver();
  }
  
  } // askQuestion()
  
  function renderCorrect(q) {
    // update Score
    correct++;
    // stop timer
    clearInterval(questionTimer);
    // start answer timer
    startAnswerTimer();
    // Congratulations message + correct answer for 5 seconds
    var output = "<h3>RIGHT YOU ARE!</h3>";
    output += "<img src='./assets/images/win"+questionCounter+".GIF'>"
    $(".stage").html(output);
  }
  
  function renderWrong(q, ranOutofTime) {
    // stop timer
    clearInterval(questionTimer);
    // start answer timer
    startAnswerTimer();
    // fetch the correct answer
    var correct = q[q.correctAnswer];
    // Congratulations message + correct answer
    // update Score
    var output;
    if (ranOutofTime === true) {
      output = "<h3>WAH WAH WAH! OUT OF TIME!</h3>";
      unanswered++;
    } else {
      output = "<h3>KERSPLAT!! WRONG!!</h3>";
      incorrect++;
    }
    output += "<h4 class='correction'>The correct answer was "+correct+".</h4>";
    output += "<img src='./assets/images/fail"+questionCounter+".GIF'>";
    $(".stage").html(output);
  
  }
  
  // ========================================
  // GAME
  // ========================================
  $(document).ready(function(){
  
    startGame();
  
  
  }); // document.ready