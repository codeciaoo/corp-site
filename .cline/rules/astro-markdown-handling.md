# Astroのマークダウン処理に関する知見

## StaticHtmlコンポーネントの特殊性

### 基本構造

```typescript
{
  type: [Function: StaticHtml] {
    shouldComponentUpdate: [Function (anonymous)]
  },
  props: {
    value: string,    // HTML文字列
    hydrate: false    // クライアントサイドでの動的な操作が制限される
  }
}
```

### Markdownの変換プロセス

1. マークダウンファイル

```markdown
## 取り組みの結果
内容...
```

1. Astroによる変換

```html
<h2 id="取り組みの結果">取り組みの結果</h2>
<p>内容...</p>
```

1. StaticHtmlコンポーネントとしての出力

```typescript
{
  type: StaticHtml,
  props: {
    value: '<h2 id="取り組みの結果">取り組みの結果</h2>\n<p>内容...</p>',
    hydrate: false
  }
}
```

## 実装上の注意点

### 1. 環境制約への対応

- Cloudflare Workers環境ではブラウザAPIが使用できない
  - `DOMParser`は利用不可
  - Node.jsの`cheerio`などのライブラリも使用不可
- 純粋な文字列操作（正規表現）を使用する必要がある

### 2. HTML文字列の処理

```typescript
// 1. HTML文字列の取得
const htmlContent = child.props?.value?.toString() || '';

// 2. h2タグでコンテンツを分割
const h2Sections = htmlContent.split(/<h2[^>]*>/);

// 3. セクションごとの処理
h2Sections.forEach((section: string, index: number) => {
  // タイトルの抽出
  const titleMatch = section.match(/^([^<]*)/);
  const sectionTitle = titleMatch ? titleMatch[1].trim() : '';
  
  // コンテンツの取得
  const content = section.substring(section.indexOf('</h2>') + 5);
});
```

### 3. セキュリティ考慮事項

- `dangerouslySetInnerHTML`の使用には注意
- Astroによって事前にサニタイズされたコンテンツのみを扱う
- コンテンツの加工を最小限に抑える

### 4. パフォーマンス最適化

```typescript
const sections = React.useMemo(() => {
  // セクション分割処理
}, [children]);
```

### 5. スタイリングの維持

```html
<div class="prose prose-slate max-w-none">
  {sections.background}
</div>
```

- Tailwindの`prose`クラスを活用
- マークダウンの構造とスタイルを維持

## ベストプラクティス

1. **文字列処理の信頼性向上**
   - 堅牢な正規表現パターンの使用
   - エラーケースの考慮
   - フォールバック処理の実装

2. **コードの保守性**
   - 正規表現パターンの定数化
   - 処理の関数分割
   - 適切なコメント付与

3. **パフォーマンス考慮**
   - 不要な再計算の防止
   - メモ化の適切な使用
   - 文字列操作の最適化

4. **TypeScript型の適切な取り扱い**
   - `verbatimModuleSyntax`が有効な環境では型のみのインポートを使用

   ```typescript
   // 誤ったインポート方法（リントエラーの原因）
   import { cn, ProjectSectionProps } from "@/lib/utils";

   // 正しいインポート方法
   import { cn } from "@/lib/utils";
   import type { ProjectSectionProps } from "@/lib/utils";
   ```

   - 型インターフェイスをプロジェクト全体で共有する際は独立した型定義ファイルを検討
   - 複雑な型変換や条件付き型は共通ユーティリティとして切り出す

## 今後の改善点

1. **エラーハンドリングの強化**
   - 異常なHTML構造への対応
   - セクションタイトル未検出時の処理
   - デバッグ情報の充実

2. **アクセシビリティ向上**
   - スクリーンリーダー対応
   - キーボードナビゲーション
   - WAI-ARIAの適切な使用

3. **UI/UX改善**
   - セクション間のアニメーション
   - レスポンシブ対応の強化
   - 視覚的階層構造の改善
