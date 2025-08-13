import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Github, Terminal } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="py-20 bg-hero-gradient relative overflow-hidden">
      <div className="absolute inset-0 bg-background/90" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Nuvex
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Next-generation technology for decentralizing web applications. 
            Build, deploy, and scale distributed applications with ease.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card className="p-6 border-border bg-card/50 backdrop-blur-sm hover:shadow-elegant transition-all duration-300">
              <Github className="w-8 h-8 text-primary mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">Source Code</h3>
              <p className="text-muted-foreground mb-4 text-sm">
                Explore the open-source codebase and contribute to the project
              </p>
              <Button variant="outline" className="w-full" asChild>
                <a 
                  href="https://github.com/nuvex-project/nuvex" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  View on GitHub
                </a>
              </Button>
            </Card>

            <Card className="p-6 border-border bg-card/50 backdrop-blur-sm hover:shadow-elegant transition-all duration-300">
              <Download className="w-8 h-8 text-primary mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">Windows Installer</h3>
              <p className="text-muted-foreground mb-4 text-sm">
                Download the latest Windows installer for easy setup
              </p>
              <Button className="w-full" asChild>
                <a 
                  href="https://github.com/nuvex-project/nuvex/releases/latest/download/nuvex-windows-installer.exe"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download for Windows
                </a>
              </Button>
            </Card>

            <Card className="p-6 border-border bg-card/50 backdrop-blur-sm hover:shadow-elegant transition-all duration-300">
              <Terminal className="w-8 h-8 text-primary mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">Debian/Ubuntu</h3>
              <p className="text-muted-foreground mb-4 text-sm">
                Quick installation script for Debian-based systems
              </p>
              <div className="bg-muted rounded p-3 mb-4">
                <code className="text-sm text-muted-foreground">
                  curl -fsSL https://install.nuvex.dev | bash
                </code>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;