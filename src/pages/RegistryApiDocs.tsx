const RegistryApiDocs = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-primary">Registry API Documentation</h1>
      
      <div className="prose prose-invert max-w-none">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">Overview</h2>
        <p className="text-muted-foreground mb-6">
          The Nuvex Registry API manages application packages, dependencies, and deployment artifacts 
          across the decentralized network. It provides secure storage and distribution of your 
          applications and their components.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-foreground">Authentication</h2>
        <p className="text-muted-foreground mb-4">
          Registry operations require authentication. Use your Nuvex credentials or API tokens:
        </p>
        
        <div className="bg-muted rounded-lg p-4 mb-6">
          <code className="text-sm">
            # Login to registry<br/>
            nuvex login<br/><br/>
            # Or use API token<br/>
            export NUVEX_TOKEN=your_token_here
          </code>
        </div>

        <h2 className="text-2xl font-semibold mb-4 text-foreground">Package Management</h2>
        
        <h3 className="text-xl font-medium mb-3 text-foreground">Publishing Packages</h3>
        <p className="text-muted-foreground mb-4">
          Publish your application to the Nuvex registry:
        </p>
        
        <div className="bg-muted rounded-lg p-4 mb-6">
          <code className="text-sm">
            # Publish current project<br/>
            nuvex publish<br/><br/>
            # Publish with specific version<br/>
            nuvex publish --version 1.2.3<br/><br/>
            # Publish with tag<br/>
            nuvex publish --tag beta
          </code>
        </div>

        <h3 className="text-xl font-medium mb-3 text-foreground">Installing Packages</h3>
        <p className="text-muted-foreground mb-4">
          Install packages from the registry:
        </p>
        
        <div className="bg-muted rounded-lg p-4 mb-6">
          <code className="text-sm">
            # Install package<br/>
            nuvex install package-name<br/><br/>
            # Install specific version<br/>
            nuvex install package-name@1.0.0<br/><br/>
            # Install from tag<br/>
            nuvex install package-name@latest
          </code>
        </div>

        <h2 className="text-2xl font-semibold mb-4 text-foreground">HTTP API Endpoints</h2>
        
        <h3 className="text-xl font-medium mb-3 text-foreground">GET /v1/packages</h3>
        <p className="text-muted-foreground mb-4">
          Search and browse available packages.
        </p>
        
        <div className="bg-muted rounded-lg p-4 mb-6">
          <code className="text-sm">
            # Search packages<br/>
            curl "https://registry.nuvex.dev/v1/packages?q=web-framework"<br/><br/>
            # List user packages<br/>
            curl "https://registry.nuvex.dev/v1/packages?owner=username"
          </code>
        </div>

        <h3 className="text-xl font-medium mb-3 text-foreground">GET /v1/packages/&#123;name&#125;</h3>
        <p className="text-muted-foreground mb-4">
          Get package metadata and version information.
        </p>
        
        <div className="bg-muted rounded-lg p-4 mb-6">
          <code className="text-sm">
            &#123;<br/>
            &nbsp;&nbsp;"name": "my-web-app",<br/>
            &nbsp;&nbsp;"version": "1.0.0",<br/>
            &nbsp;&nbsp;"description": "A decentralized web application",<br/>
            &nbsp;&nbsp;"author": "developer@example.com",<br/>
            &nbsp;&nbsp;"dependencies": &#123;<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;"nuvex-runtime": "^2.0.0"<br/>
            &nbsp;&nbsp;&#125;,<br/>
            &nbsp;&nbsp;"dist": &#123;<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;"tarball": "https://registry.nuvex.dev/packages/my-web-app-1.0.0.tgz",<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;"integrity": "sha512-..."<br/>
            &nbsp;&nbsp;&#125;<br/>
            &#125;
          </code>
        </div>

        <h3 className="text-xl font-medium mb-3 text-foreground">POST /v1/packages</h3>
        <p className="text-muted-foreground mb-4">
          Publish a new package version to the registry.
        </p>

        <h3 className="text-xl font-medium mb-3 text-foreground">DELETE /v1/packages/&#123;name&#125;/&#123;version&#125;</h3>
        <p className="text-muted-foreground mb-4">
          Unpublish a specific package version (restricted).
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-foreground">Package.json Configuration</h2>
        <p className="text-muted-foreground mb-4">
          Configure your package for Nuvex registry:
        </p>
        
        <div className="bg-muted rounded-lg p-4 mb-6">
          <code className="text-sm">
            &#123;<br/>
            &nbsp;&nbsp;"name": "@username/package-name",<br/>
            &nbsp;&nbsp;"version": "1.0.0",<br/>
            &nbsp;&nbsp;"nuvex": &#123;<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;"registry": "https://registry.nuvex.dev",<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;"runtime": "node18",<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;"network": &#123;<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"redundancy": 3,<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"regions": ["us-east-1", "eu-west-1"]<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br/>
            &nbsp;&nbsp;&#125;<br/>
            &#125;
          </code>
        </div>

        <h2 className="text-2xl font-semibold mb-4 text-foreground">Security</h2>
        <p className="text-muted-foreground mb-4">
          All packages are cryptographically signed and verified. The registry uses content-addressable 
          storage to ensure package integrity and prevent tampering.
        </p>
      </div>
    </div>
  );
};

export default RegistryApiDocs;