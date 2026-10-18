# -*- coding: utf-8 -*-
import io
s = io.open(r"E:\WorkSpeace\WorkSpeace_Doubao\portfolio-site\js\app.js", encoding="utf-8").read()
io.open(r"E:\WorkSpeace\WorkSpeace_Doubao\portfolio-site\js\app3.js", "w", encoding="utf-8", newline="").write("window.__V3__='v3';\n" + s)
print("app3 written", len(s) + 20)
