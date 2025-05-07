import React from "react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Card, CardContent } from "@/components/ui/card";
import { Building, GraduationCap, Award, Calendar } from "lucide-react";

export interface CareerItem {
  company: string;
  position: string;
  period: string;
  description: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
}

export interface CertificationItem {
  name: string;
  issuedBy: string;
  year: number;
}

export interface CareerSectionProps {
  /**
   * 職務経歴
   */
  career: CareerItem[];
  /**
   * 学歴
   */
  education: EducationItem[];
  /**
   * 資格・認定
   */
  certifications: CertificationItem[];
  /**
   * 所属組織ロゴ
   */
  organizationLogos?: { src: string; alt: string }[];
}

/**
 * 経歴アイテムコンポーネント
 */
const CareerItemComponent: React.FC<{
  item: CareerItem;
  index: number;
  organizationLogos?: { src: string; alt: string }[];
}> = ({
  item,
  index,
  organizationLogos,
}) => {
  return (
    <ScrollReveal
      animation="slide-up"
      delay={0.1 * index}
      className="mb-4 last:mb-0"
    >
      <Card className="overflow-hidden border-l-4 border-teal-400 shadow-sm">
        <CardContent className="p-0">
          <div className="flex flex-col p-4 gap-3 md:flex-row md:items-center md:p-5 md:gap-6">
            <div className="mb-3 w-full text-left md:mb-0 md:w-1/3">
              <div className="flex items-center gap-2 font-semibold text-teal-700 text-base">
                <Building className="h-5 w-5" />
                {item.position}
              </div>
              <div className="mt-3 flex items-center gap-3 text-base font-semibold text-gray-800">
                {organizationLogos && (
                  (() => {
                    const logo = organizationLogos.find(l =>
                      item.company.includes(l.alt) || l.alt.includes(item.company)
                    );
                    return logo ? (
                      <img src={logo.src} alt={logo.alt} className="h-12 w-auto max-w-[48px] object-contain mr-1" />
                    ) : null;
                  })()
                )}
                {item.company}
              </div>
              <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                <Calendar className="h-4 w-4" />
                {item.period}
              </div>
            </div>
            <div className="flex-1 text-gray-700 md:border-l md:border-gray-200 md:pl-6 md:pr-2">
              <p className="leading-relaxed text-base">{item.description}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </ScrollReveal>
  );
};

/**
 * 学歴アイテムコンポーネント
 */
const EducationItemComponent: React.FC<{
  item: EducationItem;
  index: number;
  organizationLogos?: { src: string; alt: string }[];
}> = ({
  item,
  index,
  organizationLogos,
}) => {
  return (
    <ScrollReveal
      animation="slide-up"
      delay={0.1 * index}
      className="mb-4 last:mb-0"
    >
      <Card className="border-l-4 border-blue-400 shadow-sm">
        <CardContent className="p-0">
          <div className="flex flex-col p-4 gap-3 md:flex-row md:items-center md:p-5 md:gap-6">
            <div className="mb-3 w-full md:mb-0 md:w-1/3">
            <div className="flex items-center gap-3 font-semibold text-blue-700 text-base">
              {(() => {
                const logo = organizationLogos?.find(l =>
                  item.institution.includes(l.alt) || l.alt.includes(item.institution)
                );
                return logo ? (
                  <img src={logo.src} alt={logo.alt} className="h-12 w-auto max-w-[48px] object-contain mr-1" />
                ) : (
                  <GraduationCap className="h-5 w-5" />
                );
              })()}
              {item.institution}
            </div>
              <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                <Calendar className="h-4 w-4" />
                {item.period}
              </div>
            </div>
            <div className="flex-1 text-gray-700 md:border-l md:border-gray-200 md:pl-6 md:pr-2">
              <p className="leading-relaxed text-base">{item.degree}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </ScrollReveal>
  );
};

/**
 * 資格アイテムコンポーネント
 */
const CertificationItemComponent: React.FC<{ 
  certifications: CertificationItem[]; 
}> = ({ certifications }) => {
  return (
    <ScrollReveal animation="fade" className="mt-8">
      <div className="space-y-4 rounded-xl bg-gray-50 p-6">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
          <Award className="h-5 w-5 text-purple-500" />
          資格・認定
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, index) => (
            <div 
              key={index} 
              className="rounded-lg bg-white p-3 shadow-sm ring-1 ring-gray-200"
            >
              <div className="font-medium text-gray-900">{cert.name}</div>
              <div className="mt-1 text-xs text-gray-600">
                <span>{cert.issuedBy}</span>
                <span className="ml-2 rounded-full bg-purple-100 px-2 py-0.5 text-xs text-purple-800">
                  {cert.year}年
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
};

/**
 * 経歴セクションコンポーネント
 */
const CareerSection: React.FC<CareerSectionProps> = ({
  career,
  education,
  certifications,
  organizationLogos,
}) => {
  return (
    <section className="mb-12">
      <h2 className="mb-6 text-2xl font-bold text-gray-900">経歴・資格</h2>
      
      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="border-b border-gray-200 pb-2 text-lg font-semibold text-gray-800">
            職務経歴
          </h3>
          <div className="space-y-4">
            {career.map((item, index) => (
              <CareerItemComponent
                key={index}
                item={item}
                index={index}
                organizationLogos={organizationLogos}
              />
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="border-b border-gray-200 pb-2 text-lg font-semibold text-gray-800">
            学歴
          </h3>
          <div className="space-y-4">
            {education.map((item, index) => (
              <EducationItemComponent
                key={index}
                item={item}
                index={index}
                organizationLogos={organizationLogos}
              />
            ))}
          </div>
        </div>
        
        {certifications.length > 0 && (
          <CertificationItemComponent certifications={certifications} />
        )}
      </div>
    </section>
  );
};

export default CareerSection;