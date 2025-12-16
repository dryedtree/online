import { CHARACTERS } from "./characters.js";
import { createGame, updateGame } from "./gameCore.js";
import { render } from "./render.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const menu = document.getElementById("menu");
const chars = document.getElementById("chars");

let game;
let input = {};

Object.keys(CHARACTERS).forEach(name => {
  const btn = document.createElement("button");
  btn.textContent = name;
  btn.onclick = () => start(name);
  chars.appendChild(btn);
});

function start(name) {
  menu.style.display = "none";
  game = createGame(CHARACTERS[name]);
  loop();
}

window.addEventListener("keydown", e => input[e.key.toLowerCase()] = true);
window.addEventListener("keyup", e => input[e.key.toLowerCase()] = false);

function loop() {
  updateGame(game, input);
  render(ctx, game);
  requestAnimationFrame(loop);
}
