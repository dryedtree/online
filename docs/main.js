import { CHARACTERS } from "./characters.js";
import { createGame, updateGame } from "./gameCore.js";
import { render } from "./render.js";

window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");
  const menu = document.getElementById("menu");
  const chars = document.getElementById("chars");

  if (!menu || !chars) {
    console.error("menu / chars が取得できていません");
    return;
  }

  let game = null;
  let input = {};

  // ★ キャラボタン生成（例外防止）
  Object.entries(CHARACTERS).forEach(([name, data]) => {
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
    if (!game) return;
    updateGame(game, input);
    render(ctx, game);
    requestAnimationFrame(loop);
  }
});
