import type { TechInfo } from "@/components/projects/TechStackDisplay";

// 技術スタックのマッピング - 技術名をキーとして、アイコンと説明を保持
const techStackMap: Record<string, Omit<TechInfo, "name">> = {
  // フロントエンド技術
  "React": { icon: "⚛️", description: "UIコンポーネントの構築に使用" },
  "Next.js": { icon: "▲", description: "サーバーサイドレンダリングとルーティング" },
  "Gatsby": { icon: "🟣", description: "静的サイト生成のために使用" },
  "Nuxt.js": { icon: "🟢", description: "Vue.jsベースのフレームワーク" },
  "Vue.js": { icon: "🟩", description: "リアクティブなUIコンポーネント構築" },
  "Angular": { icon: "🅰️", description: "大規模アプリケーション向けフレームワーク" },
  "TypeScript": { icon: "TS", description: "型安全なコード開発のために採用" },
  "JavaScript": { icon: "JS", description: "Webアプリケーション開発の基礎言語" },
  "Tailwind CSS": { icon: "🌊", description: "効率的なスタイリングのために使用" },
  "Framer Motion": { icon: "🔄", description: "高品質なアニメーション実装" },
  "HTML5": { icon: "🌐", description: "Webページの構造化マークアップ" },
  "CSS3": { icon: "🎨", description: "Webページのスタイリング" },
  "SCSS": { icon: "💅", description: "CSSの効率的な記述" },
  
  // バックエンド技術
  "Node.js": { icon: "🟢", description: "サーバーサイドJavaScript実行環境" },
  "Express": { icon: "🚂", description: "Node.jsベースのWebフレームワーク" },
  "Django": { icon: "🐍", description: "Pythonベースの高機能Webフレームワーク" },
  "Flask": { icon: "🧪", description: "軽量Pythonマイクロフレームワーク" },
  "Ruby on Rails": { icon: "🛤️", description: "Rubyベースの高生産性フレームワーク" },
  "Laravel": { icon: "🔺", description: "PHPベースの洗練されたWebフレームワーク" },
  "Spring Boot": { icon: "☕", description: "Javaベースのエンタープライズフレームワーク" },
  "PHP": { icon: "🐘", description: "Webアプリケーション開発言語" },
  "Python": { icon: "🐍", description: "バックエンド開発・データ処理向け言語" },
  "Java": { icon: "☕", description: "エンタープライズ向けプログラミング言語" },
  "Go": { icon: "🐹", description: "高効率なバックエンド開発言語" },
  "C#": { icon: "🎯", description: ".NETフレームワーク向け開発言語" },
  ".NET": { icon: "🔷", description: "マイクロソフトのアプリケーション開発プラットフォーム" },
  "GraphQL": { icon: "⬢", description: "効率的なAPIクエリ言語" },
  "REST API": { icon: "🔄", description: "リソース指向のWeb API設計" },
  
  // データベース
  "MongoDB": { icon: "🍃", description: "NoSQLドキュメント指向データベース" },
  "PostgreSQL": { icon: "🐘", description: "高機能リレーショナルデータベース" },
  "MySQL": { icon: "🐬", description: "広く使われているRDBMS" },
  "SQLite": { icon: "🔍", description: "組み込み向け軽量データベース" },
  "Redis": { icon: "🔴", description: "インメモリデータストア・キャッシュ" },
  "Elasticsearch": { icon: "🔍", description: "分散検索・分析エンジン" },
  
  // クラウド・インフラ
  "AWS": { icon: "☁️", description: "クラウドインフラストラクチャサービス" },
  "AWS Organizations": { icon: "🏢", description: "複数AWSアカウントの一元管理" },
  "EC2": { icon: "🖥️", description: "AWSの仮想サーバーサービス" },
  "ECS": { icon: "🐳", description: "AWSのコンテナオーケストレーションサービス" },
  "Lambda": { icon: "λ", description: "サーバーレスコンピューティングサービス" },
  "S3": { icon: "📦", description: "オブジェクトストレージサービス" },
  "DynamoDB": { icon: "📊", description: "フルマネージドNoSQLデータベース" },
  "RDS": { icon: "🗄️", description: "マネージドリレーショナルデータベースサービス" },
  "Azure": { icon: "⚡", description: "マイクロソフトのクラウドプラットフォーム" },
  "GCP": { icon: "🌐", description: "Googleのクラウドプラットフォーム" },
  "Firebase": { icon: "🔥", description: "アプリ開発プラットフォーム" },
  "Terraform": { icon: "🏗️", description: "インフラストラクチャのコード化ツール" },
  "IaC": { icon: "📝", description: "インフラストラクチャのコード化手法" },
  "Docker": { icon: "🐳", description: "コンテナ化プラットフォーム" },
  "Kubernetes": { icon: "☸️", description: "コンテナオーケストレーションプラットフォーム" },
  "CI/CD": { icon: "🔄", description: "継続的インテグレーション/デリバリー" },
  "GitHub Actions": { icon: "🔄", description: "GitHubの継続的インテグレーションサービス" },
  "Jenkins": { icon: "🤵", description: "オープンソースの自動化サーバー" },
  "Nginx": { icon: "🟩", description: "高性能Webサーバー/リバースプロキシ" },
  "Apache": { icon: "🪶", description: "広く使われているWebサーバー" },
  
  // セキュリティ
  "SSO": { icon: "🔑", description: "シングルサインオン認証" },
  "OAuth": { icon: "🔐", description: "オープン認証プロトコル" },
  "JWT": { icon: "🎫", description: "JSON Web Token認証" },
  "HTTPS": { icon: "🔒", description: "安全なHTTP通信" },
  
  // その他
  "コンテナ化": { icon: "📦", description: "アプリケーションのコンテナ化技術" },
  "マイクロサービス": { icon: "🧩", description: "小規模で独立したサービス群による設計" },
  "サーバーレス": { icon: "☁️", description: "インフラ管理不要のコンピューティングモデル" },
  "コスト最適化": { icon: "💰", description: "クラウドリソースの効率化・コスト削減" },
  "インフラ自動化": { icon: "🤖", description: "インフラ構築・運用の自動化" },
  "クラウドガバナンス": { icon: "🛡️", description: "クラウド環境の管理・規制遵守" }
};

