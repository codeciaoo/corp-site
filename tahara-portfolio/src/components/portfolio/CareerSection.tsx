import React from "react";
import type { CareerEntry, EducationEntry, CertificationEntry, OrganizationLogo } from "@/lib/types";

interface CareerSectionProps {
  career: CareerEntry[];
  education: EducationEntry[];
  certifications: CertificationEntry[];
  organizationLogos?: OrganizationLogo[];
}

const CareerSection: React.FC<CareerSectionProps> = ({
  career,
  education,
  certifications,
  organizationLogos,
}) => {
  return (
    <div className="mb-12">
      <h3 className="mb-6 text-2xl font-semibold text-gray-800">経歴</h3>
      
      {/* 職歴 */}
      <div className="mb-8 rounded-lg border bg-white p-6 shadow-sm">
        <h4 className="mb-4 text-lg font-medium text-blue-700">職歴</h4>
        <div className="relative border-l-2 border-blue-200 pl-6">
          {career.map((entry, index) => (
            <div key={index} className="mb-6 relative">
              <div className="absolute -left-[29px] h-4 w-4 rounded-full border-2 border-blue-400 bg-white"></div>
              <div className="mb-1 flex flex-col sm:flex-row sm:items-center">
                <h5 className="mr-3 font-semibold text-gray-800">{entry.company}</h5>
                <span className="text-sm text-gray-500">{entry.period}</span>
              </div>
              <p className="mb-1 text-sm font-medium text-blue-600">{entry.position}</p>
              <p className="text-sm text-gray-600">{entry.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* 資格 */}
      <div className="mb-8 rounded-lg border bg-white p-6 shadow-sm">
        <h4 className="mb-4 text-lg font-medium text-blue-700">保有資格</h4>
        <ul className="list-inside list-disc space-y-2">
          {certifications.map((cert, index) => (
            <li key={index} className="text-gray-700">
              <span className="font-medium">{cert.name}</span> - {cert.issuedBy} ({cert.year}年)
            </li>
          ))}
        </ul>
      </div>
      
      {/* 学歴 */}
      <div className="mb-8 rounded-lg border bg-white p-6 shadow-sm">
        <h4 className="mb-4 text-lg font-medium text-blue-700">学歴</h4>
        <div className="relative border-l-2 border-blue-200 pl-6">
          {education.map((edu, index) => (
            <div key={index} className="mb-6 relative">
              <div className="absolute -left-[29px] h-4 w-4 rounded-full border-2 border-blue-400 bg-white"></div>
              <div className="mb-1 flex flex-col sm:flex-row sm:items-center">
                <h5 className="mr-3 font-semibold text-gray-800">{edu.institution}</h5>
                <span className="text-sm text-gray-500">{edu.period}</span>
              </div>
              <p className="text-sm text-gray-600">{edu.degree}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* 所属組織ロゴ */}
      {organizationLogos && organizationLogos.length > 0 && (
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h4 className="mb-4 text-lg font-medium text-blue-700">所属組織</h4>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {organizationLogos.map((logo, index) => (
              <div key={index} className="max-w-[120px]">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-auto max-h-16 w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerSection;