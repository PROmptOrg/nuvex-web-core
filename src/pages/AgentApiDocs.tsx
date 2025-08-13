const AgentApiDocs = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-primary">Agent API Documentation</h1>
      
      <div className="prose prose-invert max-w-none">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">Overview</h2>
        <p className="text-muted-foreground mb-6">
          The Nuvex Agent API provides programmatic access to manage and interact with Nuvex agents 
          in your decentralized network. Agents are responsible for executing tasks, managing resources, 
          and maintaining network connectivity.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-foreground">Authentication</h2>
        <p className="text-muted-foreground mb-4">
          All API requests require authentication using API keys or JWT tokens:
        </p>
        
        <div className="bg-muted rounded-lg p-4 mb-6">
          <code className="text-sm">
            # Using API Key<br/>
            curl -H "Authorization: Bearer YOUR_API_KEY" \<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;https://api.nuvex.dev/v1/agents
          </code>
        </div>

        <h2 className="text-2xl font-semibold mb-4 text-foreground">Endpoints</h2>
        
        <h3 className="text-xl font-medium mb-3 text-foreground">GET /v1/agents</h3>
        <p className="text-muted-foreground mb-4">
          Retrieve a list of all agents in your network.
        </p>
        
        <div className="bg-muted rounded-lg p-4 mb-6">
          <code className="text-sm">
            &#123;<br/>
            &nbsp;&nbsp;"agents": [<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&#123;<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id": "agent-001",<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"status": "active",<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"location": "us-east-1",<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"load": 0.45<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br/>
            &nbsp;&nbsp;]<br/>
            &#125;
          </code>
        </div>

        <h3 className="text-xl font-medium mb-3 text-foreground">POST /v1/agents</h3>
        <p className="text-muted-foreground mb-4">
          Create a new agent in the network.
        </p>
        
        <div className="bg-muted rounded-lg p-4 mb-6">
          <code className="text-sm">
            &#123;<br/>
            &nbsp;&nbsp;"name": "my-agent",<br/>
            &nbsp;&nbsp;"location": "eu-west-1",<br/>
            &nbsp;&nbsp;"config": &#123;<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;"cpu_limit": "2",<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;"memory_limit": "4GB"<br/>
            &nbsp;&nbsp;&#125;<br/>
            &#125;
          </code>
        </div>

        <h3 className="text-xl font-medium mb-3 text-foreground">GET /v1/agents/&#123;id&#125;</h3>
        <p className="text-muted-foreground mb-4">
          Get detailed information about a specific agent.
        </p>

        <h3 className="text-xl font-medium mb-3 text-foreground">PUT /v1/agents/&#123;id&#125;</h3>
        <p className="text-muted-foreground mb-4">
          Update agent configuration and settings.
        </p>

        <h3 className="text-xl font-medium mb-3 text-foreground">DELETE /v1/agents/&#123;id&#125;</h3>
        <p className="text-muted-foreground mb-4">
          Remove an agent from the network.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-foreground">Error Handling</h2>
        <p className="text-muted-foreground mb-4">
          The API uses standard HTTP status codes and returns error details in JSON format:
        </p>
        
        <div className="bg-muted rounded-lg p-4 mb-6">
          <code className="text-sm">
            &#123;<br/>
            &nbsp;&nbsp;"error": &#123;<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;"code": "AGENT_NOT_FOUND",<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;"message": "Agent with ID 'agent-001' not found",<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;"details": &#123;&#125;<br/>
            &nbsp;&nbsp;&#125;<br/>
            &#125;
          </code>
        </div>

        <h2 className="text-2xl font-semibold mb-4 text-foreground">Rate Limiting</h2>
        <p className="text-muted-foreground mb-4">
          API requests are rate limited to 1000 requests per hour per API key. 
          Rate limit information is included in response headers.
        </p>
      </div>
    </div>
  );
};

export default AgentApiDocs;