import { z, defineCollection } from "astro:content";
import { glob } from "astro/loaders";

/**
 * 図の丸 1 つ（＝ 1 工程）。塗るのは確かめたもの（動いているもの）だけ。まだのものは線のまま。
 * 丸に添える文字は「番号 / tag、label、note」。1 つの図の中で、note は全部の工程に書くか、どの工程にも書かない。
 */
const diagramStep = z.object({
  /** 等幅のラベル（だれが、どの状態か） */
  tag: z.string(),
  /** 名前（動作）。`|` は折り返してよい位置 */
  label: z.string(),
  /** 1 行の説明。本文にある事実だけを書く */
  note: z.string().optional(),
  /** 工程の中に入るもの（6 つの機能、3 つのアカウントなど）。frame では大きい丸の上の小さい丸、branch では分かれた先の丸になる */
  items: z.array(z.string()).optional(),
  /** 塗る（確かめたもの）。既定は線（まだのもの） */
  solid: z.boolean().default(false),
});

/** 2 つの数を、帯の長さで比べる図（これまで → これから）の中身 */
const barsSchema = z.object({
  caption: z.string(),
  alt: z.string(),
  unit: z.string(),
  before: z.number().positive(),
  after: z.number().positive(),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    /** `|` は「ここで折り返してよい」の印。表示は Phrases、題名や読み上げには plainText を通す */
    title: z.string(),
    summary: z.string(),
    /** 一覧での並び順（小さいほど上） */
    order: z.number(),
    /**
     * true のあいだは、一覧・詳細・トップ・サイトマップのどこにも出さない（代表の確認待ちの実績）。
     * 読み出しは `src/lib/projects.ts` の getPublishedProjects() を使う
     */
    draft: z.boolean().default(false),
    publishedDate: z.date(),
    status: z.string(),
    industry: z.string(),
    role: z.string(),
    period: z.string(),
    /** これまで → これから。置き換えたものが資料で確かめられる案件だけに書く */
    before: z.string().optional(),
    after: z.string().optional(),
    figures: z
      .array(
        z.object({
          value: z.string(),
          unit: z.string(),
          label: z.string(),
          approx: z.boolean().optional(),
        })
      )
      .optional(),
    /**
     * 図（丸と罫線）。本文に書いてある事実だけで描く。形（form）は案件ごとに選ぶ。
     *   rule:   1 本の罫線の上に、工程の丸を順に置く（既定）
     *   rings:  中心の丸（steps[0]）の外に、同心の輪（steps[1]〜）を重ねる
     *   branch: 丸を罫線でつなぎ、最後の工程で items の数に分かれる
     *   frame:  大きい丸（steps[0]）の円周上に、items の小さい丸を置く
     */
    diagram: z
      .object({
        form: z.enum(["rule", "rings", "branch", "frame"]).default("rule"),
        /** 図の題。「Fig. / 」の後ろに出す */
        caption: z.string(),
        /** 読み上げ用。図の内容を文で書く */
        alt: z.string(),
        /** 凡例。塗りと線が、この図で何を指すか */
        legend: z.object({
          solid: z.string().optional(),
          line: z.string().optional(),
        }),
        steps: z
          .array(diagramStep)
          .min(1)
          .refine(
            steps =>
              steps.every(step => step.note) || steps.every(step => !step.note),
            "note は、全部の工程に書くか、どの工程にも書かない"
          ),
      })
      .optional(),
    /** 数を点で描く図。点 1 つが 1 件。承認済みの数字だけに使う */
    dots: z
      .object({
        cols: z.number().int().positive(),
        rows: z.number().int().positive(),
        caption: z.string(),
        alt: z.string(),
        /** 凡例（線の点が何を指すか） */
        legend: z.string(),
      })
      .optional(),
    /**
     * 2 つの数を、帯の長さで比べる図（これまで → これから）。承認済みの数字だけに使う。
     * これまでは線の帯、これからは塗りの帯。帯の長さは数の比のとおり
     */
    bars: barsSchema.optional(),
    /**
     * 確かめたこと（塗り）と、まだ確かめていないこと（線）。
     * 両方を本文の事実だけで書ける案件にだけ置く。文末の「。」は付けない
     */
    checked: z
      .object({
        done: z.array(z.string()).min(1),
        notYet: z.array(z.string()).min(1),
      })
      .optional(),
    /**
     * 進め方。番号付きの行（NumberedRows）で出す。title の `|` は折り返してよい位置。
     * この案件に固有の行だけを書く。どの案件にも共通の進め方は「つくり方」のページに書いてある。
     * 主力の案件（core-saas）は、ほかの案件にも使える進め方を厚く書くので 10 行まで（2026-10-04 代表の指示）
     */
    process: z
      .array(
        z.object({
          title: z.string(),
          body: z.string(),
          /** ほかの案件ではどう役立つか（1 文）。行の本文の下に出す */
          reuse: z.string().optional(),
          /**
           * この行の結果（帯の図）。行の本文のすぐ下に、本文の列の幅で出す。
           * 本文に書いてある数字で、承認済みのものだけに使う
           */
          bars: barsSchema.optional(),
        })
      )
      .max(10)
      .optional(),
    tags: z.array(z.string()),
    tech_stacks: z.array(z.string()),
  }),
});

export const collections = {
  projects,
};
