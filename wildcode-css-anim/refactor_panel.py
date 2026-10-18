# -*- coding: utf-8 -*-
"""app.js：野马世界段重构 —— cfg/horses 定义即挂 window，控制台 API+绑定移出 IIFE 到顶层"""
import io

root = r"E:\WorkSpeace\WorkSpeace_Doubao\portfolio-site"
app_path = root + r"\js\app.js"
s = io.open(app_path, encoding="utf-8").read()
lines = s.split("\n")

start_marker = "/* ============ 野马世界：把页面当地形（重力/站立/翻越/躲藏）+ 控制台 ============ */"
start_idx = next(i for i, l in enumerate(lines) if start_marker in l)
loop_idx = next(i for i in range(start_idx, len(lines)) if lines[i].strip() == "loop();")
end_idx = next(i for i in range(loop_idx+1, len(lines)) if lines[i].strip() == "})();")
print("replacing lines", start_idx, "-", end_idx)

new_block = """/* ============ 野马世界：把页面当地形（重力/站立/翻越/躲藏） ============ */
(function(){
  const mouse = {x: innerWidth/2, y: innerHeight/2};
  document.addEventListener('mousemove', e=>{ mouse.x=e.clientX; mouse.y=e.clientY+window.scrollY; });

  const $ = id => document.getElementById(id);
  const HW = ($('horseFree').offsetWidth)  || 84;    /* 碰撞盒随 CSS 实际尺寸 */
  const HH = ($('horseFree').offsetHeight) || 96;

  /* 世界参数（控制台滑条实时可调，window._HORSE_.cfg 可编程改） */
  const cfg = {
    grav:.45, maxv:11, step:46,          /* 重力 / 终端速度 / 可走上矮台 */
    speed:1,                             /* 全局活跃度：free跑速 / shy溜速 / lazy踱步 */
    roam:420,                            /* 闪电漫游间隔（帧，约 7s） */
    chase:1,                             /* 绿叶追鼠加速度倍率 */
    kick:130                             /* 蓝衣踢腿触发距离 px */
  };
  window._HORSE_ = {cfg};                /* 立即挂 window：顶层控制台 API 由此读写 */

  /* 地形：可站立可阻挡的世界实体；遮挡物：可躲到后面的大块 */
  const TERRAIN_SEL = ['.hero','.hero-side','.hero-badge','.btn','.work-card','.connect-card',
                       '.gamelab-stat','.gamelab-feats','.gamelab-more','.c-card','.jl-card','.foot-inner'];
  const OCCLUDE_SEL = ['.work-card','.connect-card','.gamelab-feats','.c-card','.hero-side','.hero-badge'];

  let terrains = [], occludes = [];
  let worldW = window.innerWidth;                      /* 世界宽度 = 页面内容带 */
  function collect(){
    const sy = window.scrollY;
    terrains = []; occludes = [];
    const scan = (sel, into) => {
      document.querySelectorAll(sel).forEach(el=>{
        if(!el.offsetParent || el.classList.contains('horse')) return;
        const r = el.getBoundingClientRect();
        if(r.width < 10 || r.height < 10) return;
        into.push({el, left:r.left, right:r.left+r.width, top:r.top+sy, bottom:r.top+sy+r.height});
      });
    };
    TERRAIN_SEL.forEach(s=>scan(s, terrains));
    OCCLUDE_SEL.forEach(s=>scan(s, occludes));
    occludes.forEach(o=>{                       /* 遮挡物抬一层，供小马"钻到后面" */
      o.el.style.zIndex = 3;
      if(getComputedStyle(o.el).position === 'static') o.el.style.position = 'relative';
    });
    const wr = document.querySelector('.wrap');
    if(wr) worldW = wr.getBoundingClientRect().width;
  }
  window.addEventListener('scroll', collect, {passive:true});
  window.addEventListener('resize', collect);
  new MutationObserver(collect).observe(document.body, {childList:true, subtree:true});
  collect();

  const mk = (el, x, y, vx, vy) => ({el, x, y, vx, vy, face:1, stand:false, on:true, t:Math.random()*9, prevFeet:y+96});

  /* 刚体：重力下落 → 顶面穿越才落地 → 水平推进 → 撞墙反弹 / 矮台走上 */
  function physics(h){
    const H = Math.max(document.body.scrollHeight, window.innerHeight);
    h.vy += cfg.grav; if(h.vy > cfg.maxv) h.vy = cfg.maxv;
    h.y += h.vy;
    const feet = h.y + HH;
    h.stand = false;
    for(const t of terrains){
      if(h.x+HW > t.left+5 && h.x < t.right-5 && feet >= t.top-1 && feet <= t.top+12 && h.prevFeet <= t.top+4){
        h.y = t.top - HH; h.vy = 0; h.stand = true; break;
      }
    }
    h.prevFeet = h.y + HH;
    h.x += h.vx;
    for(const t of terrains){
      if(h.y+HH <= t.top+3) continue;                    /* 已站在顶面，不挡水平 */
      const ox = h.x+HW > t.left && h.x < t.right;
      const oy = h.y+HH > t.top+3 && h.y < t.bottom;
      if(ox && oy){
        const step = t.top - (h.y+HH);
        if(step <= cfg.step && step > -3){ h.y = t.top-HH; h.vy = 0; h.stand = true; continue; }
        if(h.x+HW - t.left < t.right - h.x) h.x = t.left - HW - 1; else h.x = t.right + 1;
        h.vx *= -1;
      }
    }
    if(h.x < 6){ h.x = 6; h.vx = Math.abs(h.vx); }
    if(h.x > worldW-HW-6){ h.x = worldW-HW-6; h.vx = -Math.abs(h.vx); }
    if(h.y < 0){ h.y = 0; h.vy = 0; }
    if(h.y > H-HH-4){ h.y = H-HH-4; h.vy = 0; h.stand = true; }
  }

  /* z 遮挡：与遮挡物重叠且身体重心在其下方 → 躲到后面（z=2）；否则常驻 105 */
  function depth(h){
    for(const o of occludes){
      if(h.x+HW>o.left && h.x<o.right && h.y+HH>o.top && h.y<o.bottom){
        if(h.y+HH/2 > o.top + (o.bottom-o.top)/2) return 2;
      }
    }
    return 105;
  }

  function paint(h){
    h.el.style.display = h.on ? '' : 'none';
    h.face = h.vx < 0 ? -1 : (h.vx > 0 ? 1 : h.face);
    h.el.style.transform = `translate(${Math.round(h.x)}px,${Math.round(h.y)}px) scaleX(${h.face})`;
    h.el.style.zIndex = depth(h);
  }

  const sy0 = window.scrollY;                          /* 出生在用户当前视野（文档坐标） */
  const horses = {
    free:  mk($('horseFree'),  innerWidth*.3,  innerHeight*.3 +sy0, 4.5, 1),
    shy:   mk($('horseShy'),   innerWidth-90, innerHeight-110+sy0, 0, 0),
    happy: mk($('horseHappy'), innerWidth*.6, innerHeight*.4 +sy0, 0, 0),
    lazy:  mk($('horseLazy'),  innerWidth*.2, innerHeight*.7 +sy0, 0, 0),
    angry: mk($('horseAngry'), innerWidth*.7, innerHeight*.75+sy0, 0, 0)
  };
  window._HORSE_.horses = horses;

  /* 出生落位：站到当前视野内的小台面（按钮/徽章/卡片）顶上，一打开页面就"踩"在组件上 */
  const usedTerrain = new Set();
  function spawnOnTerrain(h){
    const vTop = window.scrollY, vBot = window.scrollY + innerHeight;
    let cand = terrains.filter(t=>t.bottom>vTop && t.top<vBot);
    cand = cand.filter(t=>['btn','hero-badge','work-card','connect-card','gamelab-feats','gamelab-stat','c-card','foot-inner'].some(c=>t.el.classList.contains(c)));
    const fresh = cand.filter(t=>!usedTerrain.has(t));
    const pool = fresh.length ? fresh : cand;
    if(!pool.length) pool.push(...terrains.filter(t=>t.el.classList.contains('work-card')));
    if(pool.length){
      const t = pool[Math.floor(Math.random()*pool.length)];
      usedTerrain.add(t);
      h.x = t.left + Math.random()*(Math.max(8, t.right-t.left-HW));
      h.y = t.top - HH; h.vy = 0; h.vx = h.vx||0; h.stand = true;
      h.prevFeet = t.top;
    } else { h.y = 0; h.prevFeet = 0; }
  }
  Object.values(horses).forEach(spawnOnTerrain);

  /* 闪电：周期性"世界漫游"——每 cfg.roam 帧瞬移到任意卡片台面顶 */
  function freeRespawn(f){
    f.ret = (f.ret||0) + 1;
    if(f.ret < cfg.roam) return;
    f.ret = 0;
    const tops = terrains.filter(t=>['work-card','connect-card','gamelab-feats','c-card'].some(c=>t.el.classList.contains(c)));
    if(tops.length){
      const t = tops[Math.floor(Math.random()*tops.length)];
      f.x = t.left + Math.random()*(Math.max(8, t.right-t.left-HW));
      f.y = t.top - HH - 1; f.vy = 0; f.stand = true; f.prevFeet = t.top;
    }
  }

  function loop(){
    if(document.hidden){ requestAnimationFrame(loop); return; }
    const {free, shy, happy, lazy, angry} = horses;

    /* 1 闪电：世界跑酷，见矮台跳上去，见高墙反弹，偶尔跃起 */
    if(free.on){
      if(Math.random() < .008) free.vx = (Math.random()<.5?-1:1) * (3.5+Math.random()*3.5) * cfg.speed;
      free.vx += (Math.random()-.5)*.3*cfg.speed;
      if(free.stand && Math.random() < .014) free.vy = -7.5*Math.min(cfg.speed,1.3);
      freeRespawn(free);
      physics(free); paint(free);
    } else free.el.style.display = 'none';

    /* 2 粉樱：鼠标靠近就溜走，喜欢躲到遮挡物后面 */
    if(shy.on){
      const sd = Math.hypot(shy.x+HW/2-mouse.x, shy.y+HH/2-mouse.y);
      if(sd < 280){
        shy.vx = (shy.x < mouse.x ? -1 : 1) * 3.2*cfg.speed;
        shy.vy = (shy.y < mouse.y ? -1 : 1) * 1.4*cfg.speed;
      } else { shy.vx *= .86; shy.vy *= .86; }
      if(Math.random() < .003 && !shy.stand) shy.vy = -4*Math.min(cfg.speed,1.3);
      physics(shy); paint(shy);
    } else shy.el.style.display = 'none';

    /* 3 绿叶：绕鼠标蹦跳转圈，到处落地 */
    if(happy.on){
      happy.t += .05;
      const tx = mouse.x + Math.cos(happy.t)*120 - HW/2;
      const ty = mouse.y + Math.sin(happy.t)*70 - HH/2;
      happy.vx += (tx-happy.x)*.05*cfg.chase; happy.vy += (ty-happy.y)*.028*cfg.chase;
      if(happy.vx >  7) happy.vx =  7; if(happy.vx < -7) happy.vx = -7;
      if(happy.vy >  7) happy.vy =  7; if(happy.vy < -7) happy.vy = -7;
      if(happy.stand && Math.random() < .05) happy.vy = -6.5*Math.min(cfg.chase,1.3);
      physics(happy); paint(happy);
    } else happy.el.style.display = 'none';

    /* 4 棕鬃：找片平地站定，偶尔踱两步 */
    if(lazy.on){
      lazy.vx *= .82; lazy.vy *= .82;
      if(lazy.stand && Math.random() < .012){
        lazy.vx = (Math.random()<.5?-1:1)*.9*cfg.speed;
        lazy.vy = -2.5*Math.min(cfg.speed,1.3);
      }
      physics(lazy); paint(lazy);
    } else lazy.el.style.display = 'none';

    /* 5 蓝衣：守地盘，鼠标太近就扬蹄踹开 + 震卡片 */
    if(angry.on){
      angry.cd = (angry.cd||0) - 1;
      const ad = Math.hypot(angry.x+HW/2-mouse.x, angry.y+HH/2-mouse.y);
      if(ad < cfg.kick && angry.cd <= 0){
        angry.cd = 110;
        angry.el.classList.remove('kick'); void angry.el.offsetWidth; angry.el.classList.add('kick');
        const push = Math.atan2(angry.y-mouse.y, angry.x-mouse.x);
        angry.x += Math.cos(push)*60; angry.y += Math.sin(push)*40;
        angry.vx = Math.cos(push)*4; angry.vy = -5;
        const cards = document.querySelectorAll('.work-card');
        if(cards.length){
          const c = cards[Math.floor(Math.random()*cards.length)];
          c.style.transition = 'transform .1s';
          c.style.transform = 'translateX(6px)';
          setTimeout(()=>{ c.style.transform=''; }, 120);
          setTimeout(()=>{ c.style.transform='translateX(-4px)'; }, 180);
          setTimeout(()=>{ c.style.transform=''; }, 260);
        }
      }
      angry.vx *= .9; angry.vy *= .9;
      physics(angry); paint(angry);
    } else angry.el.style.display = 'none';

    requestAnimationFrame(loop);
  }
  loop();
})();

/* ============ 野马控制台：悬浮窗 API + 绑定（顶层独立段） ============ */
window.HORSE_WORLD = {
  get cfg(){ return window._HORSE_ && window._HORSE_.cfg; },
  get horses(){ return window._HORSE_ && window._HORSE_.horses; },
  toggle(key){
    const horses = this.horses; if(!horses) return;
    if(key === 'pet'){
      const p = document.getElementById('pet');
      if(!p) return;
      const on = p.style.display !== 'none';
      p.style.display = on ? 'none' : '';
      return !on;
    }
    const h = horses[key]; if(!h) return;
    h.on = !h.on; h.el.style.display = h.on ? '' : 'none';
    return h.on;
  }
};
window.__PANEL__ = 'v2-panel';

(function(){
  const gear = document.getElementById('panelGear');
  const panel = document.getElementById('horsePanel');
  const close = document.getElementById('hpClose');
  if(!gear || !panel) return;
  const show = flag => { panel.hidden = !flag; gear.classList.toggle('on', !!flag); };
  gear.addEventListener('click', e=>{ e.stopPropagation(); show(panel.hidden); });
  if(close) close.addEventListener('click', e=>{ e.stopPropagation(); show(false); });
  document.addEventListener('click', e=>{
    if(!panel.hidden && !panel.contains(e.target) && !gear.contains(e.target)) show(false);
  });

  /* 音量（并入面板） */
  const bgm = document.getElementById('bgm');
  const hpVol = document.getElementById('hpVol');
  if(bgm && hpVol){ bgm.volume = hpVol.value/100; hpVol.addEventListener('input', ()=>{ bgm.volume = hpVol.value/100; }); }

  /* 马群显隐（data-horse） */
  document.querySelectorAll('[data-horse]').forEach(cb=>{
    cb.addEventListener('change', ()=>window.HORSE_WORLD.toggle(cb.dataset.horse));
  });

  /* 参数滑条（data-key + data-scale + data-dp + data-disp/suffix） */
  document.querySelectorAll('.hp-row input[type="range"][data-key]').forEach(el=>{
    const key = el.dataset.key, scale = +(el.dataset.scale||1), dp = +(el.dataset.dp||0);
    const out = document.getElementById(el.id + 'V');
    const apply = ()=>{
      const v = +el.value * scale;
      const cfg = window._HORSE_ && window._HORSE_.cfg;
      if(cfg) cfg[key] = v;
      if(out) out.textContent = el.dataset.disp === 'sec' ? (v/60).toFixed(1)+'s' : v.toFixed(dp)+(el.dataset.suffix||'');
    };
    el.addEventListener('input', apply);
    apply();
  });
})();"""

new_lines = lines[:start_idx] + new_block.split("\n") + lines[end_idx+1:]
out = "\n".join(new_lines)
with io.open(app_path, "w", encoding="utf-8", newline="") as f:
    f.write(out)
print("refactor ok, chars:", len(out))
