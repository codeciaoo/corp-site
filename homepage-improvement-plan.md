# CodeCiao トップページ改善計画

## 現状の分析

現在のトップページには以下のセクションが含まれています：

1. **ヒーローセクション** (HeroSection)
2. **解決できる課題** (Solutions)
3. **3つの強み** (Strengths)
4. **実績** (HomeProjects)
5. **主要サービス** (Services)
6. **契約プラン** (ServiceComparisonTable)
7. **お問い合わせから開始までの流れ** (ContactFlow)

## 改善目標

21st.devのコンポーネントとアニメーションを活用し、現在のテイストを残しつつ、AI企業としてより洗練されたトップページにリニューアルします。具体的には以下を目指します：

1. **視覚的インパクトの向上** - アニメーションとモダンなUI要素を取り入れる
2. **ユーザーエンゲージメントの強化** - インタラクティブな要素を増やす
3. **AI企業としてのブランディング強化** - AI技術を視覚的に表現する
4. **情報の階層化と整理** - ユーザーにとって重要な情報を優先的に表示
5. **パフォーマンス最適化** - アニメーションによる負荷を最小限に抑える

## 改善タスク一覧

### フェーズ1: 基盤準備と計画

- [x] 現状分析とタスク計画作成
- [x] 21st.devコンポーネントの調査・選定
- [x] アニメーションライブラリの選定 (Framer Motion)
- [ ] デザインシステムの更新（カラーパレット、タイポグラフィ等）

### フェーズ2: ヒーローセクションの刷新

- [x] 新しいヒーローセクションデザインの作成
  - [x] パーティクルアニメーションの導入
  - [x] AIをテーマにした視覚的表現の追加
  - [x] タイトルと説明文のアニメーション効果実装
  - [x] CTAボタンのデザイン改善

### フェーズ3: 解決できる課題（Solutions）セクションの強化

- [x] カード要素のデザイン刷新
  - [x] ホバーエフェクトの改善
  - [x] トランジション効果の追加
- [x] スクロールアニメーションの実装
- [x] アイコンのアニメーション追加
- [x] レスポンシブデザインの最適化

### フェーズ4: 3つの強み（Strengths）セクションの改善

- [x] グリッドレイアウトの見直し
- [x] カードデザインの刷新
  - [x] 立体感のあるデザイン
  - [x] マイクロインタラクションの追加
- [x] 数値データの視覚化強化（カウントアップアニメーション等）

### フェーズ5: 実績（HomeProjects）セクションの改善

- [x] プロジェクトカードのデザイン刷新
  - [x] ホバーエフェクトの改善
  - [x] カード内の情報階層の見直し
- [x] フィルタリング機能の追加
- [x] ケーススタディへのリンク強化

### フェーズ6: 主要サービス（Services）セクションの改善

- [x] サービス説明のビジュアル強化
  - [x] アイコンまたはイラストの刷新
  - [x] サービス詳細の表示方法改善
- [x] タブまたはアコーディオンインターフェースの導入
- [x] スクロールアニメーションの実装

### フェーズ7: 契約プラン（ServiceComparisonTable）セクションの改善

- [x] 比較表のデザイン刷新
  - [x] 視認性の向上
  - [x] ハイライト効果の追加
- [x] 料金プランの選択インターフェース改善
- [x] CTAボタンの最適配置

### フェーズ8: お問い合わせフロー（ContactFlow）セクションの改善

- [x] ステップ表示のビジュアル強化
  - [x] タイムラインデザインの改善
  - [x] アイコンやイラストの追加
- [x] アニメーション効果の追加
- [x] お問い合わせフォームへの誘導強化

### フェーズ9: 全体の統合とテスト

- [ ] パフォーマンス最適化
  - [ ] 画像の最適化
  - [ ] アニメーションの負荷テスト
- [ ] クロスブラウザ互換性テスト
- [ ] レスポンシブデザインの最終確認
- [ ] アクセシビリティチェック

## 使用検討コンポーネント（21st.dev）

- **カードコンポーネント** - ソリューションやサービス表示用
- **ホバーカード** - 追加情報表示用
- **タブ** - コンテンツの整理用
- **アコーディオン** - モバイル表示時の情報整理用
- **スクロールエリア** - コンテンツの効率的表示用
- **アスペクト比** - 画像やメディア表示の最適化用
- **シート** - 詳細情報の表示用
- **トースト** - フィードバック表示用
- **コマンド** - 検索や移動の効率化用
- **カルーセル** - プロジェクト事例表示用

## アニメーション要素

