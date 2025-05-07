import React from "react";
import { 
  // フレームワーク・ライブラリ
  SiReact, SiTypescript, SiJavascript, SiNextdotjs, SiNodedotjs, 
  SiTailwindcss, SiVuedotjs, SiAngular, SiSvelte, SiAstro, 
  SiJest, SiPwa,
  
  // クラウド・インフラ
  SiAmazonwebservices, SiDocker, SiKubernetes, SiTerraform, SiAnsible,
  SiNginx, SiApache, SiVercel, SiNetlify, SiGooglecloud, SiFirebase,
  
  // AWS関連
  SiAmazons3, SiAmazonec2, SiAmazonrds, SiAmazondynamodb, SiAmazoneks,
  SiAmazoniam, SiAmazonroute53, 
  SiAwsamplify, SiAwsfargate, SiAmazonsqs, 
  
  // データベース
  SiMongodb, SiPostgresql, SiMysql, SiRedis, SiPrisma, SiSqlite,
  SiMariadb, SiInfluxdb, 
  
  // Python関連
  SiPython, SiDjango, SiFlask, SiFastapi, SiPandas, SiNumpy, 
  SiScikitlearn, SiPytorch, SiTensorflow, SiKeras, SiJupyter,
  SiAnaconda, SiPycharm, 
  
  // AI・機械学習
  SiOpenai, SiHuggingface, SiKaggle, 
  
  // バージョン管理・CI/CD
  SiGithub, SiGithubactions, SiGitlab, SiGit, SiJenkins, SiCircleci,
  
  // 言語
  SiOpenjdk, SiSharp, SiDotnet, SiRuby, SiSwift, SiKotlin, 
  SiGo, SiRust, SiPhp, SiCss3, SiHtml5,
  
  // バックエンド
  SiExpress, SiNestjs, SiSpring, SiRubyonrails, SiLaravel, SiGraphql,
  
  // DevOps関連
  SiOctopusdeploy, SiCloud66, SiDigitalocean, SiVagrant, SiElastic,
  SiIstio, SiPrometheus, SiGrafana, SiElasticsearch, SiKibana,
  SiFluentd, SiDatadog,
  
  // コミュニケーションツール
  SiSlack, SiFigma, SiNotion, SiDiscord, SiZoom,
  
  // その他
  SiWebpack
} from "react-icons/si";

// AWS専用アイコンが不足しているものは AWSアイコン + サービス名 で対応
import { FaAws, FaQuestion, FaDatabase, FaServer, FaBrain, FaRobot, FaGoogle, FaLink, FaDocker, FaNetworkWired, FaCodeBranch, FaTheaterMasks, FaShieldAlt, FaFileAlt, FaClipboardList, FaProjectDiagram, FaCloudversify, FaGitAlt, FaWindows, FaCode, FaTasks, FaSitemap, FaUserCog, FaTools, FaTerminal, FaVideo, FaUsers, FaCat } from "react-icons/fa";
import { FaFileWord, FaFileExcel, FaFilePowerpoint, FaEnvelope } from "react-icons/fa";
import { VscCode } from "react-icons/vsc";
import { IoCloudOutline } from "react-icons/io5";
import { BsKanban, BsCodeSlash } from "react-icons/bs";
import { GrMysql } from "react-icons/gr";

