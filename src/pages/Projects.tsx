import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ExternalLink } from "lucide-react";
import { ReviewForm } from "@/components/ReviewForm";
import { useToast } from "@/hooks/use-toast";

interface Project {
  id: string;
  name: string;
  description: string;
  url: string;
  image_url: string;
  created_at: string;
}

interface Review {
  id: string;
  project_id: string;
  user_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: projects, isLoading: projectsLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Project[];
    }
  });

  const { data: reviews } = useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Review[];
    }
  });

  const getProjectReviews = (projectId: string) => {
    return reviews?.filter(review => review.project_id === projectId) || [];
  };

  const getAverageRating = (projectId: string) => {
    const projectReviews = getProjectReviews(projectId);
    if (projectReviews.length === 0) return 0;
    const sum = projectReviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / projectReviews.length;
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) ? 'fill-primary text-primary' : 'text-muted-foreground'
        }`}
      />
    ));
  };

  const handleReviewSubmit = () => {
    queryClient.invalidateQueries({ queryKey: ['reviews'] });
    setSelectedProject(null);
    toast({
      title: "Review submitted",
      description: "Thank you for your feedback!",
    });
  };

  if (projectsLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading projects...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Projects Built with Nuvex
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover amazing decentralized applications powered by Nuvex technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects?.map((project) => {
            const projectReviews = getProjectReviews(project.id);
            const averageRating = getAverageRating(project.id);
            
            return (
              <Card key={project.id} className="overflow-hidden hover:shadow-elegant transition-all duration-300">
                <div className="aspect-video bg-muted overflow-hidden">
                  <img
                    src={project.image_url}
                    alt={project.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{project.name}</CardTitle>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-glow transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      {renderStars(averageRating)}
                      <span className="text-sm text-muted-foreground">
                        ({projectReviews.length} review{projectReviews.length !== 1 ? 's' : ''})
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedProject(project.id)}
                    >
                      Write Review
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {projectReviews.slice(0, 2).map((review) => (
                      <div key={review.id} className="p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm">{review.user_name}</span>
                          <div className="flex items-center">
                            {renderStars(review.rating)}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {review.comment}
                        </p>
                      </div>
                    ))}
                    
                    {projectReviews.length > 2 && (
                      <p className="text-sm text-muted-foreground text-center">
                        +{projectReviews.length - 2} more review{projectReviews.length - 2 !== 1 ? 's' : ''}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {selectedProject && (
        <ReviewForm
          projectId={selectedProject}
          onClose={() => setSelectedProject(null)}
          onSubmit={handleReviewSubmit}
        />
      )}
    </div>
  );
};

export default Projects;