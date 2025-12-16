function render(ctx, game) {
  ctx.clearRect(0, 0, 800, 600);

  game.effects.forEach(e => {
    ctx.globalAlpha = e.life / 15;
    ctx.strokeStyle = "yellow";
    ctx.beginPath();
    ctx.arc(e.x, e.y, e.r++, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 1;
  });

  ctx.fillStyle = "cyan";
  ctx.beginPath();
  ctx.arc(game.player.x, game.player.y, 10, 0, Math.PI * 2);
  ctx.fill();
}
