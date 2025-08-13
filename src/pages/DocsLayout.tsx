import { Outlet } from "react-router-dom";
import Navigation from "@/components/Navigation";

const DocsLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <Outlet />
      </div>
    </div>
  );
};

export default DocsLayout;