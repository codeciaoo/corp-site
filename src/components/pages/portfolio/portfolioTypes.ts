import type { TeamMember } from "../members/Members";

/**
 * プロジェクト実績エントリ
 */
export interface ProjectEntry {
  id: string;                   // 一意のID
  period: string;               // 期間（例："2023年11月～2024年6月"）
  projectContent: string;       // プロジェクト内容
  role: {
    position: string;           // 役職
    details: string[];          // 詳細業務内容
  };
  industry: string;             // 業界
  scale: string;                // 規模（例："開発チーム4名、全体6名"）
  technologies: string[];       // 利用技術
}

/**
 * スキルと習熟度
 */
export interface SkillWithLevel {
  name: string;             // スキル名（TechStackIcon に対応する技術名）
  level?: number;           // 習熟度（1-5）（オプション）
  years?: number;           // 経験年数（オプション）
}

/**
 * スキルカテゴリ
 */
export interface SkillCategory {
  category: string;           // スキルカテゴリ（言語、フレームワーク、ツールなど）
  skills: SkillWithLevel[];
}

/**
 * 経歴情報
 */
export interface CareerEntry {
  company: string;            // 会社・組織名
  position: string;           // 役職
  period: string;             // 期間
  description: string;        // 詳細
}

/**
 * 教育情報
 */
export interface EducationEntry {
  institution: string;        // 学校名
  degree: string;             // 学位
  period: string;             // 期間
}

/**
 * 資格情報
 */
export interface CertificationEntry {
  name: string;               // 資格名
  issuedBy: string;           // 発行組織
  year: number;               // 取得年
}

/**
 * 所属組織ロゴ
 */
export interface OrganizationLogo {
  src: string;
  alt: string;
}

/**
 * メディア掲載情報
 */
export interface MediaEntry {
  title: string;
  url: string;
  description: string;
}

/**
 * 連絡先情報
 */
export interface ContactInfo {
  email?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
}

/**
 * 拡張されたメンバーポートフォリオのインターフェース
 */
export interface MemberPortfolio extends TeamMember {
  // 基本情報の拡張
  slug: string;                 // URLスラッグ
  fullBio: string;              // 詳細な自己紹介文
  contactInfo?: ContactInfo;    // 連絡先情報（オプション）

  // スキル情報の拡張
  detailedSkills: SkillCategory[];

  // 経歴情報の拡張
  detailedCareer: CareerEntry[];

  // 教育・資格
  education: EducationEntry[];
  certifications: CertificationEntry[];
  
  // 所属組織ロゴ配列
  organizationLogos?: OrganizationLogo[];

  // プロジェクト実績（表形式データ）
  projectsTable: ProjectEntry[];

  // 自己PR
  selfPr: string;               // 自己PR文
}