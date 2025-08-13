import { useEffect, useState } from "react";

interface Node {
  id: string;
  x: number;
  y: number;
  type: 'node' | 'registry';
  pulse: boolean;
}

const NetworkMap = () => {
  const [nodes, setNodes] = useState<Node[]>([]);

  useEffect(() => {
    // Generate random nodes and registries
    const generateNodes = () => {
      const newNodes: Node[] = [];
      
      // Add some registry nodes (larger, fewer)
      for (let i = 0; i < 8; i++) {
        newNodes.push({
          id: `registry-${i}`,
          x: Math.random() * 100,
          y: Math.random() * 100,
          type: 'registry',
          pulse: Math.random() > 0.7
        });
      }
      
      // Add more regular nodes
      for (let i = 0; i < 25; i++) {
        newNodes.push({
          id: `node-${i}`,
          x: Math.random() * 100,
          y: Math.random() * 100,
          type: 'node',
          pulse: Math.random() > 0.8
        });
      }
      
      setNodes(newNodes);
    };

    generateNodes();
    
    // Update pulse states periodically
    const interval = setInterval(() => {
      setNodes(prev => prev.map(node => ({
        ...node,
        pulse: Math.random() > 0.8
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Global Network Distribution
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real-time visualization of Nuvex nodes and registries across the decentralized network
          </p>
        </div>
        
        <div className="relative">
          {/* World map silhouette */}
          <div className="relative w-full h-[500px] bg-gradient-to-br from-card/10 to-card/5 rounded-2xl border border-border/20 overflow-hidden">
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%" className="w-full h-full">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
            
            {/* World map outline */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <svg viewBox="0 0 1000 500" className="w-full h-full max-w-4xl">
                <path 
                  d="M150,200 C200,180 300,190 400,200 C500,210 600,200 700,190 C750,185 800,180 850,200 M100,250 C150,240 200,245 300,250 C400,255 500,250 600,245 C700,240 750,245 850,250 M120,300 C200,290 300,295 400,300 C500,305 600,300 700,295 C750,290 800,295 870,300"
                  stroke="currentColor" 
                  strokeWidth="2" 
                  fill="none"
                  className="text-primary/30"
                />
              </svg>
            </div>
            
            {/* Network nodes */}
            {nodes.map((node) => (
              <div
                key={node.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
                  node.type === 'registry' ? 'w-4 h-4' : 'w-2 h-2'
                }`}
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                }}
              >
                <div
                  className={`w-full h-full rounded-full relative ${
                    node.type === 'registry' 
                      ? 'bg-primary shadow-glow' 
                      : 'bg-accent'
                  } ${node.pulse ? 'animate-pulse' : ''}`}
                >
                  {/* Connection lines */}
                  {node.type === 'registry' && (
                    <>
                      <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                      <div className="absolute inset-0 rounded-full bg-primary/30 animate-pulse" 
                           style={{ animationDelay: '0.5s' }} />
                    </>
                  )}
                </div>
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-background/90 backdrop-blur-sm border border-border/50 rounded text-xs whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity z-10">
                  {node.type === 'registry' ? 'Registry Node' : 'Network Node'}
                </div>
              </div>
            ))}
            
            {/* Connecting lines animation */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                  <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                </linearGradient>
              </defs>
              
              {nodes.filter(n => n.type === 'registry').map((registry, i) => (
                <g key={`connections-${registry.id}`}>
                  {nodes.filter(n => n.type === 'node').slice(0, 3).map((node, j) => (
                    <line
                      key={`line-${i}-${j}`}
                      x1={`${registry.x}%`}
                      y1={`${registry.y}%`}
                      x2={`${node.x}%`}
                      y2={`${node.y}%`}
                      stroke="url(#lineGradient)"
                      strokeWidth="1"
                      className="animate-pulse"
                      style={{ animationDelay: `${(i + j) * 0.5}s` }}
                    />
                  ))}
                </g>
              ))}
            </svg>
          </div>
          
          {/* Stats overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex justify-between">
            <div className="bg-background/80 backdrop-blur-sm border border-border/50 rounded-lg px-4 py-2">
              <div className="text-sm text-muted-foreground">Active Nodes</div>
              <div className="text-2xl font-bold text-primary">{nodes.filter(n => n.type === 'node').length}</div>
            </div>
            <div className="bg-background/80 backdrop-blur-sm border border-border/50 rounded-lg px-4 py-2">
              <div className="text-sm text-muted-foreground">Registry Nodes</div>
              <div className="text-2xl font-bold text-primary">{nodes.filter(n => n.type === 'registry').length}</div>
            </div>
            <div className="bg-background/80 backdrop-blur-sm border border-border/50 rounded-lg px-4 py-2">
              <div className="text-sm text-muted-foreground">Network Health</div>
              <div className="text-2xl font-bold text-green-400">98.5%</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NetworkMap;