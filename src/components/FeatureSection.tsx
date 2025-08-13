import { Card } from "@/components/ui/card";
import { Network, Shield, Zap, Globe } from "lucide-react";

const FeatureSection = () => {
  const features = [
    {
      icon: Network,
      title: "Decentralized Architecture",
      description: "Built on a distributed network that eliminates single points of failure and ensures high availability."
    },
    {
      icon: Shield,
      title: "Enhanced Security",
      description: "Advanced cryptographic protocols protect your applications and data from unauthorized access."
    },
    {
      icon: Zap,
      title: "High Performance",
      description: "Optimized for speed with intelligent caching and edge computing capabilities."
    },
    {
      icon: Globe,
      title: "Global Distribution",
      description: "Deploy your applications across a global network for optimal performance worldwide."
    }
  ];

  return (
    <section className="py-20 bg-section-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose Nuvex?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Nuvex provides the foundation for building truly decentralized web applications 
            with enterprise-grade reliability and performance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-elegant transition-all duration-300">
              <feature.icon className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;