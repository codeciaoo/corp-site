import React from "react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Github, Linkedin, Twitter } from "lucide-react";

export interface ProfileHeaderProps {
  /**
   * メンバー名
   */
  name: string;
  /**
   * 役職
   */
  role: string;
  /**
   * プロフィール画像URL
   */
  image: string;
  /**
   * 自己紹介文
   */
  bio: string;
  /**
   * 連絡先情報（オプション）
   */
  contactInfo?: {
    email?: string;
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}

/**
 * メンバープロフィールヘッダーコンポーネント
 */
const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  role,
  image,
  bio,
  contactInfo,
}) => {
  return (
    <ScrollReveal animation="fade" className="mb-12">
      <div className="overflow-hidden rounded-xl bg-gradient-to-b from-teal-50 to-white shadow-md">
        <div className="flex flex-col gap-8 p-6 md:flex-row md:items-center md:p-8">
          <div className="relative flex-shrink-0">
            <div className="relative h-48 w-48 overflow-hidden rounded-full border-4 border-white shadow-md">
              <img
                src={image}
                alt={name}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
          
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-teal-100 px-2.5 py-0.5 text-sm font-medium text-teal-800">
                  {role}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">{name}</h1>
            </div>
            
            <div className="max-w-2xl space-y-2">
              {bio.split('\n').map((paragraph, index) => (
                <p key={index} className="text-gray-600">
                  {paragraph}
                </p>
              ))}
            </div>
            
            
            {contactInfo && (
              <div className="flex gap-4 pt-2">
                {contactInfo.github && (
                  <a
                    href={contactInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-gray-600 transition-colors hover:text-teal-700"
                    aria-label="GitHub"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                )}
                
                {contactInfo.linkedin && (
                  <a
                    href={contactInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-gray-600 transition-colors hover:text-teal-700"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                )}
                
                {contactInfo.twitter && (
                  <a
                    href={contactInfo.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-gray-600 transition-colors hover:text-teal-700"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
};

export default ProfileHeader;