// サイト共通の動き。「線と塗り」の状態遷移、ロゴ字形のばね、ヘッダー、Before → After の切り替え。
// 文字や内容は JS なしでも最終状態で読める。ここは状態を動かすだけ。
import { splitFxHtml } from "@/lib/fx";

const doc = document.documentElement;
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

const $ = <T extends Element = HTMLElement>(
  selector: string,
  root: ParentNode = document,
): T | null => root.querySelector<T>(selector);

const $$ = <T extends Element = HTMLElement>(
  selector: string,
  root: ParentNode = document,
): T[] => Array.from(root.querySelectorAll<T>(selector));

/* ───────── 1. 線と塗りの状態遷移 ───────── */

const parts = (scope: HTMLElement): HTMLElement[] =>
  scope.hasAttribute("data-pre") ? [scope] : $$("[data-pre]", scope);

/** 開始状態に置く（トランジションなし） */
const arm = (scope: HTMLElement): void => {
  const list = parts(scope);
  list.forEach(part => {
    part.classList.add("no-tr", "is-live");
    part.dataset.state = part.dataset.pre;
  });
  void scope.offsetWidth;
  list.forEach(part => part.classList.remove("no-tr"));
};

/** 最終状態へ動かす */
const go = (scope: HTMLElement): void => {
  parts(scope).forEach(part => {
    part.classList.add("is-live");
    part.dataset.state = part.dataset.post;
  });
};

const play = (scope: HTMLElement): void => {
  arm(scope);
  go(scope);
};

/* ───────── 2. 字形の線幅を、大きさによらず px でそろえる ───────── */

const sizeStrokes = (): void => {
  $$("[data-glyphs]").forEach(group => {
    const glyph = $(".gl", group);
    if (!glyph) return;
    const height = glyph.getBoundingClientRect().height;
    if (!height) return;
    const px = Number(group.dataset.glyphs) * (innerWidth < 768 ? 0.8 : 1);
    group.style.setProperty("--sw", ((px * 200) / height).toFixed(3));
  });
};

/* ───────── 3. 字形のばね（臨界減衰） ───────── */

type Mode = "base" | "in" | "out";

interface Letter {
  el: HTMLElement;
  a: number;
  b: number;
  va: number;
  vb: number;
  mode: Mode;
  /** スクロールなどで決まる、ふだんの塗りの量 */
  base: number;
  hold: boolean;
  pending: boolean;
}

const OMEGA = 9;
const letters: Letter[] = [];
let running = false;
let lastTime = 0;

const makeLetter = (el: HTMLElement): Letter => ({
  el,
  a: 0,
  b: 0,
  va: 0,
  vb: 0,
  mode: "base",
  base: 0,
  hold: false,
  pending: false,
});

const stepSpring = (
  letter: Letter,
  key: "a" | "b",
  target: number,
  dt: number,
): boolean => {
  const velocityKey = key === "a" ? "va" : "vb";
  letter[velocityKey] +=
    (OMEGA * OMEGA * (target - letter[key]) - 2 * OMEGA * letter[velocityKey]) *
    dt;
  letter[key] += letter[velocityKey] * dt;
  if (
    Math.abs(target - letter[key]) < 6e-4 &&
    Math.abs(letter[velocityKey]) < 6e-4
  ) {
    letter[key] = target;
    letter[velocityKey] = 0;
    return false;
  }
  return true;
};

const frame = (time: number): void => {
  const dt = Math.min(0.034, (time - lastTime) / 1000);
  lastTime = time;
  let active = false;
  for (const letter of letters) {
    let targetA = 0;
    let targetB = letter.base;
    if (letter.mode === "in") {
      targetB = 1;
    } else if (letter.mode === "out") {
      targetA = 1;
      targetB = 1;
    }
    const movingA = stepSpring(letter, "a", targetA, dt);
    const movingB = stepSpring(letter, "b", targetB, dt);
    active = active || movingA || movingB;
    if (letter.mode === "in" && !letter.hold && letter.b > 0.985) {
      letter.mode = "out";
      active = true;
    }
    if (letter.mode === "out" && letter.a > 0.985) {
      letter.a = 0;
      letter.b = 0;
      letter.va = 0;
      letter.vb = 0;
      letter.mode = letter.hold || letter.pending ? "in" : "base";
      letter.pending = false;
      active = true;
    }
    letter.el.style.setProperty("--a", letter.a.toFixed(4));
    letter.el.style.setProperty("--b", letter.b.toFixed(4));
  }
  if (active) requestAnimationFrame(frame);
  else running = false;
};

const kick = (): void => {
  if (running) return;
  running = true;
  lastTime = performance.now();
  requestAnimationFrame(frame);
};

