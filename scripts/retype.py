#!/usr/bin/env python3
"""コンポーネントの文字指定を、site.css の型（書体・太さ・大きさの段階）にそろえる一回限りの移行スクリプト。
使い方: python3 scripts/retype.py <ファイルやディレクトリ>...
"""
import re
import sys
from pathlib import Path

PX = {
    40: "d3", 30: "h2", 22: "h3", 20: "h4", 19: "h4", 18: "h4",
    17: "lead", 16: "body", 15: "body", 14: "small", 13: "caption", 12: "caption",
    11: "label", 10: "label",
}
LINE_HEIGHT = {"mega": "1.12", "d1": "1.16", "d2": "var(--lh-display)", "d3": "1.4",
               "h2": "1.4", "h3": "var(--lh-heading)", "h4": "var(--lh-heading)"}
LETTER_SPACING = {"mega": "var(--ls-display)", "d1": "var(--ls-display)", "d2": "var(--ls-display)",
                  "d3": "var(--ls-display)", "h2": "var(--ls-heading)", "h3": "var(--ls-heading)",
                  "h4": "var(--ls-heading)"}


def token_for_clamp(maximum: float) -> str:
    if maximum >= 150: return "mega"
    if maximum >= 100: return "d1"
    if maximum >= 74: return "d2"
    if maximum >= 44: return "d3"
    if maximum >= 30: return "h2"
    if maximum >= 24: return "h3"
    return "h4"


def map_size(value: str) -> str | None:
    value = value.strip()
    m = re.fullmatch(r"(\d+)px", value)
    if m:
        token = PX.get(int(m.group(1)))
        return f"var(--fs-{token})" if token else None
    m = re.fullmatch(r"clamp\(\s*[\d.]+px,\s*.+,\s*([\d.]+)px\s*\)", value)
    if m:
        return f"var(--fs-{token_for_clamp(float(m.group(1)))})"
    return None


def retype_block(body: str) -> str:
    display = "var(--f-jpd)" in body
    numeric = "var(--f-en)" in body

    def size(match: re.Match) -> str:
        mapped = map_size(match.group(1))
        return f"font-size: {mapped};" if mapped else match.group(0)

    body = re.sub(r"font-size:\s*([^;]+);", size, body)
    body = re.sub(r"font-weight:\s*(800|700|600);", "font-weight: var(--fw-bold);", body)
    body = re.sub(r"font-weight:\s*(500|400);", "font-weight: var(--fw-regular);", body)
    body = body.replace("font-family: var(--f-body);", "font-family: var(--f-sans);")

    token = re.search(r"font-size: var\(--fs-(mega|d1|d2|d3|h2|h3|h4)\);", body)
    if display:
        body = body.replace("font-family: var(--f-jpd);", 'font-feature-settings: "palt";')
        if token:
            name = token.group(1)
            body = re.sub(r"line-height:\s*[^;]+;", f"line-height: {LINE_HEIGHT[name]};", body)
            body = re.sub(r"letter-spacing:\s*[^;]+;", f"letter-spacing: {LETTER_SPACING[name]};", body)
    if numeric:
        body = body.replace("font-family: var(--f-en);", 'font-feature-settings: "tnum";')
    # 線の文字の地色は --sec-bg に一本化した
    body = re.sub(r"\n\s*--bgc:[^;]+;", "", body)
    return body


def retype(text: str) -> str:
    def style(match: re.Match) -> str:
        css = match.group(2)
        css = re.sub(r"\{([^{}]*)\}", lambda m: "{" + retype_block(m.group(1)) + "}", css)
        return match.group(1) + css + match.group(3)

    return re.sub(r"(<style[^>]*>)(.*?)(</style>)", style, text, flags=re.S)


def main() -> None:
    files: list[Path] = []
    for arg in sys.argv[1:]:
        path = Path(arg)
        files += sorted(path.rglob("*.astro")) if path.is_dir() else [path]
    for file in files:
        before = file.read_text()
        after = retype(before)
        if after != before:
            file.write_text(after)
            print("updated", file)


if __name__ == "__main__":
    main()
