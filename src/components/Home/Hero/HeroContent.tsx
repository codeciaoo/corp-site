import { motion } from "framer-motion";
import { Button } from "../../ui/button";
import { BarChartIcon, Users2Icon } from "lucide-react";

export default function HeroContent() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div
          className="relative max-w-3xl text-center text-3xl font-black tracking-tight dark:text-white sm:text-5xl lg:text-left xl:text-6xl"
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
            クラウドネイティブ開発で
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
            className="block bg-gradient-to-r from-[#009a9a] via-indigo-500 to-sky-500 bg-clip-text leading-snug text-transparent dark:from-teal-400 dark:via-indigo-400 dark:to-sky-400"
          >
            事業成長を加速する
          </motion.div>
        </div>

        <p className="max-w-2xl text-base text-gray-500 dark:text-gray-300 md:text-xl">
          企画から実装/運用まで一気通貫でサポート。スケーラブルでセキュアなWebシステム構築に必要なノウハウやエンジニア人員が不足しているクライアント様の課題を解決します。
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button
          size="lg"
          variant="default"
          className="inline-flex items-center justify-center bg-teal-600 px-4 py-4 text-base text-white transition-colors duration-200 hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 active:bg-teal-800 dark:bg-teal-500 dark:hover:bg-teal-600 dark:focus:ring-teal-400 dark:active:bg-teal-700 md:px-8 md:py-6 md:text-lg"
          aria-label="メンバー紹介を見る"
        >
          <Users2Icon
            className="mr-1 h-5 w-5 md:h-6 md:w-6"
            aria-hidden="true"
          />
          メンバー紹介
        </Button>

        <Button
          size="lg"
          variant="outline"
          className="inline-flex w-full items-center justify-center border-teal-600 px-4 py-4 text-base text-teal-600 transition-colors duration-200 hover:bg-teal-50 hover:text-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 active:bg-teal-100 dark:border-teal-400 dark:text-teal-400 dark:hover:bg-teal-900/30 dark:hover:text-teal-300 dark:focus:ring-teal-400 dark:active:bg-teal-900/50 sm:w-auto md:px-8 md:py-6 md:text-lg"
          aria-label="実績を見る"
        >
          <BarChartIcon
            className="mr-1 h-5 w-5 md:h-6 md:w-6"
            aria-hidden="true"
          />
          実績を見る
        </Button>
      </div>

      {/* Stats section - Made responsive with dark mode */}
      <div className="border-t border-[#009a9a]/20 pt-6 dark:border-teal-500/20 md:pt-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
          <div className="flex -space-x-4">
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
          <div className="space-y-2 sm:space-y-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 }}
              className="flex items-center gap-2"
            >
              <span className="bg-gradient-to-r from-[#009a9a] to-indigo-500 bg-clip-text text-xl font-bold text-transparent dark:from-teal-400 dark:to-indigo-400 md:text-2xl">
                200+
              </span>
              <span className="text-muted-foreground text-xs dark:text-gray-300 md:text-sm">
                プロジェクト実績
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55 }}
              className="flex items-center gap-2"
            >
              <span className="bg-gradient-to-r from-[#009a9a] to-indigo-500 bg-clip-text text-xl font-bold text-transparent dark:from-teal-400 dark:to-indigo-400 md:text-2xl">
                98%
              </span>
              <span className="text-muted-foreground text-xs dark:text-gray-300 md:text-sm">
                顧客満足度
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
