import { FAQs } from "./FAQs";
import { FeaturesSection } from "./FeaturesSection";
import { HeroSection } from "./HeroSection";
import { ReferralProgram } from "./ReferralProgram";

export const LandingPage = () => {
  return (
    <div className="w-full h-full">
      <HeroSection />
      <FeaturesSection />
      <ReferralProgram />
      <FAQs />
    </div>
  );
};
