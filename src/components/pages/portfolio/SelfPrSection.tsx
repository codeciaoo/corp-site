import React from "react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { MessageSquareQuote } from "lucide-react";

export interface SelfPrSectionProps {
  /**
   * 自己PR文
   */
  content: string;
}

/**
 * 自己PRセクションコンポーネント
 */
const SelfPrSection: React.FC<SelfPrSectionProps> = ({ content }) => {
  return (
    <section className="mb-12">
      <h2 className="mb-6 text-2xl font-bold text-gray-900">自己PR</h2>
      
      <ScrollReveal animation="fade">
        <div className="relative rounded-xl bg-gradient-to-br from-teal-50 to-blue-50 p-6 shadow-sm">
          <div className="absolute -left-2 -top-2 text-teal-300">
            <MessageSquareQuote className="h-8 w-8" />
          </div>
          
          <div className="mt-4 space-y-3 pl-2 text-gray-700">
            {content.split('\n').map((paragraph, index) => (
              <p key={index} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
          
          <div className="absolute -bottom-2 -right-2 rotate-180 text-blue-300">
            <MessageSquareQuote className="h-8 w-8" />
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default SelfPrSection;