- **スクロールアニメーション** - 要素が視界に入るとフェードイン
- **パーティクルアニメーション** - ヒーローセクションでの背景効果
- **タイピングアニメーション** - キャッチコピーの表示
- **ホバーエフェクト** - カードやボタンの反応性向上
- **モーフィング** - 図形やグラフィックの変形アニメーション
- **カウントアップ** - 数値データのアニメーション表示
- **パララックス効果** - 奥行き感の表現

## プロジェクト詳細ページ改善計画

現在のプロジェクト一覧ページのカードデザインを改善したのに合わせて、プロジェクト詳細ページも統一感のあるデザインに刷新します。

### 現状分析

現在のプロジェクト詳細ページは単一の大きな`ProjectRenderer`コンポーネントで実装されており、以下の特徴があります：

- マークダウンコンテンツを`<h2>`タグで分割し、セクションに分類
- セクションタイトルに基づいて4種類に分類（basicInfo, background, result, others）
- 各セクションタイプごとに異なるスタイルとアイコンを適用
- カスタムHTMLマーカーを使ったリスト表示の強化

### フェーズ1: コンポーネントの分割とデザイン刷新

- [x] **コードレビューと分析**
  - [x] 現在のProjectRenderer.tsxのロジックを分析
  - [x] セクション分類ロジックを文書化
  - [x] Windsurf rulesに追加

- [x] **共通インターフェースとユーティリティ**
  - [x] 共通型定義の作成（ProjectSectionProps, SectionType）
  - [x] セクション抽出ユーティリティ実装（extractSectionsFromMarkdown）
  - [x] リスト要素強化ユーティリティ実装（enhanceListItems）

- [x] **メインコンポーネント分割**
  - [x] 基本情報表示用コンポーネント作成（ProjectBasicInfo.tsx）
    - 青系グラデーション背景
    - FileTextアイコン
    - カスタマイズされたリスト表示
  - [x] 背景情報表示用コンポーネント作成（ProjectBackground.tsx）
    - 赤系グラデーション背景
    - AlertCircleアイコン
    - カスタムリストスタイル（×アイコン）
  - [x] 結果表示用コンポーネント作成（ProjectResult.tsx）
    - ティール系グラデーション背景
    - CheckCircle2アイコン
    - カスタムリストスタイル（✓アイコン）
  - [x] その他詳細情報表示用コンポーネント作成（ProjectDetail.tsx）
    - スレート系グラデーション背景
    - テーブルラッパーによる横スクロール対応
  - [x] ヘッダー情報表示用コンポーネント作成（ProjectHeader.tsx）
    - タイトル表示
    - タグ情報表示
    - メタデータ表示

- [x] **Astroページの更新**
  - [x] 新コンポーネントの統合
  - [x] マークダウンメタデータからタグ情報の取得と表示

- [x] **コード品質改善**
  - [x] TypeScriptの型インポートに関するリントエラー修正
  - [x] verbatimModuleSyntax設定への対応（import type構文の使用）
  - [x] マークダウンリント改善（空行や見出し周りの整形）
  - [x] ベストプラクティスの文書化

### フェーズ2: プロジェクト概要セクションの強化

- [x] 情報カードのデザイン刷新
  - [x] 21st.devのCardコンポーネントスタイル活用（`Card`, `CardHeader`, `CardTitle`, `CardContent`）
  - [x] プロジェクト概要の視覚的階層の改善（`ProjectInfoCard`コンポーネント）
  - [x] 重要データのハイライト（`CalloutBox`コンポーネント活用）
  - [x] クライアント情報と期間表示の強化（プロパティ抽出とメタデータ表示）
- [x] インタラクティブな技術スタックリスト
  - [x] 技術スタック表示の専用コンポーネント実装（`TechStackDisplay`）
  - [x] メタデータまたはコンテンツからの技術スタック自動抽出機能
- [x] スクロールに連動したアニメーション
  - [x] `ScrollReveal`コンポーネントの実装と活用
  - [x] `ScrollAnimatedSection`による見出しとアイコンのアニメーション
  - [x] Framer Motionを使用した矢印などの要素のアニメーション

### フェーズ3: プロジェクト詳細コンテンツの改善

- [x] コンテンツセクションの構造化
  - [x] セクション特性に基づいた新しいコンポーネント分割の実装
    - `ProjectBackground`: 背景情報（赤系グラデーション背景、AlertCircleアイコン）
    - `ProjectResult`: 結果情報（ティール系グラデーション背景、CheckCircle2アイコン）
    - `ProjectDetail`: その他詳細情報（スレート系グラデーション背景）
  - [x] 各セクションの視覚的識別のためのデザイン改善（アイコン、色分け）
  - [x] 直感的なグリッドレイアウトと矢印による「課題」から「解決策」への流れの視覚化
