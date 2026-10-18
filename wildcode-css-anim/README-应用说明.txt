====================================================
WILD CODE 个人作品站 · 野马角色接入说明（v2 · 地形物理世界）
====================================================
[背景] 6 张 AI 定稿图（品牌统一版）已抠为透明底 PNG 接入网站，
        2026-10-19 由「CSS 动画版」升级为「页面地形物理世界」：
        小马把页面组件当地形，可站立、可翻越、可躲到卡片/图片后面，
        滚动时留在页面世界原位（不跟屏幕走）。

[模块结构]（已从 style.css 拆分，勿再并入）
  css/horses.css       独立角色模块：角色图挂 :after 伪元素、性格动画、
                       霓虹辉光、body{position:relative}+.horse{position:absolute}
                       世界坐标系、踢腿动画伪元素化、移动端降尺寸
  js/app.js            末尾「野马世界」IIFE：地形扫描、重力物理、性格行为、z 遮挡
  assets/horses/*.png  6 张透明底角色图
                        lan 蓝衣 / ying 粉樱 / lv 绿叶 / yan 眼镜(→pet)
                        shan 闪电(→h-free) / zong 棕鬃(→h-lazy)
  index.html           在 css/style.css 之后加载 css/horses.css（已配好）

[地形物理系统]
  台面（可站立/阻挡）：.hero / .btn / .work-card / .connect-card /
        .gamelab-stat / .gamelab-feats / .gamelab-more / .c-card / .jl-card / .foot-inner
  遮挡物（可躲后面）：.work-card / .connect-card / .gamelab-feats /
        .c-card / .hero-side / .hero-badge（小马钻到后方 z=2 被盖住）
  物理：重力 0.45 / 终端速度 11 / 可走上 46px 矮台 / 撞墙反弹 / 世界底兜底
  出生：打开页面五马站到当前视野内的小台面（按钮/徽章/卡片）顶上，台面去重
  性格：
    闪电 世界跑酷漫游，每 ~7s 瞬移到随机卡片顶继续跑
    粉樱 鼠标靠近 280px 内溜走
    绿叶 追鼠标绕圈蹦跳，途经卡片后方会被遮挡
    棕鬃 找台面站定，偶尔踱步
    蓝衣 守地盘，鼠标 130px 内扬蹄踢腿 + 震一张作品卡

[可调参数]（app.js「野马世界」段顶部 cfg 对象）
  cfg.grav=.45 / cfg.maxv=11 / cfg.step=46(矮台高)
  cfg.speed=1(活跃度) / cfg.roam=420(闪电漫游帧) / cfg.chase=1(绿叶追鼠) / cfg.kick=130(蓝衣踢腿距离px)
  TERRAIN_SEL / OCCLUDE_SEL 在段内
  CSS 动画秒数与尺寸在 css/horses.css

[野马控制台悬浮窗]（2026-10-19 新增）
  左下角：宠物(音乐开关) + 齿轮按钮 → 展开「野马控制台」面板：
    - 音乐：音量滑条（并入面板，原 vol-widget 已移除）
    - 马群显隐：6 个开关（眼镜宠物 + 五只马），实时隐藏/恢复
    - 世界参数：重力 / 矮台 / 活跃度 / 漫游 / 追鼠 / 踢腿 6 个滑条，实时生效
  实现：cfg 定义即挂 window._HORSE_；window.HORSE_WORLD（cfg/horses/toggle API）
       与控制台绑定在 app.js 顶层独立段（野马世界 IIFE 之外）；点面板外收起
  面板样式在 css/horses.css（.pet-stack / .panel-gear / .horse-panel / .hp-*）

[历史脚本]（wildcode-css-anim 目录，均已执行落盘，可删）
  apply_css.py / apply_fix.py / fix_conflict.py / split_css.py / rewrite_horses.py / dbg.py
  upgrade_panel.py / refactor_panel.py / depth_check.py / mk_app3.py

[删除本功能]
  1. 移除 index.html 中 css/horses.css 的 link、5 个 .horse 节点、pet-stack 面板块
  2. 删除 js/app.js 末尾「野马世界」IIFE 与「野马控制台」顶层段
  3. 删除 css/horses.css 与 assets/horses/
====================================================
