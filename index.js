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
  chalk.blue("\nWELCOME " + userName.toUpperCase() + " TO - DO YOU KNOW BBT\n")
);

console.log(chalk.red("A SIMPLE QUIZ AROUND BBT. LET'S START!"));

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
    question:
      "Sheldon works as a senior theoretical physicist at The California Institute of Technology.Do I watch sports? ",
    answer: ["No", "Yes"],
    correct: 1,
    weitgh: 1,
    type: "normal",
    wrongAlert: "Yes ",
    id: 2,
  },
  {
    question: "Sheldon worked in the field of particle physics.",
    answer: ["No", "Yes"],
    correct: 1,
    weitgh: 1,
    type: "normal",
    wrongAlert: "Yes ",
    id: 3,
  },
  {
    question:
      " The character of Amy Farrah Fowler was written as a neuroscientist because Mayim Bialik was actually a neuroscientist.",
    answer: ["No", "Yes"],
    correct: 2,
    weitgh: 2,
    type: "bonus",
    wrongAlert: "Yes ",
    id: 4,
  },
  {
    question: "The show 'The Big Bang Theory' takes place in NYC",
    answer: ["No", "Yes"],
    correct: 0,
    weitgh: 2,
    type: "bonus",
    wrongAlert: "No",
    id: 5,
  },
  {
    question: "What was Howard's qualification? B.Eng, Aerospace Engineer.",
    answer: ["No", "Yes"],
    correct: 0,
    weitgh: 1,
    type: "normal",
    wrongAlert: "No",
    id: 6,
  },
];
const l2Questions = [
  {
    question: "What does Sheldon mean when he uses the catchphrase Bazinga!? ",
    answer: ["Gotcha!", "I'm Here!", "Correct!", "Hello!"],
    correct: 0,
    weitgh: 1,
    type: "normal",
    wrongAlert: "Gotcha!",
    id: 1,
  },

  {
    question: "What word does Sheldon Cooper use to refer to a sex?",
    answer: ["Sexual Relations", "Interacting", "Collaborating", "Coitus"],
    correct: 3,
    weitgh: 2,
    type: "bonus",
    wrongAlert: "Its coitus.",
    id: 2,
  },

  {
    question: "What song is used to soothe sick Sheldon? ",
    answer: ["Little Ball of Fur", "Soft Kitty", "Warm Kitty", "Little Kitty"],
    correct: 1,
    weitgh: 2,
    type: "bonus",
    wrongAlert:
      "Soft kitty is the one. it goes like soft kitty warm kitty little ball of fur \n happy kitty sweety kitty pur pur pur",
    id: 3,
  },

  {
    question: "Which superhero appears to be Sheldon Cooper's favorite?",
    answer: ["The Flash", "The Hulk", "Superman", "Spiderman"],
    correct: 0,
    weitgh: 1,
    type: "normal",
    wrongAlert: "Its flash. He keeps acting like that.",
    id: 4,
  },
  {
    question:
      "What is the real reason Sheldon knocks three times before entering a room?",
    answer: [
      "Sheldon's OCD",
      "Sheldon's scared because his dad beat him.",
      "Sheldon is announcing himself.",
      "Sheldon caught his dad cheating.",
    ],
    correct: 3,
    weitgh: 1,
    type: "normal",
    wrongAlert: "Sheldon caught his dad cheating is the right answer.",
    id: 5,
  },
  {
    question: "How does Sheldon really feel about Howard Wolowitz?  ",
    answer: [
      "Sheldon despises Howard.",
      "Sheldon doesn't care if Howard is around, or not.",
      "Sheldon feels Howard is a treasured acquaintance.",
      "Sheldon thinks highly of Howard's work.",
    ],
    correct: 2,
    weitgh: 1,
    type: "normal",
    wrongAlert: "Howard is a treasured acquaintance.",
    id: 6,
  },
  {
    question:
      "What does Sheldon buy when he and Amy terminate their relationship in season four?",
    answer: ["Five new comics", "Five Cats", "A blowup Doll", "A koala"],
    correct: 1,
    weitgh: 1,
    type: "normal",
    wrongAlert: "Cats are love.",
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
