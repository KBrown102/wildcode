
/* ============ 数据：项目 ============ */
const projects = [
  {
    idx:'01', name:'时空幸存者', en:'Time Survivors',
    desc:'像素风幸存者类 Roguelite：ESM 模块化架构、技能树成长系统、三存档机制，在怪潮中生存、升级、进化。',
    tags:['JavaScript','Canvas','Roguelite'], cat:'GAME',
    cover:'assets/covers/time-survivors.jpg',
    repo:'https://github.com/KBrown102/time-survivors',
    demo:'https://survivors.wildcode.cn/'
  },
  {
    idx:'02', name:'飞鸟巡游', en:'Bird Flight Safari',
    desc:'俯视角飞鸟向上穿越五个场景的循环小游戏——从星空银河到冰原，一镜到底的飞行体验。',
    tags:['Three.js','Canvas','壁纸场景'], cat:'WALLPAPER',
    cover:'assets/covers/bird-flight-safari.jpg',
    repo:'https://github.com/KBrown102/bird-flight-safari',
    demo:'https://safari.wildcode.cn/'
  },
  {
    idx:'03', name:'旅行牛仔', en:'Traveling Cowboy',
    desc:'西部主题网页休闲游戏原型，纯前端实现，打开浏览器即可游玩，在荒野中踏上旅途。',
    tags:['JavaScript','HTML5','壁纸场景'], cat:'WALLPAPER',
    cover:'assets/covers/traveling-cowboy.jpg',
    repo:'https://github.com/KBrown102/Traveling-Cowboy',
    demo:'https://cowboy.wildcode.cn/'
  },
  {
    idx:'04', name:'烟花工坊 · 配方师', en:'Fireworks Studio',
    desc:'像调酒一样调配烟花：火药配比、颜色、爆炸形态与节奏，画布实时发射预览，配方保存复用。从一捧火药，到满天星河。',
    tags:['Canvas','粒子系统','创意工具'], cat:'TOOL',
    cover:'assets/covers/fireworks-studio.jpg',
    repo:'https://github.com/KBrown102/fireworks-studio',
    demo:'https://fireworks.wildcode.cn/'
  },
  {
    idx:'05', name:'无人机表演 · 节目编排', en:'Drone Show',
    desc:'纯前端无人机编队表演编排工具：拖拽时间轴、排布队形、设计灯光，导出 JSON 节目单，实时预览所见即所得。',
    tags:['JavaScript','时间轴编排','创意工具'], cat:'TOOL',
    cover:'assets/covers/drone-show.jpg',
    repo:'https://github.com/KBrown102/drone-show',
    demo:'https://drone.wildcode.cn/'
  },
  {
    idx:'06', name:'拼豆图纸生成器', en:'Perler Bead Generator',
    desc:'把本地图片转成拼豆图纸的网页工具。纯本地运行、图片不上传，无需安装、零依赖。',
    tags:['JavaScript','图像处理','本地工具'], cat:'TOOL',
    cover:'assets/covers/perler-bead-generator.jpg',
    repo:'https://github.com/KBrown102/perler-bead-generator',
    demo:'https://perler.wildcode.cn/'
  },
  {
    idx:'07', name:'灵感图谱', en:'InspireGraph',
    desc:'把灵感诞生做成可观测的机制：多源概念扫描长出带权重的神经元，突触相连、按脑区分块，开可塑性自动演化出灵感种子。',
    tags:['JavaScript','3D 图谱','概念网络'], cat:'TOOL',
    cover:'assets/covers/inspire-graph.jpg',
    repo:'https://github.com/KBrown102/InspireGraph',
    demo:'https://inspire.wildcode.cn/'
  },
  {
    idx:'08', name:'项目结构分析器', en:'Project Analyzer',
    desc:'读取项目目录自动判断类型（18 套模板）、流程卡点与缺失文件，按 P0–P3 分级给出下一步建议，可打包成桌面工具。',
    tags:['HTML','本地工具','项目诊断'], cat:'TOOL',
    cover:'assets/covers/project-analyzer.jpg',
    repo:'https://github.com/KBrown102/project-analyzer',
    demo:null
  },
  {
    idx:'09', name:'桌面壁纸引擎', en:'DeskCanvas',
    desc:'自制桌面壁纸软件：导入图片、网页、视频设为电脑壁纸，支持接入 AI 生成壁纸，把整个屏幕变成你的画布。',
    tags:['TypeScript','桌面应用','壁纸工具'], cat:'WALLPAPER',
    cover:'assets/covers/deskcanvas.jpg',
    repo:'https://github.com/KBrown102/deskcanvas',
    demo:null
  },
  {
    idx:'10', name:'时空立方体', en:'Space-Time Cube',
    desc:'把视频每一帧按时间堆叠成半透明柱体——用伪 4D 的视角看 3D 的世界，运动的轨迹在柱体里变成发光的“世界线”，拖动画布从任意角度观察时间。',
    tags:['Three.js','视频处理','时空可视化'], cat:'TOOL',
    cover:'assets/covers/space-time-cube.jpg',
    repo:'https://github.com/KBrown102/space-time-cube',
    demo:'https://spacetime.wildcode.cn/'
  }
];

