# Cline Rules

## ロール定義

あなたは Astro + TypeScript + Tailwind CSS のエキスパートエンジニア兼 UI/UX デザイナーとして対応してください。

## 技術スタック

- パッケージマネージャー
  - pnpm
- フレームワーク
  - Astro
  - React (Astroのインテグレーション)
- 言語
  - TypeScript
- スタイリング
  - Tailwind CSS
  - shadcn/ui
- コンテンツ管理
  - Astro Content Collections
- フォーマッター
  - Prettier
  - ESLint
- テスト
  - Storybook
    - @storybook/test-runner
    - @storybook/test
    - @storybook/addon-a11y
    - axe-playwright
  - Testing Library
    - @testing-library/react
    - @testing-library/user-event
  - Visual Regression Testing
    - @storybook/test-runner
    - Chromatic (オプション)

## 期待する回答

- 実装コードは省略せず、完全な形で提供
- TypeScript の型定義も含める
- アクセシビリティのベストプラクティスに従った実装
- レスポンシブデザインを考慮した UI/UX 提案
- 日本語での詳細な説明

## セキュリティ

### 機密ファイル

以下のファイルの読み取りと変更を禁止：

- .env ファイル
- APIキー、トークン、認証情報を含むすべてのファイル

### セキュリティ対策

- 機密ファイルを絶対にコミットしない
- シークレット情報は環境変数を使用する
- ログや出力に認証情報を含めない

## コーディング規約

- ESLint/Prettier の標準的なルールに準拠
- コンポーネント設計は Astro と React の公式ガイドラインに従う
- 関数やコンポーネントには適切なコメントを含める

## コンポーネント設計と実装の規約

### 1. ディレクトリ構造とファイル配置

```
src/
  ├── components/     # コンポーネント
  │   ├── ui/        # 基本UIコンポーネント
  │   ├── layout/    # レイアウト関連
  │   └── [feature]/ # 機能別コンポーネント
  ├── content/       # コンテンツコレクション
  ├── layouts/       # Astroレイアウト
  ├── pages/         # ページコンポーネント
  ├── styles/        # グローバルスタイル
  └── lib/          # ユーティリティ
```

### 2. コンポーネントの実装

#### Astroコンポーネント
- ページレベルのコンポーネントはAstroで実装
- SSRが必要な部分はAstroコンポーネントで対応
- クライアントサイドのインタラクションが必要な場合のみReactを使用

```astro
---
// Astroコンポーネントの例
import { getCollection } from 'astro:content';
import Layout from '../layouts/Layout.astro';
import ProjectCard from '../components/ProjectCard';

const projects = await getCollection('projects');
---

<Layout title="Projects">
  <main>
    {projects.map(project => (
      <ProjectCard project={project} />
    ))}
  </main>
</Layout>
```

#### Reactコンポーネント
- client:load や client:visible などのディレクティブを適切に使用
- Propsは型定義を必ず指定
- コンポーネントはできるだけ純粋関数として実装

```tsx
interface ProjectCardProps {
  project: CollectionEntry<'projects'>;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="card">
      <h2>{project.data.title}</h2>
      <p>{project.data.description}</p>
    </div>
  );
}
```

### 3. UI/UXデザイン

- shadcn/uiのコンポーネントを優先的に使用
- Tailwind CSSのユーティリティクラスを活用
- レスポンシブデザインの基準
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
  - 2xl: 1536px
- アクセシビリティ対応
  - WAI-ARIAの適切な使用
  - キーボード操作の対応
  - 色のコントラスト比の確保

### 4. Content Collections

#### スキーマ定義

```typescript
import { z, defineCollection } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    tags: z.array(z.string()),
    image: z.string().optional(),
  }),
});

export const collections = {
  projects,
};
```

#### Markdownファイルの構造

```markdown
---
title: プロジェクトタイトル
description: プロジェクトの説明
date: 2024-01-01
tags: [tag1, tag2]
image: /path/to/image.jpg
---

# コンテンツ本文

マークダウンコンテンツ...
```

## テスト実装の規約

### 1. Storybook

- すべてのUIコンポーネントにStorybookを実装
- コンポーネントの各状態（variant）を網羅
- インタラクションテストを含める
- アクセシビリティテストを含める

```typescript
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost'],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

// インタラクションテスト
export const WithClick: Story = {
  args: {
    variant: 'primary',
    children: 'Click me',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await userEvent.click(button);
  },
};
```

### 2. Visual Regression Testing

- Storybookと連携したVisual Regression Testingを実装
- 各コンポーネントの見た目の変更を検知
- レスポンシブデザインの検証

```typescript
// Button.test.ts
describe('Button', () => {
  it('has no visual regressions', async () => {
    await expect(page).toHaveScreenshot('button.png');
  });

  it('matches responsive design specs', async () => {
    // モバイル
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page).toHaveScreenshot('button-mobile.png');

    // タブレット
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page).toHaveScreenshot('button-tablet.png');

    // デスクトップ
    await page.setViewportSize({ width: 1440, height: 900 });
    await expect(page).toHaveScreenshot('button-desktop.png');
  });
});
```

