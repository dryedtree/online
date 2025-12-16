export function createGame(character) {
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
    choices: null
  };
}

export function updateGame(game, input) {
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
      const dist = Math.hypot(dx, dy);
      if (dist < p.range) {
        e.hp -= p.damage;
        p.cooldown = p.rate;
      }
    });
  }

  game.enemies = game.enemies.filter(e => e.hp > 0);

  if (Math.random() < 0.02) {
    game.enemies.push({
      x: Math.random() * 800,
      y: Math.random() * 600,
      hp: 30,
      speed: 1
    });
  }

  game.enemies.forEach(e => {
    const dx = p.x - e.x;
    const dy = p.y - e.y;
    const d = Math.hypot(dx, dy);
    e.x += (dx / d) * e.speed;
    e.y += (dy / d) * e.speed;

    if (d < 20) p.hp -= 0.1;
  });
}
