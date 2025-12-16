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
