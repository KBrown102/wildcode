# -*- coding: utf-8 -*-
"""CSS 模块化：野马段从 style.css 拆到 css/horses.css；index.html 追加 link"""
import io, re

root = r"E:\WorkSpeace\WorkSpeace_Doubao\portfolio-site"
style_path = root + r"\css\style.css"
horse_path = root + r"\css\horses.css"
html_path = root + r"\index.html"

s = io.open(style_path, encoding="utf-8").read()

marker = "/* ---- 左下角宠物：眼镜野马（站长本人吉祥物，点击开关音乐功能不变）---- */"
idx = s.index(marker)
tail = s[idx:]
head = s[:idx].rstrip() + "\n"          # style.css 回到拆分前

header = """/* ================================================
   野马角色模块 horses.css —— 独立模块（勿并入 style.css）
   页面地形物理世界：body 是坐标系，小马 absolute 锚定世界；
   覆盖 style.css 中段的 .horse position:fixed。
   若删除本文件，需同步移除 app.js「野马世界」段与
   index.html 中 5 个 .horse 节点。
   ================================================ */
body{ position:relative; }                       /* 小马世界坐标系（body margin 已为 0） */
.horse{ position:absolute !important; will-change:transform; }  /* 覆盖 style.css 中段 fixed */
"""
tail = tail.replace(
    ".horse.kick{ animation:kick .4s !important; }       /* 保留靠近鼠标的踢腿互动 */",
    ".horse.kick::after{ animation:kick .4s ease-out !important; }  /* 踢腿放伪元素，不覆盖 JS 定位 */"
)

with io.open(style_path, "w", encoding="utf-8", newline="") as f:
    f.write(head)
with io.open(horse_path, "w", encoding="utf-8", newline="") as f:
    f.write(header + tail)

h = io.open(html_path, encoding="utf-8").read()
old_link = '<link rel="stylesheet" href="css/style.css">'
new_link = old_link + '\n<link rel="stylesheet" href="css/horses.css">'
assert old_link in h
h = h.replace(old_link, new_link, 1)
with io.open(html_path, "w", encoding="utf-8", newline="") as f:
    f.write(h)

print("style.css chars:", len(head), "| horses.css chars:", len(header + tail))
print("index.html link added ok")
