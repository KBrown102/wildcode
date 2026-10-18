# -*- coding: utf-8 -*-
"""
野码 WILD CODE · Q版野马角色精灵图生成器
================================================
每个形象一张精灵图：行=动作，列=帧，透明底 PNG。
动作集：idle(4) / walk(4) / run(6) / jump(6) / happy(4) / eat(4)
帧尺寸：256×256（可改 FRAME 变量后整体缩放重跑）

生成：
  - assets/sprites/{角色}-sheet.png        6 行动作精灵图（透明底）
  - assets/sprites/{角色}-stand.png        站立定稿图（透明底，供网页单帧使用）
  - assets/sprites/preview-all.png         6 角色 × 关键帧预览图（深色底）
运行：python make_sprites.py
"""
import os, math, json
from PIL import Image, ImageDraw

FRAME = 256                     # 单帧边长
ACTIONS = [("idle", 4), ("walk", 4), ("run", 6), ("jump", 6), ("happy", 4), ("eat", 4)]
OUT = os.path.dirname(os.path.abspath(__file__))

# ---------------------------------------------------------------- 颜色
C_BODY   = "#B07A4F"   # 主体棕色
C_BODY_D = "#96603C"   # 深棕（描影/蹄）
C_HOOF   = "#4A3226"   # 蹄
C_SNOUT  = "#EBCBA6"   # 吻部浅米
C_BLUSH  = "#F2A7B4"   # 腮红
C_EYE    = "#22201E"   # 眼
C_HL     = "#FFFFFF"   # 高光
C_BRAND  = "#FF6A3D"   # 主站橙（胸前标）
C_LINE   = "#33261C"   # 深色细轮廓（沉稳描边）

ROLES = {
    "lan":   dict(name="蓝衣", mane="#3EC1D3", shirt="#2E4E92", shorts="#202028", acc="hood",   tag="抽绳"),
    "ying":  dict(name="粉樱", mane="#F2A7C3", shirt="#E8A7C0", shorts="#E8A7C0", acc="bloom",  tag="小花"),
    "lv":    dict(name="绿叶", mane="#3FB56F", shirt="#3FA962", shorts="#3FA962", acc="leaf",   tag="叶片"),
    "yan":   dict(name="眼镜", mane="#3FB5B8", shirt="#3B9FA3", shorts="#3B9FA3", acc="glasses",tag="圆镜"),
    "shan":  dict(name="闪电", mane="#F2803C", shirt="#D9534F", shorts="#E8C93A", acc="bolt",   tag="闪电"),
    "zong":  dict(name="棕鬃", mane="#6B4A2F", shirt="#3FA98F", shorts="#3FA98F", acc="none",   tag="青绿"),
}

# ---------------------------------------------------------------- 基础绘制工具
def _blend_on(dst, src, pos):
    """把透明小图 src 贴到 dst 的 pos(左上)"""
    dst.alpha_composite(src, pos)

def _rotated(img, deg):
    return img.rotate(deg, resample=Image.BICUBIC, expand=False) if deg else img

def _mk(size, fn):
    im = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    fn(ImageDraw.Draw(im))
    return im

def _ell(d, box, fill, outline=None, width=1):
    d.ellipse(box, fill=fill, outline=outline, width=width)

