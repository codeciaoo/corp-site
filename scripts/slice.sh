#!/bin/sh
# ページ全体のスクリーンショットを、確認しやすい高さに切り分ける。 使い方: scripts/slice.sh <png> <高さ> <出力先の接頭辞>
set -eu
src="$1"; step="$2"; out="$3"
h=$(magick identify -format "%h" "$src"); w=$(magick identify -format "%w" "$src")
i=0; y=0
while [ "$y" -lt "$h" ]; do
  magick "$src" -crop "${w}x${step}+0+${y}" +repage "${out}-$(printf '%02d' $i).png"
  i=$((i+1)); y=$((y+step))
done
echo "$i 枚"
