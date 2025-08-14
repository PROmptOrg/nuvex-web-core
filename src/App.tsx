import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import NotFound from "./pages/NotFound";
import DocsLayout from "./pages/DocsLayout";
import CliDocs from "./pages/CliDocs";
import AgentApiDocs from "./pages/AgentApiDocs";
import RegistryApiDocs from "./pages/RegistryApiDocs";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/docs" element={<DocsLayout />}>
          <Route path="cli" element={<CliDocs />} />
          <Route path="agent-api" element={<AgentApiDocs />} />
          <Route path="registry-api" element={<RegistryApiDocs />} />
        </Route>
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;