// キー(小文字)とアイコンコンポーネントのマッピング
const ICON_MAP: Record<string, React.ElementType> = {
  // フレームワーク/ライブラリ
  react: SiReact,
  reactjs: SiReact,
  "react.js": SiReact,
  next: SiNextdotjs,
  nextjs: SiNextdotjs,
  "next.js": SiNextdotjs,
  nuxt: SiVuedotjs,
  nuxtjs: SiVuedotjs,
  "nuxt.js": SiVuedotjs,
  vue: SiVuedotjs,
  vuejs: SiVuedotjs,
  "vue.js": SiVuedotjs,
  angular: SiAngular,
  svelte: SiSvelte,
  sveltekit: SiSvelte,
  "svelte kit": SiSvelte,
  astro: SiAstro,
  remix: FaCode,
  tailwind: SiTailwindcss,
  tailwindcss: SiTailwindcss,
  
  // 言語
  typescript: SiTypescript,
  ts: SiTypescript,
  javascript: SiJavascript,
  js: SiJavascript,
  python: SiPython,
  py: SiPython,
  java: SiOpenjdk,
  ruby: SiRuby,
  "c#": SiSharp,
  csharp: SiSharp,
  go: SiGo,
  golang: SiGo,
  rust: SiRust,
  php: SiPhp,
  swift: SiSwift,
  kotlin: SiKotlin,
  html: SiHtml5,
  html5: SiHtml5,
  css: SiCss3,
  css3: SiCss3,
  
  // バックエンド
  node: SiNodedotjs,
  nodejs: SiNodedotjs,
  "node.js": SiNodedotjs,
  "バックエンド開発": FaTerminal,
  "backend development": FaTerminal,
  "backend": FaTerminal,
  express: SiExpress,
  expressjs: SiExpress,
  "express.js": SiExpress,
  nestjs: SiNestjs,
  "nest.js": SiNestjs,
  django: SiDjango,
  flask: SiFlask,
  fastapi: SiFastapi,
  "fast api": SiFastapi,
  spring: SiSpring,
  "spring boot": SiSpring,
  springboot: SiSpring,
  rails: SiRubyonrails,
  rubyonrails: SiRubyonrails,
  "ruby on rails": SiRubyonrails,
  laravel: SiLaravel,
  dotnet: SiDotnet,
  ".net": SiDotnet,
  
  // データベース
  mongodb: SiMongodb,
  mongo: SiMongodb,
  postgresql: SiPostgresql,
  postgres: SiPostgresql,
  mysql: SiMysql,
  mariadb: SiMariadb,
  redis: SiRedis,
  prisma: SiPrisma,
  sqlite: SiSqlite,
  cassandra: FaDatabase,
  influxdb: SiInfluxdb,
  "time series database": SiInfluxdb,
  
  // AWS基本サービス
  aws: SiAmazonwebservices,
  "amazon web services": SiAmazonwebservices,
  s3: SiAmazons3,
  ec2: SiAmazonec2,
  rds: SiAmazonrds,
  dynamodb: SiAmazondynamodb,
  eks: SiAmazoneks,
  ecs: FaDocker,
  "aws ecs": FaDocker,
  "elastic container service": FaDocker,
  ecr: FaDocker,
  "aws ecr": FaDocker,
  "elastic container registry": FaDocker,
  aurora: FaDatabase,
  "aws aurora": FaDatabase,
  alb: FaNetworkWired,
  "aws alb": FaNetworkWired,
  "application load balancer": FaNetworkWired,
  lambda: FaAws,
  "aws lambda": FaAws,
  cloudwatch: FaAws,
  "aws cloudwatch": FaAws,
  cloudfront: FaAws,
  "aws cloudfront": FaAws,
  "api gateway": FaNetworkWired,
  "apigateway": FaNetworkWired,
  "aws api gateway": FaNetworkWired,
  "aws apigateway": FaNetworkWired,
  route53: SiAmazonroute53,
  "aws route53": SiAmazonroute53,
  iam: SiAmazoniam,
  "aws iam": SiAmazoniam,
  sqs: SiAmazonsqs,
  "aws sqs": SiAmazonsqs,
  sns: FaAws, // SNS専用アイコンがないためAWSアイコンで代用
  "aws sns": FaAws,
  fargate: SiAwsfargate,
  "aws fargate": SiAwsfargate,
  amplify: SiAwsamplify,
  "aws amplify": SiAwsamplify,
  "aws organizations": FaAws,
  "aws accounts": FaAws,
  "account factory for terraform": FaAws,
  aft: FaAws,
  
  // 他のクラウドサービス
  azure: FaWindows,
  "microsoft azure": FaWindows,
  firebase: SiFirebase,
  gcp: SiGooglecloud,
  "google cloud": SiGooglecloud,
  "cloud run": SiGooglecloud,
  pinecone: FaDatabase,
  "digital ocean": SiDigitalocean,
  digitalocean: SiDigitalocean,
  
  // DevOps
  docker: SiDocker,
  kubernetes: SiKubernetes,
  k8s: SiKubernetes,
  gke: SiGooglecloud,
  amazon_eks: SiAmazoneks,
  "google kubernetes engine": SiGooglecloud,
  istio: SiIstio,
  "sealed secrets": FaShieldAlt,
  "bitnami sealed secrets": FaShieldAlt,
  "sealed-secrets": FaShieldAlt,
  datadog: SiDatadog,
  github: SiGithub,
  "github actions": SiGithubactions,
  terraform: SiTerraform,
  ansible: SiAnsible,
  nginx: SiNginx,
  apache: SiApache,
  vercel: SiVercel,
  netlify: SiNetlify,
  
  // Python関連
  pandas: SiPandas,
  numpy: SiNumpy,
  "scikit-learn": SiScikitlearn,
  scikitlearn: SiScikitlearn,
  pytorch: SiPytorch,
  tensorflow: SiTensorflow,
  keras: SiKeras,
  jupyter: SiJupyter,
  anaconda: SiAnaconda,
  pycharm: SiPycharm,
  
  // AI・機械学習
  openai: SiOpenai,
  "open ai": SiOpenai,
  gpt: SiOpenai,
  "chatgpt": SiOpenai,
  gemini: FaGoogle,
  gemeni: FaGoogle, // ユーザー入力のスペルミスに対応
  langchain: FaLink,
  "hugging face": SiHuggingface,
  huggingface: SiHuggingface,
  "機械学習": FaBrain,
  "machine learning": FaBrain,
  ml: FaBrain,
  "deep learning": FaBrain,
  "deeplearning": FaBrain,
  "人工知能": FaRobot,
  ai: FaRobot,
  "artificial intelligence": FaRobot,
  kaggle: SiKaggle,
  llm: FaBrain,
  "large language model": FaBrain,
  
  // バージョン管理・CI/CD
  git: SiGit,
  gitlab: SiGitlab,
  jenkins: SiJenkins,
  circleci: SiCircleci,
  "circle ci": SiCircleci,
  codepipeline: FaCodeBranch,
  "aws codepipeline": FaCodeBranch,
  codebuild: FaCodeBranch,
  "aws codebuild": FaCodeBranch,
  codedeploy: FaCodeBranch,
  "aws codedeploy": FaCodeBranch,
  argocd: FaGitAlt,
  "argo cd": FaGitAlt,
  gitops: FaGitAlt,
  "git ops": FaGitAlt,
  
  // エディタ・IDE
  vscode: VscCode,
  "visual studio code": VscCode,
  
  // オフィスツール
  "microsoft office": FaWindows,
  "office": FaWindows,
  "word": FaFileWord,
  "microsoft word": FaFileWord,
  "excel": FaFileExcel,
  "microsoft excel": FaFileExcel,
  "powerpoint": FaFilePowerpoint,
  "microsoft powerpoint": FaFilePowerpoint,
  "ppt": FaFilePowerpoint,
  "outlook": FaEnvelope,
  "microsoft outlook": FaEnvelope,
  "onenote": FaFileAlt,
  "microsoft onenote": FaFileAlt,
  
  // コミュニケーションツール
  "slack": SiSlack,
  "figma": SiFigma,
  "notion": SiNotion,
  "discord": SiDiscord,
  "zoom": SiZoom,
  "teams": FaUsers,
  "microsoft teams": FaUsers,
  
  // Webサーバー
  "tomcat": FaCat,
  "apache tomcat": FaCat,
  
  // その他ツール
  webpack: SiWebpack,
  vagrant: SiVagrant,
  graphql: SiGraphql,
  "apollo client": FaLink,
  apolloclient: FaLink,
  "apollo-client": FaLink,
  zustand: FaDatabase,
  zod: FaShieldAlt,
  elastic: SiElastic,
  elasticsearch: SiElasticsearch,
  kibana: SiKibana,
  fluentd: SiFluentd,
  "fluentbit": SiFluentd,
  "fluent-bit": SiFluentd,
  prometheus: SiPrometheus,
  grafana: SiGrafana,
  octopus: SiOctopusdeploy,
  "cloud 66": SiCloud66,
  jest: SiJest,
  playwright: FaTheaterMasks, // Playwright doesn't have a specific icon, using theater masks as an alternative
  pwa: SiPwa,
  "progressive web app": SiPwa,
  
  // 業務システム
  kintone: FaDatabase,
  "kintone plugin": FaDatabase,
  "kintoneプラグイン": FaDatabase,
  
  // プロジェクトマネジメント関連
  "プロジェクトマネジメント": FaSitemap,
  "project management": FaSitemap,
  "ウォーターフォール開発": FaProjectDiagram,
  "waterfall": FaProjectDiagram,
  "waterfall development": FaProjectDiagram,
  "アジャイル/スクラム": BsKanban,
  "アジャイル": BsKanban,
  "スクラム": BsKanban,
  "agile": BsKanban,
  "scrum": BsKanban,
  "agile/scrum": BsKanban,
  "要件定義": FaClipboardList,
  "requirements": FaClipboardList,
  "requirements definition": FaClipboardList,
  "セキュリティ管理": FaShieldAlt,
  "security management": FaShieldAlt,
  "security": FaShieldAlt,
  
  // 汎用アイコン（特定のアイコンがない場合）
  iac: FaServer,
  "infrastructure as code": FaServer,
  "ci/cd": SiGithubactions,
  cicd: SiGithubactions,
  database: FaDatabase,
  cloud: IoCloudOutline,
  sso: FaAws,  // AWS SSOのアイコン
  "single sign-on": FaAws,
  "aws cdk": FaGitAlt,
  cdk: FaGitAlt
};

interface TechStackIconProps {
  tech: string;
  className?: string;
  size?: number;
}

const TechStackIcon: React.FC<TechStackIconProps> = ({ 
  tech, 
  className = "",
  size = 20
}) => {
  // 技術名を小文字にして正規化
  const normalizedTech = tech.toLowerCase();
  
  // アイコンコンポーネントを取得
  const IconComponent = ICON_MAP[normalizedTech] || FaQuestion;
  
  return (
    <IconComponent className={className} size={size} />
  );
};

export default TechStackIcon;
