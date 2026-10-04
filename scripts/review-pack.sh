#!/bin/zsh
# 審査用の画像一式を作る。ビルド結果（dist/）を配信して全ページを撮り、縦長の画像を分割する。
# 使い方: pnpm build のあとに scripts/review-pack.sh
#   → design/qa/review-1440/（Chrome、幅 1440px）と design/qa/review-375/（WebKit、幅 375px）に <ページ>-NN.png を保存
# スマートフォン幅は WebKit で撮る（iPhone の Safari に近い。Chrome だけで確かめると、折り返しの違いを見落とす）。
# 開発サーバーは、負荷が高いと古いスタイルを返すことがあるので使わない。
set -e
cd "$(dirname "$0")/.."

# 別の worktree が 4398 で配信していることがあるので、PORT=4397 scripts/review-pack.sh のように変えられる
PORT=${PORT:-4398}
BASE="http://localhost:$PORT"
ROUTES=(/ /approach /projects /projects/core-saas /projects/safety-ai /projects/ec2-to-ecs /about /members /members/tahara /careers /careers/fullstack /careers/intern /contact /privacy-policy /nope)

# すでに同じポートで配信中なら、それを使う
if ! curl -s -o /dev/null "$BASE/"; then
  node scripts/qa.mjs --serve --port=$PORT &
  SERVER=$!
  trap 'kill $SERVER 2>/dev/null' EXIT
  sleep 1
fi

node scripts/shots.mjs --base "$BASE" --out design/shots --widths 1440 "${ROUTES[@]}"
node scripts/shots.mjs --base "$BASE" --out design/shots --widths 375 --browser webkit "${ROUTES[@]}"
# 追従する図（つくり方の「5つの工程」）は、工程ごとの画面も撮る
node scripts/shots.mjs --base "$BASE" --out design/shots --widths 1440 --first-view --at ".step" /approach
node scripts/shots.mjs --base "$BASE" --out design/shots --widths 375 --browser webkit --first-view --at ".step" /approach

for width in 1440 375; do
  out="design/qa/review-$width"
  rm -rf "$out"
  mkdir -p "$out"
  height=1300
  suffix=""
  if [ "$width" = "375" ]; then
    height=1500
    suffix="-webkit"
  fi
  # 今回撮ったページだけを切り分ける（design/shots/ には過去の画像も残っている）
  for route in "${ROUTES[@]}"; do
    slug="${${route#/}//\//_}"
    [ -z "$slug" ] && slug=home
    scripts/slice.sh "design/shots/$slug$suffix-$width-full.png" "$height" "$out/$slug" >/dev/null
  done
  cp design/shots/approach"$suffix"-"$width"-at-*.png "$out"/
  echo "$out: $(ls "$out" | wc -l | tr -d ' ') 枚"
done
