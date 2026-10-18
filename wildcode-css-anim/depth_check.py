# -*- coding: utf-8 -*-
"""定位野马世界段内各关键行的括号嵌套深度"""
import io, re

app = r"E:\WorkSpeace\WorkSpeace_Doubao\portfolio-site\js\app.js"
lines = io.open(app, encoding="utf-8").read().split("\n")

# 定位段
start = next(i for i,l in enumerate(lines) if "野马世界：把页面当地形" in l)
loop_i = next(i for i in range(start, len(lines)) if lines[i].strip() == "loop();")
end = next(i for i in range(loop_i+1, len(lines)) if lines[i].strip() == "})();")
assert end > loop_i

depth = 0
in_tpl = False
watch = ["window.HORSE_WORLD", "window.__PANEL__", "panelGear", "horsePanel",
         "(function(){", "loop();", "const cfg", "const horses", "Object.values"]
for i in range(start, end+1):
    ln = lines[i]
    # 处理模板字符串（含 { } 会干扰）
    line = ln
    out = []
    j = 0
    while j < len(line):
        ch = line[j]
        if in_tpl:
            if ch == "`":
                in_tpl = False
            j += 1
            continue
        if ch == "`":
            in_tpl = True
            j += 1
            continue
        # 注释跳过（// 与 /* */）粗略处理
        out.append(ch)
        j += 1
    stripped = re.sub(r"//.*$", "", "".join(out))
    # 去掉字符串字面量内的括号（粗略）
    stripped = re.sub(r"'(?:[^'\\]|\\.)*'", "''", stripped)
    stripped = re.sub(r'"(?:[^"\\]|\\.)*"', '""', stripped)
    delta = stripped.count("{") - stripped.count("}")
    for w in watch:
        if w in ln:
            print(f"L{i+1} depth={depth}  {ln.strip()[:70]}")
    depth += delta
print("final depth:", depth)
