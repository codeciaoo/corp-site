import type { MemberPortfolio } from "../portfolioTypes";
import { taharaPortfolio } from "./taharaPortfolio";
import { ichinosePortfolio } from "./ichinosePortfolio";
import { akiyamaPortfolio } from "./akiyamaPortfolio";

/**
 * 全メンバーのポートフォリオデータを配列で提供
 */
export const memberPortfolios: MemberPortfolio[] = [
  taharaPortfolio,
  ichinosePortfolio,
  akiyamaPortfolio
];

/**
 * スラグからメンバーのポートフォリオデータを取得する関数
 */
export function getPortfolioBySlug(slug: string): MemberPortfolio | undefined {
  return memberPortfolios.find(member => member.slug === slug);
}

/**
 * メンバー名からメンバーのポートフォリオデータを取得する関数
 */
export function getPortfolioByName(name: string): MemberPortfolio | undefined {
  return memberPortfolios.find(member => member.name === name);
}

/**
 * 全メンバーのスラグ一覧を取得する関数
 */
export function getAllMemberSlugs(): string[] {
  return memberPortfolios.map(member => member.slug);
}

/**
 * 特定のスキルを持つメンバーを検索する関数
 */
export function findMembersBySkill(skillName: string): MemberPortfolio[] {
  return memberPortfolios.filter(member => {
    // detailedSkillsから検索
    const hasDetailedSkill = member.detailedSkills.some(category => 
      category.skills.some(skill => 
        skill.name.toLowerCase().includes(skillName.toLowerCase())
      )
    );
    
    // 基本スキルから検索
    const hasBasicSkill = member.skills.some(skill => 
      skill.toLowerCase().includes(skillName.toLowerCase())
    );
    
    return hasDetailedSkill || hasBasicSkill;
  });
}