### 3. コンポーネントテスト

- @testing-library/react を使用
- コンポーネントの表示と基本的な操作をテスト
- アクセシビリティのテストも含める

```typescript
import { render, screen } from '@testing-library/react';
import ProjectCard from './ProjectCard';

describe('ProjectCard', () => {
  it('renders project information correctly', () => {
    const project = {
      data: {
        title: 'Test Project',
        description: 'Test Description',
      },
    };

    render(<ProjectCard project={project} />);
    
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });
});
```

## リファクタリングガイドライン

### 1. リファクタリングの基準

- 重複コードの排除
- 単一責任の原則に従う
- コンポーネントの再利用性を高める
- パフォーマンスの最適化

### 2. リファクタリング前のチェックリスト

- [ ] 現在の実装の問題点を特定
- [ ] テストカバレッジの確認
- [ ] 変更による影響範囲の特定
- [ ] Visual Regression Testの準備

### 3. リファクタリングプロセス

1. テストの作成・更新
   - 既存の動作を保証するテストの追加
   - Storybookの作成・更新
   - Visual Regression Testの追加

2. コードの改善
   - コンポーネントの分割
   - ロジックの抽出
   - 型定義の改善
   - パフォーマンスの最適化

3. 変更の検証
   - ユニットテストの実行
   - Storybookでの見た目の確認
   - Visual Regression Testの実行
   - パフォーマンス計測

### 4. リファクタリング例

#### Before:
```tsx
function UserCard({ user, onEdit, onDelete }) {
  return (
    <div className="p-4 border rounded">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <div>
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}
```

#### After:
```tsx
interface User {
  id: string;
  name: string;
  email: string;
}

interface UserCardProps {
  user: User;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

function UserCard({ user, onEdit, onDelete }: UserCardProps) {
  const handleEdit = useCallback(() => {
    onEdit(user.id);
  }, [onEdit, user.id]);

  const handleDelete = useCallback(() => {
    onDelete(user.id);
  }, [onDelete, user.id]);

  return (
    <Card className="user-card">
      <CardHeader>
        <CardTitle>{user.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{user.email}</p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="ghost" onClick={handleEdit}>
          Edit
        </Button>
        <Button variant="destructive" onClick={handleDelete}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
```

## コミットメッセージ規約

### 1. 基本構造

```
<type>(<scope>): <subject>

<body>

<footer>
```

### 2. Type
- feat: 新機能
- fix: バグ修正
- docs: ドキュメントのみの変更
- style: コードの意味に影響を与えない変更
- refactor: バグ修正や機能追加のないコードの変更
- test: テストの追加・修正
- chore: ビルドプロセスやライブラリの変更

### 3. コミットメッセージの例

```
feat(projects): プロジェクト一覧ページの実装

- プロジェクトカードコンポーネントの作成
- ページネーション機能の追加
- フィルタリング機能の実装

Closes #123
```

## プルリクエスト規約

### 1. タイトル形式
`[Type] 変更内容の要約`

### 2. 説明テンプレート

```markdown
## 変更内容
- 変更点1
- 変更点2

## 変更理由
変更が必要な背景や目的

## テスト項目
- [ ] ユニットテスト
- [ ] E2Eテスト
- [ ] アクセシビリティテスト
- [ ] レスポンシブ動作確認

## スクリーンショット
変更箇所のスクリーンショット（UI変更時）
```

## コード変更後の確認

1. ビルドの確認
```bash
npm run typecheck
```

## 実装状況と残タスク

### 実装済み

1. Storybookの初期設定
   - 基本的なStorybookの設定
   - TailwindCSSの設定
   - PostCSSの設定
   - 必要なアドオンのインストール（links, essentials, interactions, a11y）

2. ProjectCardコンポーネントのストーリー作成
   - 基本的なストーリーの実装
   - 各種バリエーションの定義

### 残タスク

1. ドキュメントの充実
   - コンポーネントの使用方法
   - プロップスの説明
   - 実装例の追加

2. コンポーネントのリファクタリング
   - shadcn/uiコンポーネントの活用
   - 型定義の改善
   - パフォーマンスの最適化

3. その他のコンポーネントのストーリー作成
   - 他のUIコンポーネントの特定
   - ストーリーの実装
   - テストの追加

### 実装済みのテスト戦略

1. Visual Regression Testing
   - @storybook/test-runner, @storybook/test, axe-playwrightの導入
   - レスポンシブデザインの自動テスト（375px, 768px, 1024px, 1440px）
   - アクセシビリティの自動チェック（WCAG 2.0, 2.1基準）

2. アクセシビリティテスト
   - WAI-ARIA属性の適切な実装
   ```tsx
   // 例: ProjectCardコンポーネント
   <a
     href={project.href}
     aria-labelledby={titleId}
     className="group block no-underline"
   >
     <Card role="article">
       <div aria-hidden="true" className="decoration" />
       <h3 id={titleId}>{title}</h3>
     </Card>
   </a>
   ```
   - セマンティックHTML構造の採用
   ```tsx
   // 例: タグリストの実装
   <ul role="list" aria-label="タグリスト">
     {tags.map(tag => (
       <li key={tag}>{tag}</li>
     ))}
   </ul>
   ```

