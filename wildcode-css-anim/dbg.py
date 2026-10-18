# -*- coding: utf-8 -*-
import io
root = r"E:\WorkSpeace\WorkSpeace_Doubao\portfolio-site"
s = io.open(root + r"\js\app.js", encoding="utf-8").read()
start_marker = "/* ============ 五只性格各异的小马 ============ */"
idx = s.index(start_marker)
end_marker = "(function(){\n  if(window.matchMedia('(prefers-reduced-motion: reduce)')"
end_idx = s.index(end_marker)
print("idx:", idx, "end_idx:", end_idx)
seg = s[idx:end_idx]
print("tail of seg:", repr(seg[-60:]))
import re
m = list(re.finditer(r"\}\)\;", seg))
print("last close count:", len(m), "last at:", m[-1].start() if m else None)
