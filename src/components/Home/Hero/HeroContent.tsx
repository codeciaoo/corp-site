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
            クラウド ✖️ 生成AIで
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
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
          <div className="hidden -space-x-4 md:flex">
            {[1, 2, 3].map(i => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.3 }}
                className="h-10 w-10 rounded-full border-2 border-white bg-[#009a9a] shadow-lg dark:border-gray-900 dark:bg-teal-500 md:h-12 md:w-12"
              />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4 sm:flex sm:flex-col sm:gap-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 }}
              className="flex flex-col items-center sm:flex-row sm:items-center sm:gap-2"
            >
              <span className="bg-gradient-to-r from-[#009a9a] to-indigo-500 bg-clip-text text-xl font-bold text-transparent dark:from-teal-400 dark:to-indigo-400 md:text-2xl">
                200+
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-300 md:text-sm">
                プロジェクト実績
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55 }}
              className="flex flex-col items-center sm:flex-row sm:items-center sm:gap-2"
            >
              <span className="bg-gradient-to-r from-[#009a9a] to-indigo-500 bg-clip-text text-xl font-bold text-transparent dark:from-teal-400 dark:to-indigo-400 md:text-2xl">
                98%
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-300 md:text-sm">
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
