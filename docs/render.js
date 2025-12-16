export function render(ctx, game) {
  ctx.clearRect(0, 0, 800, 600);

  // Player
  ctx.fillStyle = "cyan";
  ctx.beginPath();
  ctx.arc(game.player.x, game.player.y, 10, 0, Math.PI * 2);
  ctx.fill();

  // Enemies
  ctx.fillStyle = "red";
  game.enemies.forEach(e => {
    ctx.beginPath();
    ctx.arc(e.x, e.y, 8, 0, Math.PI * 2);
    ctx.fill();
  });

  // HP
  ctx.fillStyle = "white";
  ctx.fillText(`HP: ${Math.floor(game.player.hp)}`, 10, 20);
}

export function render(ctx, game) {
  ctx.clearRect(0, 0, 800, 600);

  // Player
  ctx.fillStyle = "cyan";
  ctx.beginPath();
  ctx.arc(game.player.x, game.player.y, 10, 0, Math.PI * 2);
  ctx.fill();

  // Enemies
  ctx.fillStyle = "red";
  game.enemies.forEach(e => {
    ctx.beginPath();
    ctx.arc(e.x, e.y, 8, 0, Math.PI * 2);
    ctx.fill();
  });

  // Exp
  ctx.fillStyle = "yellow";
  game.expOrbs.forEach(o => {
    ctx.beginPath();
    ctx.arc(o.x, o.y, 4, 0, Math.PI * 2);
    ctx.fill();
  });

  // UI
  ctx.fillStyle = "white";
  ctx.fillText(`HP: ${Math.floor(game.player.hp)}`, 10, 20);
  ctx.fillText(`Lv: ${game.player.level}`, 10, 40);
}


export function render(ctx, game) {
  ctx.clearRect(0, 0, 800, 600);

  // 攻撃エフェクト
  game.effects.forEach(e => {
    ctx.strokeStyle = e.color;
    ctx.globalAlpha = e.life / 15;
    ctx.beginPath();
    ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 1;
  });

  // Player
  ctx.fillStyle = "cyan";
  ctx.beginPath();
  ctx.arc(game.player.x, game.player.y, 10, 0, Math.PI * 2);
  ctx.fill();

  // Enemies
  ctx.fillStyle = "red";
  game.enemies.forEach(e => {
    ctx.beginPath();
    ctx.arc(e.x, e.y, 8, 0, Math.PI * 2);
    ctx.fill();
  });

  // Exp
  ctx.fillStyle = "yellow";
  game.expOrbs.forEach(o => {
    ctx.beginPath();
    ctx.arc(o.x, o.y, 4, 0, Math.PI * 2);
    ctx.fill();
  });

  // UI
  ctx.fillStyle = "white";
  ctx.fillText(`HP: ${Math.floor(game.player.hp)}`, 10, 20);
  ctx.fillText(`Lv: ${game.player.level}`, 10, 40);
}