def _leg(cx, cy, length, width, phase_up, hoof_col=C_HOOF, leg_col=None):
    """画一条腿（细直腿+小椭圆蹄），返回可旋转的小图；cx,cy 为髋关节中心"""
    leg_col = leg_col or C_BODY
    size = int(length + width * 4)
    im = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    ox, oy = size // 2, 4
    # 细直腿
    d.rounded_rectangle((ox - width // 2, oy, ox + width // 2, oy + length - 6), radius=5, fill=leg_col)
    # 小椭圆蹄（深色）
    d.ellipse((ox - width // 2 - 2, oy + length - 9, ox + width // 2 + 2, oy + length + 3), fill=hoof_col)
    if phase_up:
        d.rectangle((ox - width // 2 + 1, oy + length - 9, ox + width // 2 - 1, oy + length + 3), fill=hoof_col)
    return im, (ox, oy)

def _arm(cx, cy, length, width, deg, hand=None):
    """画一条手臂（含手），返回旋转后小图；cx,cy 为肩中心"""
    hand = hand or C_BODY
    size = int(length + width * 4)
    im = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    ox, oy = size // 2, 4
    _ell(d, (ox - width // 2, oy, ox + width // 2, oy + length - width + 2), C_BODY)
    _ell(d, (ox - width // 2 - 1, oy + length - 7, ox + width // 2 + 1, oy + length + 2), hand)
    im = im.rotate(deg, resample=Image.BICUBIC)
    return im

def _tail(cx, cy, mane_col, deg, length=30, width=13):
    """尾巴（上翘马尾），cx,cy 为根部；deg 控制摆动"""
    size = int(length * 2.6)
    im = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    ox, oy = size // 2, int(size * 0.78)   # 根部在下方
    # 尾根粗、尾尖翘
    d.ellipse((ox - width // 2, oy - length, ox + width // 2, oy + 4), fill=mane_col)
    d.ellipse((ox - width // 2 + 3, oy - length + 6, ox + width // 2 - 3, oy + 4), fill=mane_col)
    # 尾尖向上翘起
    d.ellipse((ox - width // 2 - 4, oy - length - 8, ox + 2, oy - length + 6), fill=mane_col)
    im = im.rotate(deg, resample=Image.BICUBIC)
    return im

def _mane_top(head_cx, head_cy, mane_col, size=140):
    """头顶野马鬃毛：一撮撮尖角，从头顶辐射到颈后"""
    im = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    ox, oy = size // 2, size // 2
    tips = [(-24, -30, -8, -46, 4, -32),   # 左上撮
            (-10, -42, 8, -56, 18, -40),   # 顶中撮（最高）
            (6, -46, 22, -52, 28, -36),   # 右上撮
            (20, -38, 36, -40, 32, -22),  # 右撮
            (-30, -26, -40, -24, -28, -10),# 左撮
            (30, -28, 42, -26, 32, -12)]   # 右后撮
    for (x1, y1, x2, y2, x3, y3) in tips:
        d.polygon([(ox + x1, oy + y1), (ox + x2, oy + y2), (ox + x3, oy + y3)], fill=mane_col)
    # 额前小刘海
    d.ellipse((ox - 20, oy - 24, ox + 16, oy - 4), fill=mane_col)
    return im

def _mane_neck(head_cx, head_cy, body_cx, body_cy, mane_col):
    """颈后鬃毛：从头顶延伸到身体的一撮撮"""
    im = Image.new("RGBA", (FRAME, FRAME), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    x0, y0 = head_cx + 22, head_cy + 10
    x1, y1 = body_cx + 34, body_cy - 26
    steps = 5
    for i in range(steps):
        t = i / (steps - 1)
        bx = x0 + (x1 - x0) * t
        by = y0 + (y1 - y0) * t
        w = 14 - t * 4
        d.ellipse((bx - w // 2, by - 14, bx + w // 2, by + 10), fill=mane_col)
    return im

# ---------------------------------------------------------------- 角色单帧
def draw_role(role_key, fdict):
    """绘制一帧角色；fdict 提供动作参数"""
    R = ROLES[role_key]
    f = dict(body_scale=1.0, lean=0, body_dy=0, head_dy=0, head_rot=0,
             leg_phase=0, arm_phase=0, arm_up=0, blink=False, mouth=0,
             leg_shrink=0, tail_deg=0)
    f.update(fdict)

    frame = Image.new("RGBA", (FRAME, FRAME), (0, 0, 0, 0))
    d = ImageDraw.Draw(frame)

    # 整体缩放 + 倾斜
    bs = f["body_scale"]
    lean = f["lean"]
    cx, cy = 128, 150 + f["body_dy"] + f["head_dy"] * 0.1

    # ---- 基础几何（先按未缩放计算，缩放用比例换算到绘制中）
    # 尾巴（从身体右侧中上部伸出，贴身体上翘）
    tail_im = _tail(0, 0, R["mane"], f["tail_deg"])
    _blend_on(frame, tail_im, (int(cx + 44), int(cy - 34 + f["body_dy"] * 0.3)))

    # 身体（矮胖椭圆）
    bw, bh = int(92 * bs), int(84 * bs)
    _ell(d, (cx - bw // 2, cy - 34, cx + bw // 2, cy + 46), C_BODY, outline=C_LINE, width=2)

    # 上衣
    sw, sh = int(90 * bs), int(64 * bs)
    _ell(d, (cx - sw // 2, cy - 30, cx + sw // 2, cy + 30), R["shirt"])
    # 衣领
    _ell(d, (cx - 14, cy - 30, cx + 14, cy - 12), R["shirt"])
    # 胸前品牌标（橙色像素方块，白框+稍大）
    bd = 20
    d.rectangle((cx - bd // 2 - 2, cy - 18 - bd // 2 - 2, cx + bd // 2 + 2, cy - 18 + bd // 2 + 2), fill="#F3F0EA")
    d.rectangle((cx - bd // 2, cy - 18 - bd // 2, cx + bd // 2, cy - 18 + bd // 2), fill=C_BRAND)

    # 短裤
    _ell(d, (cx - int(94 * bs) // 2, cy + 26, cx + int(94 * bs) // 2, cy + 58), R["shorts"])
    # 短裤装饰
    if R["acc"] == "bolt":
        d.polygon([(cx + 20, cy + 32), (cx + 12, cy + 46), (cx + 18, cy + 46), (cx + 12, cy + 56),
                   (cx + 24, cy + 42), (cx + 18, cy + 42), (cx + 24, cy + 34)], fill="#F2803C")
    if R["acc"] == "bloom":
        for (bx, by) in [(-24, cy + 40), (26, cy + 44)]:
            d.ellipse((bx - 3, by - 3, bx + 3, by + 3), fill="#FFFFFF")
            d.ellipse((bx - 1, by - 1, bx + 1, by + 1), fill="#F2803C")

    # ---- 腿（髋关节位置，随 phase 摆动；两腿分开明显，细直腿+深色小蹄）
    hip_l, hip_r = (cx - 32, cy + 50), (cx + 32, cy + 50)
    leg_len = int(40 - f["leg_shrink"])
    swing = math.sin(math.radians(f["leg_phase"])) * 26
    swing_r = math.sin(math.radians(f["leg_phase"] + 180)) * 26
    for hip, swing_deg in ((hip_l, swing), (hip_r, swing_r)):
        leg_im, _ = _leg(*hip, leg_len, 11, 0)
        leg_im = leg_im.rotate(-swing_deg, resample=Image.BICUBIC)
        ox = hip[0] - leg_im.width // 2 + int(swing_deg * 0.5)
        oy = hip[1] - leg_im.height // 2 + 4
        _blend_on(frame, leg_im, (int(ox), int(oy)))

    # ---- 手臂（肩部摆动）
    sh_l, sh_r = (cx - 38, cy - 16), (cx + 38, cy - 16)
    arm_swing = math.sin(math.radians(f["arm_phase"])) * 20
    up = f["arm_up"]
    for sh, base, sign in ((sh_l, 4, 1), (sh_r, -4, -1)):
        deg = base + arm_swing * sign - up * 70
        arm_im = _arm(*sh, 32, 12, deg)
        _blend_on(frame, arm_im, (int(sh[0] - arm_im.width // 2), int(sh[1] - 2)))

    # ---- 头
    hx, hy = cx, int(cy - 58 + f["head_dy"])
    hr = int(48 * bs)
    # 颈后鬃毛
    _blend_on(frame, _mane_neck(hx, hy, cx, cy, R["mane"]), (0, 0))
    # 头顶鬃毛
    _blend_on(frame, _mane_top(hx, hy, R["mane"]), (int(hx - 70), int(hy - 70)))

    # 头本体
    _ell(d, (hx - hr, hy - hr, hx + hr, hy + hr), C_BODY, outline=C_LINE, width=2)

    # 耳朵（竖立尖耳，画在头与鬃毛之上，最醒目）
    d.polygon([(hx - 42, hy - 34), (hx - 50, hy - 62), (hx - 24, hy - 46)], fill=C_BODY, outline=C_LINE, width=1)
    d.polygon([(hx + 42, hy - 34), (hx + 50, hy - 62), (hx + 24, hy - 46)], fill=C_BODY, outline=C_LINE, width=1)
    d.polygon([(hx - 43, hy - 36), (hx - 48, hy - 58), (hx - 28, hy - 46)], fill="#E8B98C")
    d.polygon([(hx + 43, hy - 36), (hx + 48, hy - 58), (hx + 28, hy - 46)], fill="#E8B98C")

    # 吻部 + 嘴（吻部小而贴脸，加鼻孔）
    _ell(d, (hx - 19, hy + hr - 32, hx + 19, hy + hr - 8), C_SNOUT)
    _ell(d, (hx - 8, hy + hr - 20, hx - 4, hy + hr - 16), "#B98A5E")
    _ell(d, (hx + 4, hy + hr - 20, hx + 8, hy + hr - 16), "#B98A5E")
    mouth_y = hy + hr - 12 + f["mouth"] * 4
    d.arc((hx - 11, mouth_y - 5, hx + 11, mouth_y + 5), 15, 165, fill="#7A4A2A", width=2)
    if f["mouth"] > 0.5:
        d.ellipse((hx - 4, mouth_y + 1, hx + 4, mouth_y + 7), fill="#A45C40")

    # 眼睛
    for ex in (hx - 17, hx + 17):
        if f["blink"]:
            d.arc((ex - 8, hy - 6, ex + 8, hy + 6), 200, 340, fill=C_EYE, width=3)
        else:
            _ell(d, (ex - 9, hy - 11, ex + 9, hy + 11), C_EYE)
            _ell(d, (ex - 4, hy - 8, ex - 1, hy - 4), C_HL)
    # 腮红
    _ell(d, (hx - 34, hy + 4, hx - 20, hy + 18), C_BLUSH)
    _ell(d, (hx + 20, hy + 4, hx + 34, hy + 18), C_BLUSH)

    # 眼镜
    if R["acc"] == "glasses":
        d.ellipse((hx - 27, hy - 13, hx - 7, hy + 13), outline="#22201E", width=3)
        d.ellipse((hx + 7, hy - 13, hx + 27, hy + 13), outline="#22201E", width=3)
        d.line((hx - 7, hy, hx + 7, hy), fill="#22201E", width=3)
    # 帽/抽绳（蓝衣）
    if R["acc"] == "hood":
        d.line((hx - 6, cy - 24, hx - 16, cy - 2), fill="#3EC1D3", width=2)
        d.line((hx + 6, cy - 24, hx + 16, cy - 2), fill="#3EC1D3", width=2)
        _ell(d, (hx - 17, cy - 6, hx - 13, cy - 2), fill="#3EC1D3")
        _ell(d, (hx + 13, cy - 6, hx + 17, cy - 2), fill="#3EC1D3")

    # 叶子（绿叶角色头侧小叶片）
    if R["acc"] == "leaf":
        d.polygon([(hx + 40, hy + 18), (hx + 50, hy + 26), (hx + 40, hy + 32)], fill="#3FA962")

    return frame

# ---------------------------------------------------------------- 动作参数序列
def action_frames(action):
    """返回该动作的逐帧参数 dict 列表"""
    seq = []
    if action == "idle":
        for i in range(4):
            s = 1.0 if i % 2 == 0 else 1.025
            seq.append(dict(body_scale=s, blink=(i == 2), tail_deg=4 - i * 2))
    elif action == "walk":
        for i in range(4):
            p = i * 90
            seq.append(dict(leg_phase=p, arm_phase=-p, tail_deg=6 - i * 4,
                            body_dy=2 * math.sin(math.radians(p))))
    elif action == "run":
        for i in range(6):
            p = i * 60
            seq.append(dict(leg_phase=p, arm_phase=-p, lean=14, body_dy=3 * math.sin(math.radians(p)),
                            tail_deg=20 - i * 6, body_scale=1.03))
    elif action == "jump":
        y = [-2, -34, -62, -62, -30, 0]
        for i in range(6):
            seq.append(dict(body_dy=y[i], leg_shrink=8 if i in (1, 2, 3, 4) else 0,
                            arm_phase=-80 if i in (1, 2, 3) else 0, tail_deg=16))
    elif action == "happy":
        for i in range(4):
            seq.append(dict(body_dy=-14 if i in (1, 2) else 0, arm_up=1 if i in (1, 2) else 0,
                            blink=(i == 2), tail_deg=-16 if i in (1, 2) else 8))
    elif action == "eat":
        for i in range(4):
            seq.append(dict(head_dy=20 if i != 3 else 10, mouth=1 if i % 2 == 0 else 0,
                            tail_deg=12 if i % 2 == 0 else -8))
    return seq

# ---------------------------------------------------------------- 主流程
def build_sheet(role_key):
    R = ROLES[role_key]
    cols = max(n for _, n in ACTIONS)
    rows = sum(n for _, n in ACTIONS)
    sheet = Image.new("RGBA", (FRAME * cols, FRAME * rows), (0, 0, 0, 0))
    y = 0
    for action, n in ACTIONS:
        frames = action_frames(action)
        for i, fd in enumerate(frames):
            fr = draw_role(role_key, fd)
            sheet.paste(fr, (i * FRAME, y * FRAME), fr)
        y += n
    return sheet, cols, rows

def main():
    os.makedirs(OUT, exist_ok=True)
    meta = {"frame": FRAME, "actions": {a: n for a, n in ACTIONS},
            "roles": {k: v["name"] for k, v in ROLES.items()},
            "files": {}}
    for key in ROLES:
        sheet, cols, rows = build_sheet(key)
        sheet_path = os.path.join(OUT, f"{key}-sheet.png")
        sheet.save(sheet_path)
        # 站立定稿图（idle 帧0）
        stand = draw_role(key, dict())
        stand_path = os.path.join(OUT, f"{key}-stand.png")
        stand.save(stand_path)
        meta["files"][key] = {"sheet": sheet_path, "stand": stand_path,
                              "cols": cols, "rows": rows,
                              "sheet_w": sheet.width, "sheet_h": sheet.height}
        print(f"[OK] {ROLES[key]['name']} sheet {sheet.width}x{sheet.height}")

    # 预览总览：深色底 + 每角色 6 个动作的代表帧（看得出动作差异）
    REP = {"idle": 0, "walk": 1, "run": 1, "jump": 2, "happy": 1, "eat": 0}
    n = len(ROLES)
    cw, ch = 300, 300
    preview = Image.new("RGBA", (cw * 6, ch * n + 60), (10, 12, 18, 255))
    for idx, key in enumerate(ROLES):
        for c in range(6):
            action = ACTIONS[c][0]
            fr = draw_role(key, action_frames(action)[REP[action]])
            fr = fr.resize((fr.width // 2, fr.height // 2), Image.LANCZOS)
            preview.paste(fr, (cw * c + (cw - fr.width) // 2, 30 + ch * idx + (ch - fr.height) // 2), fr)
        # 角色名
        d = ImageDraw.Draw(preview)
        d.text((6, 12 + ch * idx), f"{idx+1} {ROLES[key]['name']}", fill="#E8E6E1")
    preview_path = os.path.join(OUT, "preview-all.png")
    preview.save(preview_path)
    print(f"[OK] preview {preview.width}x{preview.height}")
    with open(os.path.join(OUT, "meta.json"), "w", encoding="utf-8") as fp:
        json.dump(meta, fp, ensure_ascii=False, indent=2)
    print("[DONE] all sheets saved to", OUT)

if __name__ == "__main__":
    main()
