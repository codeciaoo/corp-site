# ポートフォリオページのコンポーネント設計

## コンポーネント階層

```
MemberPortfolio (メインコンテナ)
├── ProfileHeader (プロフィールヘッダー)
├── TabNavigation (セクション切り替えタブ)
├── SkillsSection (スキルセクション)
│   ├── SkillCategory (スキルカテゴリー)
│   └── SkillBadge (スキルバッジ)
├── CareerSection (経歴セクション)
│   └── CareerItem (経歴アイテム)
├── ProjectsSection (プロジェクトセクション)
│   ├── ProjectTableHeader (テーブルヘッダー)
│   └── ProjectTableRow (テーブル行)
└── SelfPrSection (自己PRセクション)
```

## 各コンポーネントの詳細仕様

### MemberPortfolio
- **機能**: ポートフォリオページの全体コンテナ
- **props**: 
  - `member: MemberPortfolio` - メンバー情報

### ProfileHeader
- **機能**: メンバーのプロフィールヘッダー表示
- **props**:
  - `name: string` - 名前
  - `role: string` - 役職
  - `image: string` - 画像URL
  - `bio: string` - 自己紹介文
- **デザイン**:
  - 画像とテキスト情報を並べたヘッダーレイアウト
  - モバイルでは縦並び、デスクトップでは横並び
  - アニメーション: 表示時のフェードイン

### TabNavigation
- **機能**: セクション間のナビゲーション
- **props**:
  - `tabs: {id: string, label: string}[]` - タブ情報
  - `activeTab: string` - アクティブなタブID
  - `onChange: (id: string) => void` - タブ切り替え時のコールバック
- **デザイン**:
  - スティッキーまたは固定ヘッダータブ
  - アクティブタブの強調表示
  - スムーズなスクロールアニメーション

### SkillsSection
- **機能**: スキルセットの表示
- **props**:
  - `skills: {category: string, skills: string[]}[]` - カテゴリ別スキル
- **デザイン**:
  - カテゴリごとにグループ化
  - グリッドまたはフレックスレイアウト
  - スキル項目はバッジ形式で表示

### CareerSection
- **機能**: 職務経歴の表示
- **props**:
  - `career: string[]` - 経歴リスト
  - `education: string[]` - 学歴リスト
  - `certifications: string[]` - 資格リスト
- **デザイン**:
  - タイムライン形式での表示
  - 項目ごとのカード表示
  - 時系列順のリスト

### ProjectsSection
- **機能**: プロジェクト実績の表示（ProjectInfoCardを活用）
- **props**:
  - `projects: ProjectEntry[]` - プロジェクト一覧
- **デザイン**:
  - 既存のProjectInfoCardコンポーネントを活用したカードベースレイアウト
  - 各プロジェクトを独立したカードとして表示
  - スクロールアニメーション付きのカード表示（ScrollRevealを活用）
  - モバイル対応済みのレスポンシブデザイン

### SelfPrSection
- **機能**: 自己PRの表示
- **props**:
  - `content: string` - 自己PR文
- **デザイン**:
  - マークダウン対応テキスト表示
  - 装飾的な背景
  - 引用スタイルでのハイライト

## 状態管理

1. **タブ状態**
   - activeTabの状態を管理
   - タブ切り替えによるスムーズスクロール制御

2. **レスポンシブ状態**
   - 画面サイズに応じたレイアウト切り替え
   - テーブル表示またはカード表示の切り替え

3. **アニメーション状態**
   - スクロールアニメーション制御
   - 要素の表示・非表示アニメーション

## スタイリング方針

- **カラーパレット**:
  - ブランドカラー（Teal）をベース
  - アクセントカラーでメリハリ
  - テキスト色は読みやすさ重視

- **タイポグラフィ**:
  - 見出し: 太めのサンセリフ
  - 本文: 読みやすいサンセリフ
  - 強調部分: ウェイト変更またはカラー変更

- **スペーシング**:
  - 一貫した余白システム
  - モバイルでは余白を縮小
  - セクション間の十分な区切り

- **アニメーション**:
  - スクロールアニメーション
  - フェードイン/スライドイン効果
  - タブ切り替えアニメーション

## テーブルデザイン詳細

テーブルは閲覧性と情報密度のバランスを考慮し、以下の設計とします：

### デスクトップ表示
- 全項目を横並びで表示
- カラム幅は内容に応じて調整
- ヘッダーは固定表示（オプション）
- 行のホバー効果でハイライト

### タブレット表示
- 主要項目のみ表示
- その他項目は折りたたみまたはポップオーバー表示
- 横スクロールで全項目閲覧可能

### モバイル表示
- カード形式に切り替え
- 項目ごとにラベル付きで縦並び表示
- プロジェクトごとにカード分割
- タッチでのアコーディオン展開（オプション）

## アクセシビリティ対応

- 適切なARIAラベルの使用
- キーボードナビゲーション対応
- 十分なコントラスト比の確保
- スクリーンリーダー対応の表構造

## パフォーマンス最適化

- 画像の遅延読み込み
- コンポーネントの遅延読み込み
- テーブルデータの仮想化（大量データの場合）
- ページ内遷移の最適化