- [x] テキスト読みやすさの向上
  - [x] `sectionConfig`による一貫したスタイル設定
  - [x] カスタムリスト表示の強化（`enhanceListItems`）
  - [x] プロセフルタグの適用とレスポンシブデザインの最適化
  - [x] 引用やポイントの装飾（`CalloutBox`コンポーネント活用）
- [x] コード品質の改善
  - [x] `sectionConfig`オブジェクトによる設定の一元管理
  - [x] TypeScript型定義の改善（`ProjectSectionProps`, `SectionType`）
  - [x] 機能分割によるメンテナンス性向上

### フェーズ4: ビジュアルコンテンツの強化

- [x] アニメーションとレイアウトの改善
  - [x] Framer Motionを使用したアニメーション要素の追加
  - [x] グリッドレイアウトによる情報の整理（背景と結果のセクション）
  - [x] `ArrowRight`アイコンを用いた背景から結果への流れの視覚化
  - [x] モバイル/デスクトップ対応のレスポンシブデザイン
- [x] 技術スタック表示の強化
  - [x] `TechStackDisplay`コンポーネントによる技術一覧表示
  - [x] 自動抽出機能によるメタデータからの技術スタック取得
- [ ] ビジュアルフィードバックの追加
  - [ ] スクロールプログレスインジケーター
  - [ ] ライトモード/ダークモードの最適化

### フェーズ5: プロジェクトヘッダーとイントロセクションの強化

- [ ] プロジェクトヘッダーの視覚的インパクト向上
  - [ ] AspectRatioコンポーネントを使用したプロジェクトバナー画像の追加
  - [ ] パララックススクロール効果の実装
  - [ ] グラデーションオーバーレイによる視認性向上
- [ ] プロジェクトイントロ選択インターフェースの実装
  - [ ] Tabsコンポーネントを使用した「概要」「チャレンジ」「ソリューション」などのタブ切り替え
  - [ ] RadioGroupコンポーネントを使用した代替インターフェース
- [ ] 主要指標の視覚化
  - [ ] HoverCardコンポーネントを使用したキーパラメータの詳細表示
  - [ ] Badgeコンポーネントを使用した重要指標のハイライト
  - [ ] カウントアップアニメーションを使用した数値データの表示

### フェーズ6: コンテンツセクションのインタラクティブ性向上

- [ ] Accordionコンポーネントの導入
  - [ ] プロジェクトの詳細情報を折りたたみ可能なセクションに変換
  - [ ] モバイル表示時のスペース最適化
- [ ] インタラクティブな技術スタック表示
  - [ ] HoverCardコンポーネントを使用した技術スタック詳細表示
  - [ ] ScrollAreaコンポーネントを使用したスムーズなスクロール可能な技術リスト
- [ ] シーケンス表示の改善
  - [ ] Commandコンポーネントを使用した検索可能なプロジェクトタイムライン
  - [ ] Separatorコンポーネントを使用したタイムラインの視覚化
- [ ] 追加ビジュアル要素
  - [ ] Avatarコンポーネントを使用したチームメンバーの表示
  - [ ] Skeletonコンポーネントを使用したロード中の表示改善
  - [ ] Calendarコンポーネントを使用した日付関連情報の表示改善

### フェーズ7: ナビゲーションと関連コンテンツの改善

- [ ] 関連プロジェクトの表示
  - [ ] 改善済みカードデザインの再利用
  - [ ] 関連度に基づく表示順序の最適化
- [ ] 前後のプロジェクトへのナビゲーション追加
  - [ ] ページネーションコンポーネントの活用
  - [ ] プレビュー画像とタイトルの表示
- [ ] CTAセクションの改善
  - [ ] 問い合わせボタンのデザイン刷新
  - [ ] ホバーアニメーションの追加
- [ ] ソーシャルシェア機能の追加
  - [ ] シェアボタンのインタラクティブデザイン
  - [ ] OGPメタデータの最適化

## 次のステップ

現在フェーズ6（主要サービス）まで完了し、次のフェーズに進む準備ができています。次の具体的なタスクは以下の通りです：

1. 契約プラン（ServiceComparisonTable）セクションの改善に着手
2. お問い合わせフロー（ContactFlow）セクションの改善
3. プロジェクト詳細ページの改善（上記計画に基づく）
4. インデックスページ全体のフローと統一感の最終調整

また、実装済みのコンポーネントのlintエラーを修正しました：
- パーティクルコンテナ（particles-container.tsx）
- タイピングエフェクト（typing-effect.tsx）

各フェーズ完了後にレビューを行い、次のフェーズに進みます。
