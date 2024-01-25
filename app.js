let win_modes = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 5, 9],
  [3, 5, 7],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
];

let color_dict = [[], ["red"], ["blue"]]; // 0: nop; 1: red, 2: blue

let game = [0, 0, 0, 0, 0, 0, 0, 0, 0];

let childs = document.querySelectorAll(".child");

let turn = document.querySelector(".turn");

let current_player = 1;

let winner = 0;

childs.forEach((item, index) => {
  item.addEventListener("click", () => {
    if (game[index] == 0 && winner == 0) {
      game[index] = current_player;
      item.classList.add(color_dict[current_player]);
      checkWin(() => {
        if (winner == 0) {
          if (filled()) {
            winner = -1;

            turn.classList.add("pot");
            turn.classList.add("win");
            turn.textContent = "Pot";
            history[2]++;
            updateScore();
          } else {
            turn.classList.remove(color_dict[current_player]);
            current_player = current_player == 1 ? 2 : 1;
            turn.classList.add(color_dict[current_player]);
            turn.textContent = color_dict[current_player] + "'s Turn";
          }
        }
      });
    }
  });
});

function checkWin(callback) {
  win_modes.forEach((item) => {
    let g = [game[item[0] - 1], game[item[1] - 1], game[item[2] - 1]];

    if (g[0] == g[1] && g[1] == g[2]) {
      if (g[0] !== 0) {
        winner = g[0];

        [childs[item[0] - 1], childs[item[1] - 1], childs[item[2] - 1]].forEach(
          (child) => {
            child.classList.add("wins");
          }
        );

        turn.classList.add("win");
        turn.textContent = color_dict[g[0]] + " Win!";

        history[g[0] - 1]++;

        updateScore();
      }
    }
  });
  callback();
}

function filled() {
  let res = true;
  game.forEach((item) => {
    if (item == 0) {
      res = false;
    }
  });
  return res;
}

let history = [0, 0, 0];

window.addEventListener("load", () => {
  history = localStorage.getItem("HISTORY");
  if (history) {
    history = JSON.parse(history);
  } else {
    history = [0, 0, 0];
  }
  updateScore();
});

window.addEventListener("beforeunload", () => {
  localStorage.setItem("HISTORY", JSON.stringify(history));
});

let blues = document.getElementById("blues");
let reds = document.getElementById("reds");
let pots = document.getElementById("pots");

function updateScore() {
  blues.textContent = history[1];
  reds.textContent = history[0];
  pots.textContent = history[2];
}

let clear = document.getElementById("clear");

clear.addEventListener("click", () => {
  history = [0, 0, 0];
  localStorage.clear();
  location.reload();
});

let reload = document.getElementById("RELOAD");

reload.addEventListener("click", () => {
  location.reload();
});
