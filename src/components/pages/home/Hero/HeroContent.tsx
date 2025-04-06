import type { FC } from "react";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { BarChartIcon, Users2Icon, MailIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const HeroContent: FC = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div
          className="relative max-w-3xl text-center text-4xl font-black tracking-tight dark:text-white sm:text-5xl lg:text-left xl:text-6xl"
          style={{
            fontFamily: "'Noto Sans JP', sans-serif",
            fontFeatureSettings: "'palt'",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="leading-tight"
          >
            クラウド
            <span className="mx-2">×</span>
            生成AIで
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              type: "spring",
              stiffness: 100,
              damping: 20,
            }}
            className="block bg-gradient-to-r from-teal-600 via-indigo-500 to-sky-500 bg-clip-text leading-snug text-transparent dark:from-teal-400 dark:via-indigo-400 dark:to-sky-400"
          >
            <span className="inline-block">事業成長を</span>
            <span className="inline-block">加速する</span>
          </motion.div>
        </div>

        <p className="max-w-2xl text-left text-sm text-gray-500 dark:text-gray-300 md:text-lg">
          クラウドや生成AIを用いたWebシステムの開発経験や、
          技術者が不足している企業様の課題解決を、企画から開発、運用までお手伝いします
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <a
          href="/contact"
          className={cn(
            buttonVariants({ size: "lg", variant: "default" }),
            "inline-flex items-center justify-center bg-teal-600 px-4 py-4 text-base text-white hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 active:bg-teal-800 dark:bg-teal-500 dark:hover:bg-teal-600 dark:focus:ring-teal-400 dark:active:bg-teal-700 md:px-8 md:py-6 md:text-lg lg:hidden"
          )}
          aria-label="お問い合わせ"
        >
          <MailIcon className="mr-1 h-5 w-5 md:h-6 md:w-6" aria-hidden="true" />
          お問い合わせ
        </a>

        <a
          href="/members"
          className={cn(
            buttonVariants({ size: "lg", variant: "default" }),
            "hidden items-center justify-center bg-teal-600 px-4 py-4 text-base text-white hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 active:bg-teal-800 dark:bg-teal-500 dark:hover:bg-teal-600 dark:focus:ring-teal-400 dark:active:bg-teal-700 md:px-8 md:py-6 md:text-lg lg:inline-flex"
          )}
          aria-label="メンバー紹介"
        >
          <Users2Icon
            className="mr-1 h-5 w-5 md:h-6 md:w-6"
            aria-hidden="true"
          />
          メンバー紹介
        </a>

        <a
          href="/projects"
          className={cn(
            buttonVariants({ size: "lg", variant: "outline" }),
            "inline-flex w-full items-center justify-center border-teal-600 px-4 py-4 text-base text-teal-600 hover:bg-teal-50 hover:text-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 active:bg-teal-100 dark:border-teal-400 dark:text-teal-400 dark:hover:bg-teal-900 dark:hover:text-teal-300 dark:focus:ring-teal-400 dark:active:bg-teal-900 md:px-8 md:py-6 md:text-lg"
          )}
          aria-label="実績を見る"
        >
          <BarChartIcon
            className="mr-1 h-5 w-5 md:h-6 md:w-6"
            aria-hidden="true"
          />
          実績を見る
        </a>
      </div>

      <div className="border-t border-[#009a9a]/20 pt-6 dark:border-teal-500/20 md:pt-8">
        <div className="w-full overflow-hidden">
          <div className="flex flex-wrap justify-between w-full gap-y-6 md:flex-nowrap md:gap-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex flex-col items-center text-center w-1/2 md:w-1/4"
            >
              <span className="bg-gradient-to-r from-[#009a9a] to-indigo-500 bg-clip-text text-3xl font-bold text-transparent dark:from-teal-400 dark:to-indigo-400 md:text-4xl">
                50+
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-300 md:text-sm mt-1">
                プロジェクト実績
              </span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-col items-center text-center w-1/2 md:w-1/4"
            >
              <span className="bg-gradient-to-r from-[#009a9a] to-indigo-500 bg-clip-text text-3xl font-bold text-transparent dark:from-teal-400 dark:to-indigo-400 md:text-4xl">
                10+
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-300 md:text-sm mt-1">
                AI連携実績
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-col items-center text-center w-1/2 md:w-1/4"
            >
              <span className="bg-gradient-to-r from-[#009a9a] to-indigo-500 bg-clip-text text-3xl font-bold text-transparent dark:from-teal-400 dark:to-indigo-400 md:text-4xl">
                100%
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-300 md:text-sm mt-1">
                プロジェクト完遂率
              </span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-col items-center text-center w-1/2 md:w-1/4"
            >
              <span className="bg-gradient-to-r from-[#009a9a] to-indigo-500 bg-clip-text text-3xl font-bold text-transparent dark:from-teal-400 dark:to-indigo-400 md:text-4xl">
                98%
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-300 md:text-sm mt-1">
                顧客満足度
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroContent;
