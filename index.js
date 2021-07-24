const readlineSync = require("readline-sync");
const chalk = require("chalk");
const LocalStorage = require("node-localstorage").LocalStorage;
const localStorage = new LocalStorage("./scratch");
let score = 0;
let scroreBoard;
scroreBoard = localStorage.getItem("scroreBoard");
// console.log(scroreBoard);

if (!scroreBoard) {
  //   console.log("sss");

  scroreBoard = [];
} else {
  //   console.log("xxx");
  scroreBoard = JSON.parse(scroreBoard);
}
// console.log(scroreBoard);

let userName = readlineSync.question("PLEASE ENTER YOUR NAME: ");

console.log(
  chalk.blue("\nWELCOME " + userName.toUpperCase() + " TO - GET TO KNOW ME\n")
);

console.log(chalk.red("A SIMPLE QUIZ TO GET TO KNOW ME BETTER. LET'S START!"));

console.log(chalk.blue("\nRULES:"));
console.log(
  "1- YOU GET +1 MARKS FOR EACH CORRECT ANSWER (some are bonus questions)"
);
console.log("2- YOU GET -1 MARKS FOR EACH INCORRECT ANSWER\n");
console.log("3- ENTER OPTION NUMBER IN ANSWER\n");
console.log("4- YOU GET +10 MARKS FOR EVERY LEVEL YOU CLEAR\n");
console.log(
  "5- IF YOU ATTEMPT MORE THE ONE TIME HIGHEST SCORE WILL BE STORED\n"
);

function play({ question, answer, correct, weitgh, type, wrongAlert }) {
  console.log(chalk.red(question));
  answer.map((option, idx) => {
    console.log(idx + ". " + option);
  });

  var userAnswer = readlineSync.question(chalk.blue("Your Answer: "));

  if (userAnswer == correct) {
    score = score + weitgh;
    if (type === "normal") console.log("You are right!");
    else console.log("It was a bonus quesion and you are right!");
  } else {
    score = score - 1;
    console.log("Wrong! \n" + wrongAlert);
  }

  console.log("current score: " + score);
  console.log("-------------X-------------");
}

function levelplay(qarray) {
  let qal = qarray.length;
  let prevQ = new Set();
  let possibleQ;
  for (var i = 0; i < 4; i++) {
    while (true) {
      possibleQ = Math.floor(Math.random() * qal);
      if (!prevQ.has(possibleQ)) {
        prevQ.add(possibleQ);
        break;
      }
    }
    play(qarray[possibleQ]);
  }
}

const ynQuestions = [
  {
    question: "Do I watch sports? ",
    answer: ["No", "Yes"],
    correct: 0,
    weitgh: 1,
    type: "normal",
    wrongAlert: "No I usually dont!",
    id: 1,
  },
  {
    question: "Do I like poetry? ",
    answer: ["No", "Yes"],
    correct: 1,
    weitgh: 2,
    type: "bonus",
    wrongAlert: "Yes I do.",
    id: 2,
  },
  {
    question: "Do I know how to fly? ",
    answer: ["No", "Yes"],
    correct: 0,
    weitgh: 1,
    type: "normal",
    wrongAlert: "I wish I could.",
    id: 3,
  },
  {
    question: "Do I enjoy non-veg food? ",
    answer: ["No", "Yes"],
    correct: 1,
    weitgh: 1,
    type: "normal",
    wrongAlert: "Not a big fan but yes",
    id: 4,
  },
  {
    question: "Am I a cruel person? ",
    answer: ["No", "Yes"],
    correct: 1,
    weitgh: 2,
    type: "bonus",
    wrongAlert: "Being cruel is being real",
    id: 5,
  },
  {
    question: "Do I like cats? ",
    answer: ["No", "Yes"],
    correct: 1,
    weitgh: 2,
    type: "bonus",
    wrongAlert: "What on earth makes you think that",
    id: 6,
  },
  {
    question: "Do I like dogs?",
    answer: ["No", "Yes"],
    correct: 1,
    weitgh: 1,
    type: "normal",
    wrongAlert: "Dogs are love",
    id: 7,
  },
  {
    question: "Do you think that you know me?",
    answer: ["No", "Yes"],
    correct: 1,
    weitgh: 1,
    type: "normal",
    wrongAlert: "have some confidence",
    id: 8,
  },
  {
    question: "Do I eat a lot?",
    answer: ["No", "Yes"],
    correct: 0,
    weitgh: 1,
    type: "normal",
    wrongAlert: "Too lazy to eat",
    id: 9,
  },
  {
    question: "Do I eat a lot?",
    answer: ["No", "Yes"],
    correct: 0,
    weitgh: 1,
    type: "normal",
    wrongAlert: "Too lazy to eat",
    id: 10,
  },
];
const l2Questions = [
  {
    question: "Which city do i live in? ",
    answer: ["Kashipur", "Moradabad", "Chamoli", "Ramnagar"],
    correct: 0,
    weitgh: 1,
    type: "normal",
    wrongAlert: "kashipur",
    id: 1,
  },

  {
    question: "What is an impossible thing that I want to do ",
    answer: ["Eat whole day", "drink 7 litres of water", "Fly", "Be a ghost"],
    correct: 2,
    weitgh: 2,
    type: "bonus",
    wrongAlert: "I wish I could fly",
    id: 2,
  },

  {
    question: "who is my favourite Animated character? ",
    answer: ["Shinchan", "Avatar", "Doraemon", "Nobita"],
    correct: 1,
    weitgh: 2,
    type: "bonus",
    wrongAlert: "Avatar form 'Avatar the last air bender'",
    id: 3,
  },

  {
    question: "Who is my favourite color? ",
    answer: ["green", "blue", "yellow", "red"],
    correct: 2,
    weitgh: 1,
    type: "normal",
    wrongAlert: "Its red",
    id: 4,
  },
  {
    question: "Who is my second favourite color? ",
    answer: ["pink", "yellow", "green", "red"],
    correct: 0,
    weitgh: 1,
    type: "normal",
    wrongAlert: "Its red",
    id: 5,
  },
  {
    question: "Which instrument I am learning to play? ",
    answer: ["ukelele", "flute", "saxophone", "Banjo"],
    correct: 0,
    weitgh: 1,
    type: "normal",
    wrongAlert: "Ukelele",
    id: 6,
  },
  {
    question: "where was my college located",
    answer: ["Delhi", "Gopeshwar", "Mars", "Kashipur"],
    correct: 1,
    weitgh: 1,
    type: "normal",
    wrongAlert: "Its red",
    id: 7,
  },
];

levelplay(ynQuestions);

if (score > 4) {
  console.log(chalk.blue("You are eligible for level 2"));
  score = score + 10;
  levelplay(l2Questions);
}

console.log(chalk.blue("YOUR TOTAL SCORE IS: ", score));

if (score > 8) {
  console.log(chalk.red("Looks like you know me very well!"));
}
if (score > 4) {
  console.log(chalk.red("That was a pretty decent score!"));
}

scroreBoard.push({ name: userName, score: score });
scroreBoard = scroreBoard.sort((a, b) => b.score - a.score);

localStorage.setItem("scroreBoard", JSON.stringify(scroreBoard));
console.log(chalk.red("\nSCOREBOARD:-"));
console.log("   NAME" + "\t\t" + "SCORE");
scroreBoard.map((player) => {
  console.log(player.name + "\t\t" + player.score);
});
// for( var i = 0; i < scoreBoardArray.length; i++) {
//   console.log(i+1 + '. ' + scoreBoardArray[i].name + "\t" +  scoreBoardArray[i].score)
// }
