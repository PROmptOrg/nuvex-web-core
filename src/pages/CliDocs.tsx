const CliDocs = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-primary">CLI Documentation</h1>
      
      <div className="prose prose-invert max-w-none">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">Installation</h2>
        <p className="text-muted-foreground mb-6">
          Install the Nuvex CLI using your preferred package manager or download from our releases page.
        </p>
        
        <div className="bg-muted rounded-lg p-4 mb-6">
          <code className="text-sm">
            # Install via npm<br/>
            npm install -g @nuvex/cli<br/><br/>
            # Or install via curl<br/>
            curl -fsSL https://install.nuvex.dev | bash
          </code>
        </div>

        <h2 className="text-2xl font-semibold mb-4 text-foreground">Quick Start</h2>
        <p className="text-muted-foreground mb-4">
          Get started with Nuvex in minutes:
        </p>
        
        <div className="bg-muted rounded-lg p-4 mb-6">
          <code className="text-sm">
            # Initialize a new Nuvex project<br/>
            nuvex init my-app<br/><br/>
            # Navigate to project directory<br/>
            cd my-app<br/><br/>
            # Start development server<br/>
            nuvex dev
          </code>
        </div>

        <h2 className="text-2xl font-semibold mb-4 text-foreground">Commands</h2>
        
        <h3 className="text-xl font-medium mb-3 text-foreground">nuvex init [name]</h3>
        <p className="text-muted-foreground mb-4">
          Initialize a new Nuvex project with the specified name.
        </p>
        
        <h3 className="text-xl font-medium mb-3 text-foreground">nuvex dev</h3>
        <p className="text-muted-foreground mb-4">
          Start the development server with hot reloading enabled.
        </p>
        
        <h3 className="text-xl font-medium mb-3 text-foreground">nuvex build</h3>
        <p className="text-muted-foreground mb-4">
          Build your application for production deployment.
        </p>
        
        <h3 className="text-xl font-medium mb-3 text-foreground">nuvex deploy</h3>
        <p className="text-muted-foreground mb-4">
          Deploy your application to the Nuvex network.
        </p>
        
        <div className="bg-muted rounded-lg p-4 mb-6">
          <code className="text-sm">
            # Deploy with custom configuration<br/>
            nuvex deploy --config production.json<br/><br/>
            # Deploy to specific network<br/>
            nuvex deploy --network mainnet
          </code>
        </div>

        <h2 className="text-2xl font-semibold mb-4 text-foreground">Configuration</h2>
        <p className="text-muted-foreground mb-4">
          Nuvex projects are configured using a <code className="bg-secondary px-1 rounded">nuvex.config.js</code> file:
        </p>
        
        <div className="bg-muted rounded-lg p-4 mb-6">
          <code className="text-sm">
            export default &#123;<br/>
            &nbsp;&nbsp;network: &#123;<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;nodes: ['node1.nuvex.dev', 'node2.nuvex.dev'],<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;redundancy: 3<br/>
            &nbsp;&nbsp;&#125;,<br/>
            &nbsp;&nbsp;build: &#123;<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;output: 'dist',<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;optimize: true<br/>
            &nbsp;&nbsp;&#125;<br/>
            &#125;
          </code>
        </div>
      </div>
    </div>
  );
};

export default CliDocs;