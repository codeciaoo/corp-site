import React, { useRef } from "react";
import {
  Zap,
  Lightbulb,
  Target,
  CheckCircle2,
  Rocket,
  Shield,
  Coins,
} from "lucide-react";
import { motion, useInView } from "framer-motion";

const ServiceComparisonTable = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const plans = [
    {
      title: "最速確実納品プラン",
      subtitle: "期限内の確実な納品をお約束",
      icon: <Zap className="h-12 w-12" />,
      color: "text-sky-600",
      bgColor: "bg-sky-50",
      borderColor: "border-sky-200",
      highlightColor: "bg-sky-100",
      gradientFrom: "from-sky-400",
      gradientTo: "to-sky-600",
      sections: [
        {
          title: "このようなニーズにお応えします",
          icon: <Target className="h-6 w-6" />,
          points: [
            {
              title: "要件が明確で確実な納品が必要",
              description:
                "仕様が固まっており、期日までの納品が求められるプロジェクトに最適です。計画通りの遂行をお約束します。",
            },
            {
              title: "予算の超過は避けたい",
              description:
                "事前に確定した要件に基づき、予算内での確実な開発完了をお約束します。",
            },
          ],
        },
        {
          title: "契約形態とメリット",
          icon: <Shield className="h-6 w-6" />,
          points: [
            {
              title: "成果物単位の一括請負契約",
              description:
                "明確な成果物と納期を定め、確実な完遂をお約束。追加要件は別途見積りで柔軟に対応します。",
            },
            {
              title: "徹底した品質管理体制",
              description:
                "専任の品質管理チームによる検証で、安心して運用できるシステムを提供します。",
            },
          ],
        },
      ],
    },
    {
      title: "デジタル共創ラボプラン",
      subtitle: "事業成長の技術パートナー",
      icon: <Lightbulb className="h-12 w-12" />,
      color: "text-teal-600",
      bgColor: "bg-teal-50",
      borderColor: "border-teal-200",
      highlightColor: "bg-teal-100",
      gradientFrom: "from-teal-400",
      gradientTo: "to-teal-600",
      sections: [
        {
          title: "このようなニーズにお応えします",
          icon: <Rocket className="h-6 w-6" />,
          points: [
            {
              title: "アジャイルな開発で事業を推進",
              description:
                "要件が流動的で、市場の反応を見ながら柔軟に改善を重ねていきたいプロジェクトに最適です。",
            },
            {
              title: "新規事業・サービスの立ち上げ",
              description:
                "技術選定から開発、運用まで、事業の成長に合わせて柔軟にサポートします。",
            },
          ],
        },
        {
          title: "契約形態とメリット",
          icon: <Coins className="h-6 w-6" />,
          points: [
            {
              title: "3ヶ月〜の継続的パートナーシップ",
              description:
                "準委任契約で柔軟な開発体制を構築。事業の成長に合わせて継続的に改善を進めます。",
            },
            {
              title: "技術ナレッジの蓄積",
              description:
                "お客様の開発チームと協働し、技術ナレッジを社内に蓄積していきます。",
            },
          ],
        },
      ],
    },
  ];

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <div className="py-20 md:py-24" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-center text-3xl font-bold bg-gradient-to-r from-teal-700 to-teal-500 bg-clip-text text-transparent sm:text-4xl">
            ご支援イメージ
          </h2>
          <p className="text-base md:text-lg text-gray-600">
            ご要望に合わせて最適なプランを提案します
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeInUpVariants}
              className={`rounded-2xl border ${plan.borderColor} shadow-lg overflow-hidden`}
            >
              {/* ヘッダー部分 */}
              <div className={`${plan.bgColor} px-6 py-8`}>
                <div className="flex items-center space-x-4">
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 500 }}
                    className={`flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-r ${plan.gradientFrom} ${plan.gradientTo} p-3 text-white shadow-md`}
                  >
                    {React.cloneElement(plan.icon, {
                      className: "h-10 w-10",
                    })}
                  </motion.div>
                  <div>
                    <h3 className="mb-1 text-2xl font-bold text-gray-900">
                      {plan.title}
                    </h3>
                    <p className={`font-medium ${plan.color}`}>
                      {plan.subtitle}
                    </p>
                  </div>
                </div>
              </div>

              {/* メインコンテンツ */}
              <div className="p-6 bg-white">
                {plan.sections.map((section, sIdx) => (
                  <div
                    key={sIdx}
                    className="mb-8 last:mb-0"
                  >
                    <div className="mb-4 flex items-center space-x-3">
                      <div
                        className={`rounded-lg p-2 ${plan.color} bg-opacity-10`}
                      >
                        {React.cloneElement(section.icon, {
                          className: `h-5 w-5 ${plan.color}`,
                        })}
                      </div>
                      <h4 className="text-xl font-bold text-gray-800">
                        {section.title}
                      </h4>
                    </div>

                    <div className="space-y-3">
                      {section.points.map((point, pIdx) => (
                        <motion.div
                          key={pIdx}
                          whileHover={{ 
                            backgroundColor: plan.highlightColor,
                            scale: 1.01,
                            transition: { duration: 0.2 }
                          }}
                          className="rounded-lg p-4 border border-gray-100 transition-all duration-200"
                        >
                          <div className="mb-2 flex items-start space-x-3">
                            <CheckCircle2 className={`h-5 w-5 mt-0.5 ${plan.color} flex-shrink-0`} />
                            <h5 className="text-base font-semibold text-gray-800">
                              {point.title}
                            </h5>
                          </div>
                          <p className="ml-8 text-sm leading-relaxed text-gray-600">
                            {point.description}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceComparisonTable;