3. インタラクションテスト
   - ホバー効果のテスト
   ```tsx
   await userEvent.hover(element);
   await expect(element).toHaveClass('hover:scale-[1.02]');
   ```
   - キーボード操作のテスト
   ```tsx
   await userEvent.tab();
   await expect(element).toHaveFocus();
   ```

4. テスト実行コマンド
```bash
# Storybookの起動
pnpm storybook

# テストの実行（別ターミナル）
pnpm test-storybook --url http://localhost:6006

# リンターの実行
pnpm run lint

# 型チェック
pnpm run typecheck
```

### テストの仕組みと実装のベストプラクティス

#### 1. Storybookの動作の仕組み

1. コンポーネントの分離環境
   - Viteベースの独立した開発環境
   - コンポーネントをisolationで表示・テスト
   - ホットリロードによる即時プレビュー

2. アドオンの連携
   ```typescript
   // .storybook/main.ts
   const config: StorybookConfig = {
     framework: '@storybook/react-vite',
     stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
     addons: [
       '@storybook/addon-links',
       '@storybook/addon-essentials',
       '@storybook/addon-interactions',
       '@storybook/addon-a11y',
     ],
   };
   ```

3. プレビュー設定
   ```typescript
   // .storybook/preview.ts
   const preview: Preview = {
     parameters: {
       actions: { argTypesRegex: '^on[A-Z].*' },
       controls: {
         matchers: {
           color: /(background|color)$/i,
           date: /Date$/,
         },
       },
     },
   };
   ```

#### 2. テストランナーの仕組み

1. Playwrightの統合
   ```typescript
   // .storybook/test-runner.ts
   import { TestRunnerConfig } from '@storybook/test-runner';
   import { injectAxe, checkA11y } from 'axe-playwright';

   const config: TestRunnerConfig = {
     // ストーリーごとにブラウザインスタンスを起動
     async preVisit(page) {
       await injectAxe(page);
     },
     // テスト実行後のチェック
     async postVisit(page) {
       await checkA11y(page, '#storybook-root', {
         detailedReport: true,
         detailedReportOptions: { html: true },
       });
     },
   };
   ```

2. テストの実行フロー
   1. Storybookサーバーの起動
   2. 各ストーリーの読み込み
   3. インタラクションテストの実行
   4. アクセシビリティチェック
   5. スクリーンショットの比較
   6. レポート生成

3. 並行テスト実行
   ```bash
   # CI環境での並行実行
   pnpm concurrently -k -s first \
     "pnpm storybook --ci" \
     "pnpm test-storybook"
   ```

#### 3. アクセシビリティテストの仕組み

1. axe-playwrightの統合
   ```typescript
   // アクセシビリティ違反の検出
   await checkA11y(page, '#storybook-root', {
     axeOptions: {
       runOnly: {
         type: 'tag',
         values: ['wcag2a', 'wcag2aa'],
       },
     },
   });
   ```

2. 自動チェック項目
   - WAI-ARIA属性の検証
   - キーボード操作の確認
   - カラーコントラスト
   - セマンティックHTML

3. レポート生成
   ```typescript
   // 詳細なレポートの生成
   detailedReportOptions: {
     html: true,
     includedImpacts: ['critical', 'serious'],
   }
   ```

#### 4. Visual Regression Testingの仕組み

1. スクリーンショットの比較
   ```typescript
   // スクリーンショットの取得と比較
   await expect(page).toHaveScreenshot({
     fullPage: true,
     threshold: 0.1, // 許容される差異
   });
   ```

2. レスポンシブテスト
   ```typescript
   // 各ブレイクポイントでのテスト
   for (const viewport of VIEWPORTS) {
     await page.setViewportSize(viewport);
     await expect(page).toHaveScreenshot(`${name}-${viewport.width}.png`);
   }
   ```

3. 差分の検出と報告
   - ピクセルレベルの比較
   - 視覚的な差分のハイライト
   - CIでの自動チェック

#### 5. テストファイルの構造とベストプラクティス

1. コンポーネントごとのテストファイル構成
   ```
   src/
     └── components/
         └── [Component]/
             ├── Component.tsx          # 実装
             ├── Component.stories.tsx  # Storybook
             ├── Component.test.tsx     # ユニットテスト
             └── __snapshots__/        # スナップショット
   ```

2. テスト実装の優先順位
   1. アクセシビリティテスト
   2. 基本機能テスト
   3. インタラクションテスト
   4. ビジュアルリグレッションテスト

3. CI/CDパイプラインでのテスト実行
   ```yaml
   test:
     runs-on: ubuntu-latest
     steps:
       - uses: actions/checkout@v2
       - run: pnpm install
       - run: pnpm build-storybook
       - run: pnpm test-storybook:ci
   ```

4. テスト結果の保存
   ```yaml
   - name: Upload test results
     uses: actions/upload-artifact@v2
     with:
       name: storybook-test-results
       path: |
         ./__screenshots__
         ./storybook-static
   ```