/* ============ 渲染：作品卡片 ============ */
const grid = document.getElementById('worksGrid');
grid.innerHTML = projects.map((p,i)=>{
  const flip = i%2===1 ? ' flip':'';
  const dirMedia = i%2===0 ? 'from-l' : 'from-r';
  const playBtn = p.demo
    ? `<button class="btn btn-primary" data-play="${p.demo}" data-name="${p.en}">在线试玩</button>`
    : '';
  const liveTag = p.demo ? '<span class="live">在线</span>' : '';
  return `
  <article class="work-card${flip}" data-cat="${p.cat}"${p.en==='Fireworks Studio'?' data-fw="1"':''}${p.en==='Drone Show'?' data-drone="1"':''}${p.en==='Bird Flight Safari'?' data-bird="1"':''}${p.en==='Traveling Cowboy'?' data-cowboy="1"':''}${p.en==='Space-Time Cube'?' data-cube="1"':''}>
    <div class="work-media reveal ${dirMedia}">
      ${liveTag}
      <span class="cat">${p.cat}</span>
      <img src="${p.cover}" alt="${p.en} 封面" loading="lazy">
    </div>
    <div class="work-info">
      <div class="work-idx reveal from-flip">${p.idx}</div>
      <h3 class="work-name reveal from-flip">${p.name}<span class="en">${p.en}</span></h3>
      <p class="work-desc reveal from-r">${p.desc}</p>
      <div class="work-tags reveal from-d">${p.tags.map(t=>`<span>${t}</span>`).join('')}</div>
      <div class="work-actions reveal from-l">
        ${playBtn}
        <a class="btn btn-ghost" href="${p.repo}" target="_blank" rel="noopener">GitHub 源码</a>
      </div>
    </div>
  </article>`;
}).join('');

/* ============ 作品分类筛选 ============ */
document.querySelectorAll('.filter-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('on'));
    btn.classList.add('on');
    const f = btn.dataset.filter;
    document.querySelectorAll('.work-card').forEach(card=>{
      const show = f==='ALL' || card.dataset.cat===f;
      card.style.display = show ? '' : 'none';
      if(show){
        card.classList.remove('in');
        void card.offsetWidth;
        card.classList.add('in');
      }
    });
  });
});

/* ============ 渲染：游戏宇宙代表作品 ============ */
const labGrid = document.getElementById('gameLabGrid');
const labGames = projects.filter(p=>p.cat==='GAME'&&p.demo).slice(0,3);
labGrid.innerHTML = labGames.map(p=>`
  <div class="glab-game reveal">
    <img src="${p.cover}" alt="${p.en}" loading="lazy">
    <button class="play" data-play="${p.demo}" data-name="${p.en}" aria-label="试玩 ${p.en}">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
    </button>
    <div class="info"><h4>${p.name}</h4><p>${p.en} · 在线试玩</p></div>
  </div>`).join('');

/* ============ 荒野远征·成长线 ============ */
const journey = [
  {year:'2011', tag:'起点 · 玩心', title:'打砖块', text:'课堂之外，偷偷复刻了人生第一款游戏。第一行代码，是游戏。'},
  {year:'2023', tag:'遇见 AI', title:'它开始说话了', text:'AI 第一次不只是聊天工具，开始帮我看代码、分析问题、给方案。'},
  {year:'2024', tag:'豆包元年', title:'傻妞进化中', text:'豆包发布当天就下载体验。当时的豆包是真傻妞——后来的故事，你都知道了。'},
  {year:'2025', tag:'用 AI 干活', title:'第一次交付', text:'Trae 发布，用它从零做了两个 Unity 辅助工具：赛车机模拟器、CDK 生成器。第一次让 AI 产出能交付的东西。'},
  {year:'2026 春', tag:'巴别塔', title:'没建成的塔', text:'想做一个直播弹幕互动建塔游戏，系统越加越多，最后弃坑。野心先到，能力后到。'},
  {year:'2026.05', tag:'游戏工厂', title:'回到荒野', text:'创业告一段落，回家重新出发。先造了「神经元大脑」，让 AI 自己产生灵感、自己做游戏。'},
  {year:'2026.07', tag:'第一个游戏', title:'留白与治愈', text:'治愈向、无关卡、留白。7 月 12 日第一个小游戏诞生，验证了灵感 + 自动化的流程。'},
  {year:'2026.08', tag:'开源', title:'交给世界', text:'攒下了第一批作品，开始整理上传 GitHub。原创公开发布，交给世界。'},
  {year:'2026.08', tag:'野码', title:'有了这个念头', text:'荒野 + 程序员 = WILD CODE。野码的念头，从这一刻开始。'},
  {year:'2026.10', tag:'重庆', title:'再出发', text:'10 月 4 日落地重庆，和以前的老同事俩人准备创业。一边帮他完成手头的项目，一边研究怎么接新项目。'},
  {year:'NOW', tag:'远征', title:'未完待续', text:'个人网站上线，把做的东西给更多人看。游戏社区、视频号……荒野还在跑。'}
];
document.getElementById('journeyLine').innerHTML = journey.map((j,i)=>`
  <div class="jl-node reveal ${i%2?'from-r':'from-l'}">
    <div class="jl-year">${j.year}</div>
    <div class="jl-card">
      <div class="jl-tag">${j.tag}</div>
      <h3>${j.title}</h3>
      <p>${j.text}</p>
    </div>
  </div>`).join('');

