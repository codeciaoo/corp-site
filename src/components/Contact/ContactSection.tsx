import ContactForm from "@/components/Contact/ContactForm";
import { motion } from "framer-motion";

export default function ContactSection() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold tracking-tight text-teal-800 sm:text-4xl">
            お問い合わせ
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600">
            開発に関するご相談、お見積もり、その他のお問い合わせはこちらからお願いいたします。
          </p>
        </motion.div>

        <motion.div
          className="mx-auto max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ContactForm home={false} />
        </motion.div>
      </div>
    </div>
  );
}
