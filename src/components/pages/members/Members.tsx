import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { membersContent } from "./membersContent";

// Types
interface MediaItem {
  title: string;
  url: string;
  description: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  career: string[];
  skills: string[];
  projects: string[];
  media: MediaItem[];
}

interface SectionTitleProps {
  children: React.ReactNode;
}

interface SkillProps {
  children: string;
}

// Components
const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => (
  <h3 className="mb-3 flex items-center gap-2 text-sm font-medium text-teal-700">
    <div className="h-px w-4 bg-teal-200"></div>
    {children}
  </h3>
);

const Skill: React.FC<SkillProps> = ({ children }) => (
  <span className="inline-flex items-center rounded-full bg-gray-600/5 px-2.5 py-0.5 text-xs font-medium text-gray-700 ring-1 ring-inset ring-teal-600/10">
    {children}
  </span>
);

interface MemberCardProps {
  member: TeamMember;
  // isSelected: boolean;
  // onClick: () => void;
}

const MemberCard: React.FC<MemberCardProps> = ({
  member,
  // isSelected,
  // onClick,
}) => {
  return (
    <div
      // initial={{ opacity: 0, y: 20 }}
      // animate={{ opacity: 1, y: 0 }}
      className={
        "group overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 ease-in-out hover:shadow-lg"
      }
    >
      <div className="md:flex">
        <div className="relative md:w-1/3">
          <img
            src={member.image}
            alt={member.name}
            width={300}
            height={300}
            className="aspect-[4/3] h-auto w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.02] md:h-[280px] md:w-[300px]"
          />
        </div>
        <div className="flex-1 space-y-6 p-6 md:p-8">
          <div className="space-y-2">
            <span className="inline-flex items-center rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-medium text-teal-700">
              {member.role}
            </span>
            <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
              {member.name}
            </h2>
          </div>

          <div className="space-y-6">
            {member.career.length > 0 && (
              <div>
                <SectionTitle>経歴</SectionTitle>
                <ul className="ml-4 list-disc space-y-1 text-sm text-gray-600">
                  {member.career.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {member.skills.length > 0 && (
              <div>
                <SectionTitle>得意分野</SectionTitle>
                <div className="flex flex-wrap gap-2">
                  {member.skills.map((skill, i) => (
                    <Skill key={i}>{skill}</Skill>
                  ))}
                </div>
              </div>
            )}

            {member.projects.length > 0 && (
              <div>
                <SectionTitle>最近のプロジェクト</SectionTitle>
                <ul className="ml-4 list-disc space-y-1 text-sm text-gray-600">
                  {member.projects.map((project, i) => (
                    <li key={i}>{project}</li>
                  ))}
                </ul>
              </div>
            )}

            {member.media.length > 0 && (
              <div>
                <SectionTitle>メディア出演</SectionTitle>
                <div className="space-y-3 rounded-xl bg-gray-50 p-4 text-sm text-gray-600">
                  {member.media.map((item, i) => (
                    <div key={i} className="space-y-1">
                      <p className="font-medium text-gray-900">{item.title}</p>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center text-teal-600 hover:text-teal-800"
                      >
                        {item.description}
                        <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Members: React.FC = () => {
  // const [selectedMember, setSelectedMember] = useState<number | null>(null);

  return (
    <div className="min-h-screen text-gray-800">
      <header className="relative mx-auto max-w-5xl px-4 pb-8 pt-24 sm:px-6 lg:px-8">
        <h1 className="text-center text-3xl font-bold tracking-tight text-teal-800 sm:text-4xl">
          主要メンバーの紹介
        </h1>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {membersContent.map((member, index) => (
            <MemberCard
              key={index}
              member={member}
              // isSelected={selectedMember === index}
              // onClick={() => setSelectedMember(index)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Members;