/* ============ 悬浮导航 + 回到顶部 ============ */
(function(){
  const secs = [['top','首页'],['works','作品'],['connect','交流'],['gamelab','游戏宇宙'],['about','关于'],['journey','成长线'],['contact','联系']];
  const nav = document.getElementById('dotNav');
  if(!nav) return;
  const icons = {top:'M3 11 12 3l9 8M5 10v11h14V10',works:'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',connect:'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',gamelab:'M6 12h4m-2-2v4M13 12h.01M16 12h.01M7 6h10a4 4 0 0 1 4 4v4a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-4a4 4 0 0 1 4-4z',about:'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2c-4.4 0-8 2.7-8 6h16c0-3.3-3.6-6-8-6z',journey:'M5 21V4M5 4h13l-3 4 3 4H5',contact:'M4 6h16v12H4zM4 7l8 6 8-6'};
  nav.innerHTML = secs.map(s=>`<a href="#${s[0]}" data-dot="${s[0]}" title="${s[1]}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${icons[s[0]]}"/></svg><b>${s[1]}</b></a>`).join('');
  const dots = [...nav.children];
  dots.forEach(d=>d.addEventListener('click',e=>{
    const t = document.getElementById(d.dataset.dot);
    if(t){ e.preventDefault(); t.scrollIntoView({behavior:'smooth'}); }
  }));
  const io2 = new IntersectionObserver(es=>{
    es.forEach(e=>{ if(e.isIntersecting) dots.forEach(d=>d.classList.toggle('on', d.dataset.dot===e.target.id)); });
  },{rootMargin:'-45% 0px -45% 0px'});
  secs.forEach(s=>{ const el = document.getElementById(s[0]); if(el) io2.observe(el); });

  const toTop = document.getElementById('toTop');
  if(!toTop) return;
  let ticking = false;
  window.addEventListener('scroll',()=>{
    if(!ticking){
      requestAnimationFrame(()=>{ toTop.classList.toggle('show', window.scrollY > 700); ticking = false; });
      ticking = true;
    }
  },{passive:true});
  toTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
})();
const modal = document.getElementById('gameModal');
const frame = document.getElementById('gameFrame');
const modalTitle = document.getElementById('modalTitle');
const modalOpen = document.getElementById('modalOpen');
let currentDemo = '';
function openGame(url,name){
  currentDemo = url;
  const fl = document.getElementById('frameLoading');
  fl.classList.remove('hide');
  frame.onload = ()=> fl.classList.add('hide');
  frame.src = url;
  modalTitle.textContent = '试玩 · ' + name;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeGame(){
  modal.classList.remove('open');
  frame.src = '';
  document.body.style.overflow = '';
}
document.addEventListener('click',e=>{
  const btn = e.target.closest('[data-play]');
  if(btn){ openGame(btn.dataset.play, btn.dataset.name); return; }
});
document.getElementById('modalClose').addEventListener('click',closeGame);
modalOpen.addEventListener('click',()=>{ if(currentDemo) window.open(currentDemo,'_blank','noopener'); });
const wxOverlay = document.getElementById('wxOverlay');
document.getElementById('showWxQr').addEventListener('click',()=>wxOverlay.classList.add('show'));
document.getElementById('wxClose').addEventListener('click',()=>wxOverlay.classList.remove('show'));
wxOverlay.addEventListener('click',e=>{ if(e.target===wxOverlay) wxOverlay.classList.remove('show'); });
document.addEventListener('keydown',e=>{ if(e.key==='Escape') closeGame(); });
modal.addEventListener('click',e=>{ if(e.target===modal) closeGame(); });

/* ============ 横滑轮播箭头 ============ */
document.querySelectorAll('.hscroll-arrow').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.getElementById('gameLabGrid').scrollBy({left:+btn.dataset.dir*340, behavior:'smooth'});
  });
});

/* ============ 复制微信号 ============ */
const copyBtn = document.getElementById('copyWechat');
copyBtn.addEventListener('click',async ()=>{
  const text = '137'+'1614'+'4130';
  try{
    await navigator.clipboard.writeText(text);
  }catch(err){
    const ta = document.createElement('textarea');
    ta.value = text; document.body.appendChild(ta);
    ta.select(); document.execCommand('copy'); ta.remove();
  }
  const original = copyBtn.innerHTML;
  copyBtn.innerHTML = '已复制';
  copyBtn.style.color = 'var(--teal)';
  setTimeout(()=>{ copyBtn.innerHTML = original; copyBtn.style.color=''; },1800);
});

