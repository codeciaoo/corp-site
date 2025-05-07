import React from "react";
import type { ContactInfo } from "@/lib/types";

interface ProfileHeaderProps {
  name: string;
  role: string;
  image: string;
  bio: string;
  contactInfo?: ContactInfo;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  role,
  image,
  bio,
  contactInfo,
}) => {
  // 改行を区切りとして配列に変換
  const bioLines = bio.split("\\n").join("\n").split("\n");

  return (
    <div className="mb-10 w-full">
      <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
        {/* プロフィール画像 */}
        <div className="mb-6 flex justify-center md:mb-0 md:w-1/3">
          <div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-blue-100 shadow-lg">
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* プロフィール情報 */}
        <div className="md:w-2/3">
          <h1 className="mb-2 text-3xl font-bold text-gray-800">{name}</h1>
          <h2 className="mb-4 text-xl font-medium text-blue-600">{role}</h2>
          
          <div className="mb-6 space-y-2 text-gray-700">
            {bioLines.map((line, index) => (
              <p key={index} className="text-sm leading-relaxed md:text-base">
                {line}
              </p>
            ))}
          </div>

          {/* 連絡先情報（存在する場合のみ表示） */}
          {contactInfo && Object.keys(contactInfo).length > 0 && (
            <div className="flex flex-wrap gap-3">
              {contactInfo.email && (
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 hover:bg-blue-200"
                >
                  <span className="mr-1">✉️</span>
                  {contactInfo.email}
                </a>
              )}
              {contactInfo.linkedin && (
                <a
                  href={contactInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 hover:bg-blue-200"
                >
                  <span className="mr-1">in</span>
                  LinkedIn
                </a>
              )}
              {contactInfo.github && (
                <a
                  href={contactInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 hover:bg-blue-200"
                >
                  <span className="mr-1">🐱</span>
                  GitHub
                </a>
              )}
              {contactInfo.twitter && (
                <a
                  href={contactInfo.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 hover:bg-blue-200"
                >
                  <span className="mr-1">🐦</span>
                  Twitter
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 組織ロゴ表示 */}
    </div>
  );
};

export default ProfileHeader;