import ContactForm from "@/components/Contact/ContactForm";

export default function ContactSection() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-200/10 to-teal-100/30">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-gray-800 sm:text-3xl lg:text-4xl">
            お問い合わせ
          </h1>
          <p className="text-muted-foreground mx-auto mt-4 max-w-3xl text-lg">
            開発に関するご相談、お見積もり、その他のお問い合わせはこちらからお願いいたします。
          </p>
        </div>

        <div className="mx-auto max-w-2xl">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