const enter = (letter: Letter): void => {
  letter.hold = true;
  if (letter.mode === "out") letter.pending = true;
  else letter.mode = "in";
  kick();
};

const leave = (letter: Letter): void => {
  letter.hold = false;
  kick();
};

/** 1 回だけ、下から満ちて上へ抜ける（手を振る） */
const pulse = (letter: Letter): void => {
  if (letter.mode === "base") {
    letter.mode = "in";
    kick();
  } else if (letter.mode === "out") {
    letter.pending = true;
  }
};

const wave = (list: Letter[], gap = 150): void => {
  list.forEach((letter, index) => setTimeout(() => pulse(letter), index * gap));
};

const bindPointer = (list: Letter[]): void => {
  list.forEach(letter => {
    letter.el.addEventListener("pointerenter", event => {
      if (event.pointerType === "mouse") enter(letter);
    });
    letter.el.addEventListener("pointerleave", event => {
      if (event.pointerType === "mouse") leave(letter);
    });
    letter.el.addEventListener("pointerdown", event => {
      if (event.pointerType !== "mouse") pulse(letter);
    });
  });
};

/* ───────── 4. ヘッダー（進捗の線・メニュー） ───────── */

const progress = $("[data-progress]");
const hero = $("[data-hero]");
const heroLetters = $$("[data-ciao] .gl").map(makeLetter);

let ticking = false;
const onScroll = (): void => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    ticking = false;
    // 最初の画面を過ぎたかどうか（狭い画面のヘッダーの「相談する」を出す合図）
    doc.classList.toggle("is-scrolled", scrollY > innerHeight * 0.8);
    const max = doc.scrollHeight - innerHeight;
    progress?.style.setProperty(
      "--p",
      max > 0 ? (scrollY / max).toFixed(4) : "0",
    );
    if (reducedMotion || !hero || heroLetters.length === 0) return;
    // スクロールに合わせて、CIAO が 1 字ずつ塗られていく
    const amount = Math.min(1, Math.max(0, scrollY / (hero.offsetHeight * 0.62)));
    heroLetters.forEach((letter, index) => {
      letter.base = Math.min(1, Math.max(0, (amount - index * 0.13) / 0.5));
    });
    kick();
  });
};

const setupMenu = (): void => {
  const button = $<HTMLButtonElement>("[data-menu-button]");
  const menu = $("[data-menu]");
  const label = $("[data-menu-label]");
  if (!button || !menu) return;
  const ciao = $("[data-menu-ciao]", menu);
  // メニューの後ろにある部分。開いている間は、操作もフォーカスもできないようにする
  const behind = $$("main, footer, .skip");
  const setOpen = (open: boolean): void => {
    button.setAttribute("aria-expanded", String(open));
    doc.classList.toggle("menu-open", open);
    if (label) label.textContent = open ? "閉じる" : "メニュー";
    behind.forEach(el => el.toggleAttribute("inert", open));
    if (ciao) {
      ciao.classList.add("is-live");
      ciao.dataset.state = open ? "solid" : "hidden";
    }
  };
  button.addEventListener("click", () => {
    const open = button.getAttribute("aria-expanded") !== "true";
    setOpen(open);
    // 開いたら、メニューの箱にフォーカスを移す（次の Tab で最初の項目へ進む）。
    // 最初の項目に移すと、Safari では枠と塗りの丸が付いて、現在のページの印に見える
    if (open) {
      menu.setAttribute("tabindex", "-1");
      menu.focus({ preventScroll: true });
    }
  });
  menu.addEventListener("click", event => {
    if ((event.target as Element).closest("a")) setOpen(false);
  });
  // 開いている間に Tab で回る範囲（ロゴ、閉じるボタン、メニューの項目）。
  // 後ろのページは inert なので、最後の項目の次は、ブラウザが文書そのものへフォーカスを移してしまう
  const logo = $<HTMLElement>(".hd__logo");
  const ring = (): HTMLElement[] =>
    [logo, button, ...$$<HTMLElement>("a[href]", menu)].filter(
      (el): el is HTMLElement => el !== null,
    );
  addEventListener("keydown", event => {
    if (!doc.classList.contains("menu-open")) return;
    if (event.key === "Escape") {
      setOpen(false);
      // フォーカスを戻すときに、ページを動かさない（ヘッダーは画面の上に留まっている）
      button.focus({ preventScroll: true });
      return;
    }
    if (event.key !== "Tab") return;
    const items = ring();
    const first = items[0];
    const last = items[items.length - 1];
    const active = document.activeElement;
    if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus({ preventScroll: true });
    } else if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus({ preventScroll: true });
    }
  });
  matchMedia("(min-width: 900px)").addEventListener("change", event => {
    if (event.matches) setOpen(false);
  });
};

