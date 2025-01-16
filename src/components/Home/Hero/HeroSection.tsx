import ContactForm from "@/components/Contact/ContactForm";
import HeroContent from "./HeroContent";
import { AuroraBackground } from "@/components/ui/aurora-background";

export default function HeroSection() {
  return (
    <AuroraBackground>
      <div className="relative flex flex-col items-center justify-center px-4">
        <div className="mx-auto grid max-w-7xl items-center gap-8 py-8 md:py-12 lg:grid-cols-12 lg:gap-12 lg:py-16">
          <div className="md:space-y-8 lg:col-span-7">
            <HeroContent />
          </div>
          <div className="hidden lg:col-span-5 lg:block">
            <ContactForm />
          </div>
        </div>
      </div>
    </AuroraBackground>
  );
}
