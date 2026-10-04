// 線と塗りの文字（Fx）に渡す文へ、折り返してよい位置の印 `|` を足す。
// Fx は「、」「。」と空白と `|` でしか折り返さない。書き手が `|` を入れた文は、そのまま使う。
// `|` のない文（題など）には、文節の切れ目（ひらがなで終わる語のあとに、
// 漢字・カタカナ・英数字で始まる語が続く所）に入れる。

const HIRAGANA = /[\u3041-\u3096]/;
const WORD_HEAD = /[\u3400-\u9fff\u30a1-\u30fa\u3005A-Za-z0-9]/;

const segmenter = new Intl.Segmenter("ja", { granularity: "word" });

const bunsetsu = (text: string): string => {
  let result = "";
  let last = "";
  for (const { segment } of segmenter.segment(text)) {
    const head = segment.charAt(0);
    if (HIRAGANA.test(last) && WORD_HEAD.test(head)) result += "|";
    result += segment;
    last = segment.charAt(segment.length - 1);
  }
  return result;
};

export const withBreaks = (text: string): string =>
  text.includes("|") ? text : bunsetsu(text);