/* ───────── 5. 起動 ───────── */

const boot = (): void => {
  // iOS の Safari は、touchstart のリスナーが 1 つも無いと :active を出さないことがある。
  // 押したときの塗り（site.css の :active）を働かせるために、空のリスナーを置く
  document.addEventListener("touchstart", () => {}, { passive: true });
  setupMenu();
  sizeStrokes();
  onScroll();
  addEventListener("scroll", onScroll, { passive: true });

  let resizeTimer = 0;
  addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(sizeStrokes, 120);
  });

  const wordmark = $("[data-wordmark]");
  const wordmarkLetters = wordmark
    ? $$(".is-wave", wordmark).map(makeLetter)
    : [];
  letters.push(...heroLetters, ...wordmarkLetters);

  if (reducedMotion) {
    // 動かさない。CIAO は線から塗りへの 4 段を静止で見せる
    heroLetters.forEach((letter, index) => {
      letter.el.style.setProperty("--b", (index / 3).toFixed(3));
    });
    return;
  }

  bindPointer(heroLetters);
  bindPointer(wordmarkLetters);

  const heroParts = hero ? $$("[data-hero-part]", hero) : [];
  heroParts.forEach(arm);

  // 画面に入ったら、線から塗りへ。
  // 「要素の 35% が見えた」か「画面の高さの 3 割ぶん見えた」ら動かす
  // （画面より背の高い要素は、35% が見える瞬間が来ないことがあるため）
  const revealObserver = new IntersectionObserver(
    entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const enough =
          entry.intersectionRatio >= 0.35 ||
          entry.intersectionRect.height >= innerHeight * 0.3;
        if (!enough) continue;
        revealObserver.unobserve(entry.target);
        go(entry.target as HTMLElement);
      }
    },
    {
      threshold: [0, 0.05, 0.1, 0.2, 0.35, 0.5],
      rootMargin: "0px 0px -6% 0px",
    },
  );

  const reveals = $$("[data-reveal]").filter(
    el => !el.closest("[data-hero-part]"),
  );
  reveals.forEach(arm);

  // 字形の列（工程の図など）も同じ仕組みで動かす
  if (wordmark) {
    const wordmarkObserver = new IntersectionObserver(
      entries => {
        if (!entries[0].isIntersecting) return;
        wordmarkObserver.disconnect();
        setTimeout(() => wave(wordmarkLetters, 140), 200);
      },
      { threshold: 0.6 },
    );
    wordmarkObserver.observe(wordmark);
    wordmark.addEventListener("pointerenter", event => {
      if (event.pointerType === "mouse") wave(wordmarkLetters, 90);
    });
  }

  $$("[data-hover]").forEach(el => {
    let last = 0;
    const replay = (): void => {
      const now = performance.now();
      if (now - last < 1100) return;
      last = now;
      play(el);
    };
    el.addEventListener("pointerenter", event => {
      if (event.pointerType === "mouse") replay();
    });
    el.addEventListener("focusin", replay);
  });

  const start = (): void => {
    sizeStrokes();
    doc.classList.add("is-go");
    reveals.forEach(el => revealObserver.observe(el));

    if (!hero) return;
    // トップページの振付: 線を描く → こんにちは（満ちる）→ さよなら（抜ける）→ CIAO が手を振る
    $$<SVGElement>("[data-ciao] .gl__line").forEach((line, index) => {
      line.style.transition = `stroke-dashoffset 1.3s cubic-bezier(.65,0,.25,1) ${200 + index * 110}ms`;
      line.style.strokeDashoffset = "0";
      // 描き終わったら点線の指定を外す。残すと、閉じた線の始まりと終わりが角でつながらず、細い切れ目が見える
      line.addEventListener(
        "transitionend",
        () => {
          line.style.strokeDasharray = "none";
        },
        { once: true }
      );
    });
    heroParts.forEach((part, index) => {
      setTimeout(() => go(part), 450 + index * 420);
    });
    setTimeout(() => wave(heroLetters), 1100);
    setInterval(() => {
      const idle =
        scrollY < 40 && !document.hidden && !heroLetters.some(l => l.hold);
      if (idle) wave(heroLetters);
    }, 9000);
  };

  // 書体が届いてから動かす（代替書体のまま動き出さないように）。届かなくても 1.2 秒で始める
  const fontsReady = document.fonts?.ready ?? Promise.resolve();
  Promise.race([
    fontsReady,
    new Promise(resolve => setTimeout(resolve, 1200)),
  ]).then(() => requestAnimationFrame(start));
};

boot();
