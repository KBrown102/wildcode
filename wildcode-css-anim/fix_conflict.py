# -*- coding: utf-8 -*-
"""五马定位与 CSS 动画冲突修复：角色图与性格动画移到 :after 伪元素，父元素 transform 让给 JS"""
import io

root = r"E:\WorkSpeace\WorkSpeace_Doubao\portfolio-site"
style_path = root + r"\css\style.css"
s = io.open(style_path, encoding="utf-8").read()

old = """/* ---- 五只性格小马：背景图 + 各自性格动画 ---- */
.horse{ background-repeat:no-repeat; background-position:center bottom; background-size:contain; }

.h-free{   background-image:url("../assets/horses/shan.png"); animation: horseRun   3.6s ease-in-out infinite alternate; }
.h-shy{    background-image:url("../assets/horses/ying.png"); animation: horseShy   6.8s ease-in-out infinite; }
.h-happy{  background-image:url("../assets/horses/lv.png");   animation: horseBounce 1.2s ease-in-out infinite; }
.h-lazy{   background-image:url("../assets/horses/zong.png"); animation: horseLazy  5.6s ease-in-out infinite; }
.h-angry{  background-image:url("../assets/horses/lan.png");  animation: horseAngry .85s ease-in-out infinite; }"""

new = """/* ---- 五只性格小马：父元素 transform 由 app.js 定位，角色图与性格动画挂 :after 伪元素 ---- */
.horse{ background:none !important; }                       /* 清掉原 SVG 小马背景 */
.horse::after{
  content:''; position:absolute; left:0; top:0; width:100%; height:100%;
  background-repeat:no-repeat; background-position:center bottom; background-size:contain;
  pointer-events:none;
}
.h-free::after{   background-image:url("../assets/horses/shan.png"); animation: horseRun   3.6s ease-in-out infinite alternate; }
.h-shy::after{    background-image:url("../assets/horses/ying.png"); animation: horseShy   6.8s ease-in-out infinite; }
.h-happy::after{  background-image:url("../assets/horses/lv.png");   animation: horseBounce 1.2s ease-in-out infinite; }
.h-lazy::after{   background-image:url("../assets/horses/zong.png"); animation: horseLazy  5.6s ease-in-out infinite; }
.h-angry::after{  background-image:url("../assets/horses/lan.png");  animation: horseAngry .85s ease-in-out infinite; }"""

assert old in s, "old block not found!"
s = s.replace(old, new)
with io.open(style_path, "w", encoding="utf-8", newline="") as f:
    f.write(s)
print("replaced ok, total chars:", len(s))
