# -*- coding: utf-8 -*-
"""追加野马角色接入的覆盖修正：隐藏旧宠物内部元素、清滤镜、兼容kick"""
import io

root = r"E:\WorkSpeace\WorkSpeace_Doubao\portfolio-site"
style_path = root + r"\css\style.css"

fix = """

/* ---- 野马角色接入 · 覆盖修正（勿删） ---- */
.pet svg, .pet .note{ display:none; }              /* 隐藏原水墨宠物内部，避免与背景图重叠 */
.pet{ filter:drop-shadow(0 0 14px rgba(255,106,61,.45)); }
.h-free{   filter:drop-shadow(0 0 8px rgba(255,106,61,.55)); }
.h-shy{    filter:drop-shadow(0 0 8px rgba(255,150,200,.55)); }
.h-happy{  filter:drop-shadow(0 0 8px rgba(80,200,140,.5)); }
.h-lazy{   filter:drop-shadow(0 0 8px rgba(80,180,200,.45)); }
.h-angry{  filter:drop-shadow(0 0 8px rgba(255,60,40,.55)); }
.horse.kick{ animation:kick .4s !important; }       /* 保留靠近鼠标的踢腿互动 */
"""

with io.open(style_path, "a", encoding="utf-8", newline="") as f:
    f.write(fix)

total = len(io.open(style_path, encoding="utf-8").read())
print("fix appended ok, total chars:", total)
