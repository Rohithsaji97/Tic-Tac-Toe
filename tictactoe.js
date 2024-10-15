let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newBtn = document.querySelector(".newbtn");
let msgContainer = document.querySelector(".msgContainer");
let msg = document.querySelector("#msg");
let container = document.querySelector(".container");

let turn = true;
let count = 0;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turn) {
      box.innerText = "X";
      // box.style.color='black'
      turn = false;
    } else {
      box.innerText = "O";
      turn = true;
    }
    box.disabled = true;
    count += 1;
    checkDraw();
    checkWinner();
  });
});

const checkDraw = () => {
  if (count === 9) {
    msg.innerText = "It's a DRAW";
    msgContainer.classList.remove("hide");
    container.classList.add("hide");
    reset.classList.add("hide");
    disableBoxes();
  }
};

const resetGame = () => {
  turn = true;
  enableBoxes();
  msgContainer.classList.add("hide");
  container.classList.remove("hide");
  reset.classList.remove("hide");
  count = 0;
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  container.classList.add("hide");
  reset.classList.add("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 != "" && pos3 != "" && pos2 != "") {
      if (pos1 === pos2 && pos2 === pos3) {
        showWinner(pos1);
      }
    }
  }
};

newBtn.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);
