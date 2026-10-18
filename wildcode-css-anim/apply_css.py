# -*- coding: utf-8 -*-
"""把 horses.css 修正路径后追加到 css/style.css 末尾"""
import io

root = r"E:\WorkSpeace\WorkSpeace_Doubao\portfolio-site"
horses_css = io.open(root + r"\wildcode-css-anim\horses.css", encoding="utf-8").read()
horses_css = horses_css.replace('url("assets/horses/', 'url("../assets/horses/')

style_path = root + r"\css\style.css"
with io.open(style_path, "a", encoding="utf-8", newline="") as f:
    f.write("\n" + horses_css)

total = len(io.open(style_path, encoding="utf-8").read())
print("appended ok, new total chars:", total)
