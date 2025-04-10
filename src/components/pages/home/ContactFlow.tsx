import { 
  ArrowRight, 
  MessageSquare, 
  Video, 
  FileText, 
  FileSignature, 
  Rocket 
} from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    number: 1,
    title: "お問い合わせ",
    description:
      "まずはフォームよりお問い合わせください。おおむね3-5分程度で完了します。",
    icon: <MessageSquare className="h-4 w-4 md:h-5 md:w-5" />,
  },
  {
    number: 2,
    title: "無料相談",
    description:
      "オンライン会議で御社の課題を伺い、その場で改善方法をアドバイスしつつ、弊社でどのようなサービス提供が可能かをご説明します。",
    icon: <Video className="h-4 w-4 md:h-5 md:w-5" />,
  },
  {
    number: 3,
    title: "ご提案・見積もり",
    description:
      "ヒアリングから2日以内に、取り組みの具体的なご提案とお見積もりをご提示します。",
    icon: <FileText className="h-4 w-4 md:h-5 md:w-5" />,
  },
  {
    number: 4,
    title: "ご契約",
    description:
      "クラウドサイン（ご要望があれば他のツールや紙も可）にて契約を締結します。契約は最短で即日での対応が可能です。",
    icon: <FileSignature className="h-4 w-4 md:h-5 md:w-5" />,
  },
  {
    number: 5,
    title: "取り組み開始",
    description:
      "成果改善に向けて取り組みを開始します。お急ぎの場合は、お問い合わせから1週間でのスタートも可能です。",
    icon: <Rocket className="h-4 w-4 md:h-5 md:w-5" />,
  },
];

function StepCard({
  number,
  title,
  description,
  icon,
  showArrow,
  index,
}: {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  showArrow: boolean;
  index: number;
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl"
    >
      <div className="absolute -left-3 -top-3 flex h-12 w-12 items-center justify-center rounded-full bg-teal-600 text-xl font-bold text-white shadow-md transition-all duration-300 group-hover:scale-110">
        {number}
      </div>
      
      <div className="pt-4">
        <div className="flex items-start gap-3 min-h-[56px]">
          <div className="mt-1 flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-teal-100 text-teal-600">
            {icon}
          </div>
          <h3 className="text-lg font-bold text-teal-900">{title}</h3>
        </div>
        
        <div className="mt-4 text-sm leading-relaxed text-gray-600">
          {description}
        </div>
      </div>
      
      {showArrow && (
        <>
          {/* Desktop Arrow */}
          <div className="absolute -right-8 top-1/2 hidden -translate-y-1/2 md:block">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-100 text-teal-600 transition-all duration-300 group-hover:bg-teal-600 group-hover:text-white"
            >
              <ArrowRight className="h-4 w-4" />
            </motion.div>
          </div>
          {/* Mobile Arrow */}
          <div className="absolute -bottom-8 left-1/2 block -translate-x-1/2 md:hidden">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-100 text-teal-600 transition-all duration-300 group-hover:bg-teal-600 group-hover:text-white"
            >
              <ArrowRight className="h-4 w-4 rotate-90" />
            </motion.div>
          </div>
        </>
      )}
    </motion.div>
  );
}

export default function ContactFlow() {
  return (
    <div className="py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-center text-3xl font-bold bg-gradient-to-r from-teal-700 to-teal-500 bg-clip-text text-transparent sm:text-4xl">
            お問い合わせから<br className="md:hidden" />開始までの流れ
          </h2>
          <p className="mx-auto max-w-2xl text-base text-gray-600">
            シンプルで明確なプロセスで、お客様のビジネス課題解決をサポートします
          </p>
        </motion.div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-5">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              {...step}
              showArrow={index < steps.length - 1}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
