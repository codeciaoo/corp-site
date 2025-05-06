 # Dynamic Route ページで `Astro.props` が `undefined` になる問題

 ## 原因

 このリポジトリは `astro.config.mjs` で `output: 'server'` (SSR モード) を使用しており、動的ルート (`[slug].astro` など) においては SSR 実行時に `getStaticPaths` の `props` が `Astro.props` に注入されません。
 その結果、以下のようなコードで `Astro.props.member` にアクセスすると、`member` が未定義 (`undefined`) となり、`member.name` の読み取りでエラーが発生しました。

 ```astro
 --- 
 import { memberPortfolios } from "@/components/pages/portfolio/membersPortfolioData";
 export function getStaticPaths() {
   return memberPortfolios.map(member => ({
     params: { slug: member.slug },
     props: { member },
   }));
 }
 const { member } = Astro.props; // undefined
 const pageTitle = `${member.name}のポートフォリオ`; // エラー
 ---
 ```

 ## 解決方法

 動的ルートを「静的プリレンダリング」して `getStaticPaths` の `props` を注入するか、もしくは SSR モードでパラメータを直接参照してデータを取得する方法があります。

 1. **静的プリレンダリングを有効化する**  
    Frontmatter に `export const prerender = true;` を追加して、`getStaticPaths` で返した `props` が `Astro.props` に注入されるように設定します。

    ```astro
    ---
    export const prerender = true;
    export function getStaticPaths() { /* ... */ }
    const { member } = Astro.props;
    ---
    ```

 2. **SSR モードで `Astro.params` を使う**  
    `Astro.params.slug` から受け取った値を利用して、直接データフェッチ関数を呼び出す方法です。

    ```astro
    ---
    const { slug } = Astro.params;
    const member = getPortfolioBySlug(slug);
    ---
    ```

 ## 今回の対応

 `src/pages/members/[slug].astro` に `export const prerender = true;` を追加し、`member` が正常に `Astro.props` に注入されるように修正しました。