/**
 * マークダウンコンテンツから技術スタックを抽出する
 * 
 * @param markdown マークダウンコンテンツ
 * @param tags 既存のタグ配列（通常はフロントマターから）
 * @returns 技術スタック情報の配列
 */
export function extractTechStack(markdown: string, tags?: string[]): TechInfo[] {
  const detectedTechs = new Set<string>();
  
  // 1. タグが存在する場合、それをまず技術として追加
  if (tags && Array.isArray(tags)) {
    tags.forEach(tag => {
      if (techStackMap[tag]) {
        detectedTechs.add(tag);
      }
    });
  }
  
  // 2. マークダウン内のキーワードをスキャンする
  Object.keys(techStackMap).forEach(tech => {
    // 正規表現で厳密なマッチを行う (単語境界で区切られたものだけ)
    const regex = new RegExp(`\\b${tech}\\b`, 'i');
    if (regex.test(markdown)) {
      detectedTechs.add(tech);
    }
  });
  
  // 3. 特定のパターンを検出
  // CI/CD パイプラインに関する言及
  if (/CI\/CD|継続的(インテグレーション|デリバリー|デプロイ)|パイプライン/.test(markdown)) {
    detectedTechs.add("CI/CD");
  }
  
  // コンテナ化に関する言及
  if (/コンテナ化|Docker|コンテナ環境|ECS/.test(markdown) && !detectedTechs.has("Docker")) {
    detectedTechs.add("コンテナ化");
  }
  
  // マイクロサービスに関する言及
  if (/マイクロサービス|サービス分割|サービス間通信/.test(markdown)) {
    detectedTechs.add("マイクロサービス");
  }
  
  // サーバーレスに関する言及
  if (/サーバーレス|Lambda|関数型|イベント駆動/.test(markdown) && !detectedTechs.has("Lambda")) {
    detectedTechs.add("サーバーレス");
  }
  
  // 結果を配列に変換
  return Array.from(detectedTechs).map(tech => ({
    name: tech,
    ...techStackMap[tech]
  }));
}
