function createGame(character) {
  return {
    player: {
      x: 400,
      y: 300,
      hp: character.hp,
      maxHp: character.hp,
      speed: character.speed,
      rate: character.rate,
      range: character.range,
      damage: character.damage,
      weapon: "basic",
      level: 1,
      exp: 0,
      nextExp: 10,
      cooldown: 0
    },
    enemies: [],
    expOrbs: [],
    effects: [],
    choices: null
  };
}

function updateGame(game, input) {
  const p = game.player;

  if (input.w) p.y -= p.speed;
  if (input.s) p.y += p.speed;
  if (input.a) p.x -= p.speed;
  if (input.d) p.x += p.speed;

  p.cooldown -= 16;
  if (p.cooldown <= 0) {
    game.enemies.forEach(e => {
      const dx = e.x - p.x;
      const dy = e.y - p.y;
      const d = Math.hypot(dx, dy);
      if (d < p.range) {
        e.hp -= p.damage;
        p.cooldown = p.rate;
        game.effects.push({ x: e.x, y: e.y, r: 12, life: 15 });
      }
    });
  }

  game.effects = game.effects.filter(e => --e.life > 0);
}