/* ============ 导航交互 ============ */
const burger = document.getElementById('navBurger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click',()=>{
  burger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
document.querySelectorAll('[data-nav]').forEach(a=>{
  a.addEventListener('click',()=>{
    burger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ============ 滚动揭示 ============ */
const io = new IntersectionObserver(entries=>{
  entries.forEach(en=>{
    en.target.classList.toggle('in', en.isIntersecting);
  });
},{threshold:.12,rootMargin:'0px 0px -6% 0px'});
document.querySelectorAll('.reveal,.work-card').forEach(el=>io.observe(el));

/* ============ 数字滚动计数 ============ */
(function(){
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.querySelectorAll('[data-count]').forEach(el=>{
    const target = +el.dataset.count;
    const suffix = el.innerHTML.replace(/^\d+/,'');
    const cio = new IntersectionObserver((es,obs)=>{
      es.forEach(en=>{
        if(!en.isIntersecting) return;
        obs.unobserve(en.target);
        let start = null;
        function step(ts){
          if(!start) start = ts;
          const p = Math.min((ts-start)/1500,1);
          const e = 1-Math.pow(1-p,3);
          el.innerHTML = Math.round(target*e)+suffix;
          if(p<1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    },{threshold:.4});
    cio.observe(el);
  });
})();

/* ============ 自定义光标 ============ */
const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{
  mx=e.clientX; my=e.clientY;
  dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
});
(function ringLoop(){
  if(document.hidden){ requestAnimationFrame(ringLoop); return; }
  rx += (mx-rx)*.14;
  ry += (my-ry)*.14;
  ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
  requestAnimationFrame(ringLoop);
})();
document.addEventListener('mouseover',e=>{
  if(e.target.closest('a,button,.glab-game')) document.body.classList.add('cursor-on');
});
document.addEventListener('mouseout',e=>{
  if(e.target.closest('a,button,.glab-game')) document.body.classList.remove('cursor-on');
});

/* ============ 烟花工坊联动：循环随机炸 ============ */
(function(){
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  function burst(card, fx, fy){
    const colors = ['#FF6A3D','#3DE0C8','#FFD166','#FF8FAB','#fff','#ff5a7a'];
    const n = 12 + Math.floor(Math.random()*10);
    for(let i=0;i<n;i++){
      const p = document.createElement('div');
      p.className = 'fw-particle';
      const a = (i/n)*Math.PI*2;
      const d = 40+Math.random()*90;
      p.style.setProperty('--dx', Math.cos(a)*d+'px');
      p.style.setProperty('--dy', Math.sin(a)*d+'px');
      p.style.background = colors[Math.floor(Math.random()*colors.length)];
      p.style.boxShadow = `0 0 8px ${p.style.background}`;
      p.style.left = fx+'px'; p.style.top = fy+'px';
      card.appendChild(p);
      setTimeout(()=>p.remove(), 950);
    }
  }
  const cards = document.querySelectorAll('[data-fw]');
  cards.forEach(card=>{
    card.style.position = 'relative';
    setInterval(()=>{
      const r = card.getBoundingClientRect();
      if(r.top < innerHeight && r.bottom > 0){
        burst(card, Math.random()*card.clientWidth, Math.random()*card.clientHeight);
      }
    }, 1000);
  });
})();

/* ============ 彩蛋：控制台欢迎 + 拦截 ============ */
(function(){
  const style = 'color:#FF6A3D;font-size:15px;font-weight:bold;padding:4px 0;';
  const dim = 'color:#8A8F98;font-size:12px;';
  console.log('%c WILD CODE · 野码', style);
  console.log('%c 你来了。翻代码不如直接来玩—— ', dim);
  console.log('%c 荒野 · 赵重 · 微信 137****4130 · 8353****@qq.com', 'color:#3DE0C8;font-size:13px;');
  /* ASCII 小马奔过荒原 */
  const horse = [
    "        .--.     .--.     .--.     .--.",
    "       / - \\   / - \\   / - \\   / - \\",
    "      | o o | | o o | | o o | | o o |",
    "   ────(───)─(───)─(───)─(───)────"
  ];
  let f = 0;
  const run = setInterval(()=>{
    console.log('%c' + horse[f % horse.length], 'color:#FF6A3D;font-family:monospace;');
    f++;
    if(f > 3) clearInterval(run);
  }, 180);

  /* 拦截右键 */
  document.addEventListener('contextmenu', e=>{
    e.preventDefault();
    console.log('%c 别挖了。想抄代码？先扫个码，荒野微信 137****4130。', 'color:#FF6A3D;font-size:13px;');
  });
  /* 拦截 F12 / Ctrl+Shift+I/J/C / Ctrl+U */
  document.addEventListener('keydown', e=>{
    const k = e.key.toUpperCase();
    if(e.key === 'F12' ||
       (e.ctrlKey && e.shiftKey && (k==='I'||k==='J'||k==='C')) ||
       (e.ctrlKey && k==='U')){
      e.preventDefault();
      console.log('%c 我预判了你的预判。', 'color:#3DE0C8;font-size:14px;font-weight:bold;');
    }
  });
})();

/* ============ 野码小马：BGM 开关 ============ */
(function(){
  const pet = document.getElementById('pet');
  const bgm = document.getElementById('bgm');
  if(!pet || !bgm) return;
  pet.addEventListener('click', ()=>{
    if(bgm.paused){
      bgm.play().then(()=>{
        pet.classList.add('playing');
        console.log('%c 野码乐队上线。', 'color:#FF6A3D;font-size:13px;');
      }).catch(()=>{
        console.log('%c 浏览器不让自动播，再点一下试试。', 'color:#8A8F98;font-size:12px;');
      });
    } else {
      bgm.pause();
      pet.classList.remove('playing');
    }
  });
})();

/* ============ 野马世界：把页面当地形（重力/站立/翻越/躲藏） ============ */
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
})();

(function(){
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const cv = document.getElementById('stars');
  const ctx = cv.getContext('2d');
  let W,H,DPR;
  const ORANGE=[255,106,61], TEAL=[61,224,200], WHITE=[232,230,225];
  function resize(){
    DPR = Math.min(window.devicePixelRatio||1, innerWidth*innerHeight > 3000000 ? 1.25 : 1.5);
    W = window.innerWidth; H = window.innerHeight;
    cv.width = W*DPR; cv.height = H*DPR;
    ctx.setTransform(DPR,0,0,DPR,0,0);
  }
  window.addEventListener('resize',resize);

  /* 光晕 */
  /* 光晕（离屏预渲染精灵，避免每帧重建径向渐变） */
  function makeGlow(c){
    const s = 256, off = document.createElement('canvas');
    off.width = s; off.height = s;
    const oc = off.getContext('2d');
    const gr = oc.createRadialGradient(s/2,s/2,0,s/2,s/2,s/2);
    gr.addColorStop(0,`rgba(${c[0]},${c[1]},${c[2]},1)`);
    gr.addColorStop(.4,`rgba(${c[0]},${c[1]},${c[2]},.3)`);
    gr.addColorStop(1,'rgba(0,0,0,0)');
    oc.fillStyle = gr; oc.fillRect(0,0,s,s);
    return off;
  }

  const glows = [
    {x:.22,y:.28,r:.42,c:[255,106,61],a:.05,vx:.00012,vy:.00008},
    {x:.8,y:.62,r:.5,c:[61,224,200],a:.04,vx:-.0001,vy:.00006},
    {x:.55,y:.85,r:.38,c:[255,150,90],a:.035,vx:.00007,vy:-.00009}
  ];
  /* 粒子 */
  const P = [];
  glows.forEach(g=>g.spr = makeGlow(g.c));
  const mouse = {x:-9999,y:-9999};
  function spawn(n){
    for(let i=0;i<n;i++){
      P.push({
        x:Math.random()*W, y:Math.random()*H,
        vx:(Math.random()-.5)*.16, vy:(Math.random()-.5)*.16,
        r:Math.random()*1.6+.5,
        c:Math.random()<.62?WHITE:(Math.random()<.5?ORANGE:TEAL),
        a:Math.random()*.5+.15,
        tw:Math.random()*Math.PI*2,
        ts:Math.random()*.02+.004
      });
    }
  }
  function step(){
    if(document.hidden){ requestAnimationFrame(step); return; }
    ctx.clearRect(0,0,W,H);
    /* 光晕 */
    const t = Date.now()/1000;
    for(const g of glows){
      const gx = (g.x + Math.sin(t*g.vx*100)*.03)*W;
      const gy = (g.y + Math.cos(t*g.vy*100)*.03)*H;
      const d = g.r*Math.max(W,H)*2;
      ctx.globalAlpha = g.a;
      ctx.drawImage(g.spr, gx-d/2, gy-d/2, d, d);
 
 
    }
    /* 粒子 */
    ctx.globalAlpha = 1;
    for(const p of P){
      p.x += p.vx; p.y += p.vy;
      p.tw += p.ts;
      if(p.x< -10) p.x = W+10; if(p.x>W+10) p.x = -10;
      if(p.y< -10) p.y = H+10; if(p.y>H+10) p.y = -10;
      /* 鼠标光带：靠近鼠标的粒子被轻微吸引 */
      const dx = mouse.x-p.x, dy = mouse.y-p.y;
      const d2 = dx*dx+dy*dy;
      if(d2 < 120*120){
        const d = Math.sqrt(d2)||1;
        const f = (1-d/120)*.12;
        p.x += dx/d*f; p.y += dy/d*f;
        ctx.fillStyle = `rgba(${ORANGE[0]},${ORANGE[1]},${ORANGE[2]},${Math.min(.9,p.a*.6+.3)})`;
      }else{
        ctx.fillStyle = `rgba(${p.c[0]},${p.c[1]},${p.c[2]},${p.a*(.55+.45*Math.sin(p.tw))})`;
      }
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fill();
    }
    requestAnimationFrame(step);
  }
  document.addEventListener('mousemove',e=>{ mouse.x=e.clientX; mouse.y=e.clientY; });
  document.addEventListener('mouseleave',()=>{ mouse.x=-9999; mouse.y=-9999; });
  resize();
  const count = Math.min(240, Math.round(W*H/7000));
  spawn(count);
  step();
})();

/* ============ Three.js 3D 背景世界（浮岛主题） ============ */
(function(){
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if(typeof THREE === 'undefined') return;
  const cv = document.getElementById('scene3d');
  const renderer = new THREE.WebGLRenderer({canvas:cv, alpha:true, antialias:true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1, innerWidth*innerHeight > 3000000 ? 1.25 : 1.5));
  renderer.outputEncoding = THREE.sRGBEncoding;
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0a0c12, 0.04);
  const camera = new THREE.PerspectiveCamera(60, innerWidth/innerHeight, 0.1, 100);
  camera.position.set(0, 1.2, 14);

  scene.add(new THREE.AmbientLight(0x465062, 1.4));
  const key = new THREE.DirectionalLight(0xff8a5a, 1.2); key.position.set(5,8,4); scene.add(key);
  const rim = new THREE.DirectionalLight(0x3de0c8, .7); rim.position.set(-6,3,-4); scene.add(rim);

  /* 共享星尘 */
  const starGeo = new THREE.BufferGeometry();
  const N = 900, pos = new Float32Array(N*3);
  for(let i=0;i<N;i++){ pos[i*3]=(Math.random()-.5)*70; pos[i*3+1]=(Math.random()-.5)*34; pos[i*3+2]=-Math.random()*40-4; }
  starGeo.setAttribute('position', new THREE.BufferAttribute(pos,3));
  const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({color:0xe8e6e1,size:.055,transparent:true,opacity:.6}));
  scene.add(stars);

  /* 浮岛荒野 */
  function buildIsland(){
    const g = new THREE.Group();
    const rockMat = new THREE.MeshStandardMaterial({color:0x2b3442,roughness:.95,metalness:.1,flatShading:true});
    const treeMat = new THREE.MeshStandardMaterial({color:0x1d5a4c,roughness:1,flatShading:true});
    const fireMat = new THREE.MeshBasicMaterial({color:0xff6a3d});
    const houseMat = new THREE.MeshStandardMaterial({color:0x3a2e28,roughness:1,flatShading:true});
    const winMat = new THREE.MeshBasicMaterial({color:0xffd27a});
    const isl = [], floaters = [];
    function island(px,py,pz,s,house){
      const gr = new THREE.Group();
      const rock = new THREE.Mesh(new THREE.ConeGeometry(1.6*s,2.4*s,6),rockMat); rock.rotation.x=Math.PI; gr.add(rock);
      const top = new THREE.Mesh(new THREE.CylinderGeometry(1.6*s,1.6*s,.22*s,6),rockMat); top.position.y=1.15*s; gr.add(top);
      for(let i=0;i<2;i++){ const t=new THREE.Mesh(new THREE.ConeGeometry(.18*s,.55*s,5),treeMat); t.position.set((i-.55)*.8*s,1.5*s,(Math.random()-.5)*.6*s); gr.add(t); }
      const fire = new THREE.Mesh(new THREE.SphereGeometry(.12*s,8,8),fireMat); fire.position.set(.55*s,1.35*s,.2*s); gr.add(fire);
      if(house){
        const h = new THREE.Mesh(new THREE.BoxGeometry(.42*s,.36*s,.42*s),houseMat);
        h.position.set(-.55*s,1.45*s,-.25*s); gr.add(h);
        const win = new THREE.Mesh(new THREE.SphereGeometry(.055*s,6,6),winMat);
        win.position.set(-.55*s,1.45*s,-.02*s); gr.add(win);
      }
      gr.position.set(px,py,pz); gr.userData={baseY:py,phase:Math.random()*6.28,rot:(Math.random()-.5)*.0025};
      g.add(gr); isl.push(gr);
    }
    island(-5.2,-1.2,-6,1.15,true);
    island(5.6,0.6,-9,1.45);
    island(2.4,-2.2,-13,.95,true);
    island(-8.4,1.6,-15,1.7);
    island(-11,3,-22,1.0); island(9.5,2.6,-25,1.25); island(0,4.2,-28,.8);
    /* 漂浮碎石碎片 */
    const fragGeo = new THREE.TetrahedronGeometry(.14);
    for(let i=0;i<16;i++){
      const f = new THREE.Mesh(fragGeo, rockMat);
      f.position.set((Math.random()-.5)*24, Math.random()*7-2, -Math.random()*20-4);
      f.userData={ph:Math.random()*6.28, rs:(Math.random()-.5)*.02};
      g.add(f); floaters.push(f);
    }
    return {g, update(t){
      isl.forEach(x=>{ x.position.y=x.userData.baseY+Math.sin(t*.55+x.userData.phase)*.32; x.rotation.y+=x.userData.rot; });
      floaters.forEach(f=>{ f.rotation.x+=f.userData.rs; f.rotation.y+=f.userData.rs*.8; f.position.y+=Math.sin(t*.7+f.userData.ph)*.004; });
    }};
  }

  const island = buildIsland();
  scene.add(island.g);

  /* 鼠标视差 */
  let mx=0,my=0;
  window.addEventListener('mousemove',e=>{ mx=(e.clientX/innerWidth-.5)*2; my=(e.clientY/innerHeight-.5)*2; });
  function resize(){ camera.aspect=innerWidth/innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth,innerHeight); }
  window.addEventListener('resize',resize); resize();

  const clock=new THREE.Clock();
  /* 章节镜头预设：滚动到不同板块，相机缓动换构图 */
  const camPresets = {
    top:     {x:0,    y:1.2, z:14},
    works:   {x:2.6,  y:0.3, z:12},
    gamelab: {x:-2.8, y:1.7, z:13},
    about:   {x:1.8,  y:0.9, z:14},
    contact: {x:-1.8, y:1.1, z:14}
  };
  let camBase = {...camPresets.top};
  const secIO = new IntersectionObserver(es=>{
    es.forEach(e=>{
      if(e.isIntersecting && camPresets[e.target.id]) camBase = camPresets[e.target.id];
    });
  },{threshold:.35});
  ['top','works','gamelab','about','contact'].forEach(id=>{
    const el = document.getElementById(id);
    if(el) secIO.observe(el);
  });
  (function loop(){
    if(document.hidden){ requestAnimationFrame(loop); return; }
    const t=clock.getElapsedTime();
    island.update(t);
    camera.position.x += (camBase.x + mx*1.4 - camera.position.x)*.03;
    camera.position.y += (camBase.y - my*.9 - camera.position.y)*.03;
    camera.position.z += (camBase.z - camera.position.z)*.03;
    camera.lookAt(0,0,0);
    stars.rotation.y=t*.012;
    renderer.render(scene,camera);
    requestAnimationFrame(loop);
  })();
})();

/* ============ 音量控制（竖版可展开 + 静音） ============ */
(function(){
  const bgm = document.getElementById('bgm');
  const slider = document.getElementById('volSlider');
  const widget = document.getElementById('volWidget');
  const btn = document.getElementById('volBtn');
  if(!bgm||!slider||!widget||!btn) return;
  let lastVol = slider.value;
  bgm.volume = slider.value/100;
  btn.addEventListener('click', ()=>{
    if(bgm.volume > 0){ lastVol = slider.value; bgm.volume = 0; slider.value = 0; }
    else { slider.value = lastVol || 60; bgm.volume = slider.value/100; }
  });
  slider.addEventListener('input', ()=>{ bgm.volume = slider.value/100; });
})();

/* ============ 无人机表演联动：循环随机编队 ============ */
(function(){
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  function shape(card){
    const W = card.clientWidth, H = card.clientHeight;
    const cx = W*.5, cy = H*.4;
    const type = Math.floor(Math.random()*3); // 0三角 1方 2环
    const pts = [];
    if(type===0){ for(let i=0;i<9;i++){ const a=i/9*Math.PI*2; pts.push([cx+Math.cos(a)*100, cy+Math.sin(a)*80]); } }
    else if(type===1){ for(let i=0;i<10;i++){ const x=i%5, y=Math.floor(i/5); pts.push([cx-80+x*40, cy-40+y*40]); } }
    else { for(let i=0;i<12;i++){ const a=i/12*Math.PI*2; pts.push([cx+Math.cos(a)*90, cy+Math.sin(a)*90]); } }
    pts.forEach(([tx,ty])=>{
      const d = document.createElement('div');
      d.style.cssText = 'position:absolute;width:5px;height:5px;border-radius:50%;background:#3DE0C8;box-shadow:0 0 8px #3DE0C8;z-index:5;pointer-events:none;left:'+(cx+(Math.random()-.5)*W*.4)+'px;top:'+(cy+(Math.random()-.5)*H*.4)+'px;';
      card.appendChild(d);
      d.animate([
        {transform:'translate(0,0)',opacity:.6},
        {transform:`translate(${tx-d.offsetLeft}px,${ty-d.offsetTop}px)`,opacity:1}
      ],{duration:1500+Math.random()*500,easing:'ease-out'});
      setTimeout(()=>d.remove(),2200);
    });
  }
  const cards = document.querySelectorAll('[data-drone]');
  cards.forEach(card=>{
    card.style.position = 'relative';
    setInterval(()=>{
      const r = card.getBoundingClientRect();
      if(r.top < innerHeight && r.bottom > 0) shape(card);
    }, 3000);
  });
})();

/* ============ 飞鸟巡游联动：Canvas 矢量飞鸟 ============ */
(function(){
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  function drawBird(ctx, x, y, size, wingSpan, flap, color, pitch=0, glide=0, bank=0, alpha=1){
    const wingPhase = Math.sin(flap);
    const wingAngle = 0.28 + wingPhase*0.24*(1-0.5*glide);
    const bodyLen = size, wingLen = wingSpan*0.5;
    ctx.save(); ctx.globalAlpha = alpha;
    ctx.translate(x,y); ctx.rotate(pitch+bank);
    ctx.fillStyle = color; ctx.strokeStyle = color;
    ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(0,-bodyLen); ctx.lineTo(-bodyLen*.22,bodyLen*.18); ctx.lineTo(bodyLen*.22,bodyLen*.18); ctx.closePath(); ctx.fill();
    ctx.save(); ctx.rotate(-wingAngle);
    ctx.beginPath(); ctx.moveTo(0,-bodyLen*.1);
    ctx.quadraticCurveTo(-wingLen*.5,-wingLen*.2,-wingLen,wingLen*.05);
    ctx.quadraticCurveTo(-wingLen*.5,wingLen*.1,0,wingLen*.15); ctx.closePath(); ctx.fill(); ctx.restore();
    ctx.save(); ctx.rotate(wingAngle);
    ctx.beginPath(); ctx.moveTo(0,-bodyLen*.1);
    ctx.quadraticCurveTo(wingLen*.5,-wingLen*.2,wingLen,wingLen*.05);
    ctx.quadraticCurveTo(wingLen*.5,wingLen*.1,0,wingLen*.15); ctx.closePath(); ctx.fill(); ctx.restore();
    ctx.restore();
  }
  document.querySelectorAll('[data-bird]').forEach(card=>{
    card.style.position = 'relative';
    const cv = document.createElement('canvas');
    cv.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;z-index:3;pointer-events:none;';
    card.appendChild(cv);
    const ctx = cv.getContext('2d');
    const dpr = Math.min(devicePixelRatio||1, 2);
    let W,H;
    function resize(){
      const r = card.getBoundingClientRect();
      W = r.width; H = r.height;
      cv.width = W*dpr; cv.height = H*dpr;
      ctx.setTransform(dpr,0,0,dpr,0,0);
    }
    window.addEventListener('resize', resize);
    const SIZE=26, WING=120;
    let running=false; const BIRDS=[];
    function makeFlock(){
      BIRDS.length=0;
      const n = 1+Math.floor(Math.random()*4);
      for(let i=0;i<n;i++) BIRDS.push({
        prog:Math.random(), baseX:W*(.18+Math.random()*.64),
        size:SIZE*(.8+Math.random()*.35), wing:WING*(.8+Math.random()*.35),
        flapPhase:Math.random()*6.28, flapSpeed:.18*(.85+Math.random()*.3),
        speed:.0075*(.85+Math.random()*.35), driftPhase:Math.random()*6.28,
        glideDir:0, glideTime:0, glideDur:0, glideCd:40+Math.random()*180, bank:0
      });
    }
    function frame(){
      if(document.hidden){ requestAnimationFrame(frame); return; }
      ctx.clearRect(0,0,W,H);
      if(running){
        for(const b of BIRDS){
          b.flapPhase += b.flapSpeed*(b.glideDir!==0?.4:1);
          b.prog += b.speed;
          if(b.prog>1) b.prog-=1;
          if(b.glideDir===0){
            b.glideCd-=1;
            if(b.glideCd<=0){ b.glideDir=Math.random()<.5?-1:1; b.glideDur=30+Math.random()*70; b.glideTime=0; }
          } else {
            b.glideTime+=1; b.baseX += b.glideDir*.9;
            if(b.baseX<W*.12){ b.baseX=W*.12; b.glideDir=1; }
            if(b.baseX>W*.88){ b.baseX=W*.88; b.glideDir=-1; }
            if(b.glideTime>=b.glideDur){ b.glideDir=0; b.glideCd=60+Math.random()*200; }
          }
          const targetBank = b.glideDir*.34;
          b.bank += (targetBank-b.bank)*.08;
          const y = H+50-b.prog*(H+100);
          const wob = Math.sin(b.prog*6.283+b.driftPhase)*W*.03;
          const x = b.baseX+wob;
          const pitch = -.12+b.bank*.2;
          const glide = b.glideDir!==0?.6:0;
          const edge = Math.max(0,Math.min(1,Math.min(b.prog,1-b.prog)*5));
          drawBird(ctx, x, y, b.size, b.wing, b.flapPhase, '#fff', pitch, glide, b.bank, edge);
        }
      }
      requestAnimationFrame(frame);
    }
    resize(); frame();
    new IntersectionObserver(es=>{
      es.forEach(e=>{
        if(e.isIntersecting){ running=true; resize(); makeFlock(); }
        else running=false;
      });
    },{threshold:.3}).observe(card);
  });
})();

/* ============ 旅行牛仔实时预览层 ============ */
(function(){
  const layer = document.getElementById('previewLayer');
  const frame = layer ? layer.querySelector('iframe') : null;
  if(!layer || !frame) return;
  /* 本地 file:// 环境无法访问线上预览，直接不启用（避免报错与空白层） */
  if(location.protocol === 'file:') return;
  const SRC = frame.dataset.src;
  let timer = null;
  function startWatch(){
    clearTimeout(timer);
    layer.classList.remove('fail');
    /* 线上网络异常时加载超过 6 秒视为失败，隐藏预览层兜底 */
    timer = setTimeout(()=>{ layer.classList.add('fail'); }, 6000);
  }
  frame.addEventListener('load', ()=>{ clearTimeout(timer); layer.classList.remove('fail'); });
  new IntersectionObserver(es=>{
    es.forEach(e=>{
      if(e.isIntersecting){
        layer.classList.add('show');
        if(!frame.getAttribute('src')){ frame.setAttribute('src', SRC); startWatch(); }
      } else {
        layer.classList.remove('show');
        frame.removeAttribute('src');
        clearTimeout(timer);
      }
    });
  },{threshold:.3}).observe(document.querySelector('[data-cowboy]'));
})();

/* ============ 时空立方体联动：伪 4D 时间柱体 ============ */
(function(){
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.querySelectorAll('[data-cube]').forEach(card=>{
    const media = card.querySelector('.work-media');
    if(!media) return;
    const cv = document.createElement('canvas');
    cv.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;z-index:3;pointer-events:none;';
    media.appendChild(cv);
    const ctx = cv.getContext('2d');
    const dpr = Math.min(devicePixelRatio||1, 2);
    let W,H,CX,CY,S;
    function resize(){
      const r = media.getBoundingClientRect();
      W = r.width; H = r.height;
      cv.width = W*dpr; cv.height = H*dpr;
      ctx.setTransform(dpr,0,0,dpr,0,0);
      CX = W/2; CY = H/2;
      S = Math.min(W,H)*.24;
    }
    window.addEventListener('resize', resize);
    const parts = [];
    function init(){
      parts.length = 0;
      for(let i=0;i<30;i++){
        parts.push({
          p: Math.random(), x:(Math.random()-.5)*1.6, z:(Math.random()-.5)*1.6,
          sp:.0016+Math.random()*.002, trail:[],
          hue: Math.random()<.5 ? '#FF6A3D' : '#3DE0C8'
        });
      }
    }
    let angY=.5, angX=.18, sliceP=.3, running=false;
    function proj(x,y,z){
      const cY=Math.cos(angY), sY=Math.sin(angY);
      const x1=x*cY-z*sY, z1=x*sY+z*cY;
      const cX=Math.cos(angX), sX=Math.sin(angX);
      const y1=y*cX-z1*sX, z2=y*sX+z1*cX;
      const f=1.7, s=f/(f+z2);
      return {x:CX+x1*S*s, y:CY-y1*S*s, d:z2};
    }
    function frame(){
      if(document.hidden){ requestAnimationFrame(frame); return; }
      ctx.clearRect(0,0,W,H);
      if(running){
        angY += .0045; sliceP += .0022; if(sliceP>1) sliceP-=1;
        const v=[[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]];
        const P=v.map(p=>proj(p[0],p[1],p[2]));
        const E=[[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]];
        ctx.lineWidth=1.2;
        for(const e of E){
          const d=(P[e[0]].d+P[e[1]].d)/2;
          const a=Math.max(0,Math.min(1,(d+1.7)/3.4))*.5;
          ctx.strokeStyle=`rgba(120,190,255,${a})`;
          ctx.beginPath(); ctx.moveTo(P[e[0]].x,P[e[0]].y); ctx.lineTo(P[e[1]].x,P[e[1]].y); ctx.stroke();
        }
        for(const p of P){
          const a=Math.max(0,Math.min(1,(p.d+1.7)/3.4));
          ctx.fillStyle=`rgba(255,255,255,${a*.8})`;
          ctx.beginPath(); ctx.arc(p.x,p.y,1.6,0,6.283); ctx.fill();
        }
        const sy = sliceP*2-1;
        const q=[[-1,sy,-1],[1,sy,-1],[1,sy,1],[-1,sy,1]].map(p=>proj(p[0],p[1],p[2]));
        ctx.fillStyle='rgba(61,224,200,.13)';
        ctx.beginPath(); ctx.moveTo(q[0].x,q[0].y);
        for(let i=1;i<4;i++) ctx.lineTo(q[i].x,q[i].y);
        ctx.closePath(); ctx.fill();
        ctx.strokeStyle='rgba(61,224,200,.5)'; ctx.lineWidth=1;
        ctx.stroke();
        for(const pt of parts){
          pt.p += pt.sp;
          if(pt.p>1){ pt.p=0; pt.x=(Math.random()-.5)*1.6; pt.z=(Math.random()-.5)*1.6; }
          const y = pt.p*2-1;
          const pr = proj(pt.x, y, pt.z);
          pt.trail.push({x:pr.x,y:pr.y});
          if(pt.trail.length>9) pt.trail.shift();
          for(let i=0;i<pt.trail.length;i++){
            const a=(i+1)/pt.trail.length;
            ctx.globalAlpha = a*.85;
            ctx.fillStyle = pt.hue;
            ctx.beginPath(); ctx.arc(pt.trail[i].x, pt.trail[i].y, 1+i*.5, 0, 6.283); ctx.fill();
          }
          ctx.globalAlpha = 1;
          ctx.fillStyle = '#fff';
          ctx.beginPath(); ctx.arc(pr.x, pr.y, 2.4, 0, 6.283); ctx.fill();
        }
      }
      requestAnimationFrame(frame);
    }
    resize(); init(); frame();
    new IntersectionObserver(es=>{
      es.forEach(e=>{
        if(e.isIntersecting){ running=true; resize(); init(); }
        else running=false;
      });
    },{threshold:.3}).observe(card);
  });
})();