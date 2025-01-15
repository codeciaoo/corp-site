import ContactForm from "@/components/Contact/ContactForm";
import HeroContent from "./HeroContent";

export default function HeroSection() {
  return (
    <div className="flex items-center bg-gradient-to-br from-teal-200/10 to-teal-100/30">
      <div className="mx-auto grid max-w-7xl items-center gap-8 py-8 md:py-12 lg:grid-cols-12 lg:gap-12 lg:py-16">
        <HeroContent />
        <ContactForm />
      </div>
    </div>
  );
}
