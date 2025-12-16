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
    effects: [],   // ★追加
    choices: null
  };
}

export function updateGame(game, input) {
  const p = game.player;

  // 移動
  if (input.w) p.y -= p.speed;
  if (input.s) p.y += p.speed;
  if (input.a) p.x -= p.speed;
  if (input.d) p.x += p.speed;

  // 攻撃
  p.cooldown -= 16;
if (p.cooldown <= 0) {
  game.enemies.forEach(e => {
    const dx = e.x - p.x;
    const dy = e.y - p.y;
    const d = Math.hypot(dx, dy);

    if (d < p.range) {
      e.hp -= p.damage;
      p.cooldown = p.rate;

      // ★攻撃エフェクト生成
      game.effects.push({
        x: e.x,
        y: e.y,
        r: p.weapon === "evolved" ? 20 : 12,
        life: 15,
        color: p.weapon === "evolved" ? "orange" : "yellow"
      });
    }
  });
}

  // 敵死亡 → 経験値
  game.enemies = game.enemies.filter(e => {
    if (e.hp <= 0) {
      game.expOrbs.push({ x: e.x, y: e.y });
      return false;
    }
    return true;
  });

  // 経験値取得
  game.expOrbs = game.expOrbs.filter(o => {
    const d = Math.hypot(p.x - o.x, p.y - o.y);
    if (d < 20) {
      gainExp(game, 1);
      return false;
    }
    return true;
  });

  // 敵生成
  if (Math.random() < 0.02) {
    game.enemies.push({
      x: Math.random() * 800,
      y: Math.random() * 600,
      hp: 30,
      speed: 1
    });
  }

  // 敵移動
  game.enemies.forEach(e => {
    const dx = p.x - e.x;
    const dy = p.y - e.y;
    const d = Math.hypot(dx, dy);
    e.x += (dx / d) * e.speed;
    e.y += (dy / d) * e.speed;
    if (d < 20) p.hp -= 0.1;
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


function gainExp(game, amount) {
  const p = game.player;
  p.exp += amount;
  if (p.exp >= p.nextExp) {
    p.exp -= p.nextExp;
    p.level++;
    p.nextExp += 5;
    game.choices = generateChoices(p);
  }
}

function generateChoices(p) {
  const pool = [
    { text: "攻撃力UP", apply: () => p.damage += 3 },
    { text: "攻撃速度UP", apply: () => p.rate *= 0.85 },
    { text: "範囲UP", apply: () => p.range += 15 },
    { text: "移動速度UP", apply: () => p.speed += 0.3 },
    { text: "HP回復", apply: () => p.hp = Math.min(p.maxHp, p.hp + 30) }
  ];

  // 武器進化条件
  if (p.weapon === "basic" && p.level >= 5) {
    pool.push({
      text: "武器進化：上位武器",
      apply: () => {
        p.weapon = "evolved";
        p.damage *= 2;
        p.range += 30;
      }
    });
  }

  return pool.sort(() => 0.5 - Math.random()).slice(0, 3);
}
