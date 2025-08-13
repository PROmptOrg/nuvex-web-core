import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeatureSection from "@/components/FeatureSection";
import NetworkMap from "@/components/NetworkMap";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <NetworkMap />
      <FeatureSection />
    </div>
  );
};

export default Index;
