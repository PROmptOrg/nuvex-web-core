import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ExternalLink, ArrowLeft } from "lucide-react";
import ReviewForm from "@/components/ReviewForm";
import Navigation from "@/components/Navigation";

interface Project {
  id: string;
  name: string;
  description: string;
  image_url: string;
  url: string;
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
  const [projects, setProjects] = useState<Project[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
    fetchReviews();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching projects:", error);
    } else {
      setProjects(data || []);
    }
    setLoading(false);
  };

  const fetchReviews = async () => {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching reviews:", error);
    } else {
      setReviews(data || []);
    }
  };

  const getProjectReviews = (projectId: string) => {
    return reviews.filter((review) => review.project_id === projectId);
  };

  const getAverageRating = (projectId: string) => {
    const projectReviews = getProjectReviews(projectId);
    if (projectReviews.length === 0) return "0";
    
    const sum = projectReviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / projectReviews.length).toFixed(1);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  const handleReviewSubmitted = () => {
    fetchReviews();
    setSelectedProjectId(null);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading projects...</div>
      </div>
    );
  }

  return (
    <>
      <Navigation />
      <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Projects Built with Nuvex
        </h1>
        <p className="text-lg text-muted-foreground">
          Discover amazing applications created using the Nuvex platform
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => {
          const projectReviews = getProjectReviews(project.id);
          const averageRating = getAverageRating(project.id);

          return (
            <Card key={project.id} className="overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src={project.image_url}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{project.name}</CardTitle>
                  {project.url && (
                    <Button variant="ghost" size="sm" asChild>
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                </div>
                <CardDescription>{project.description}</CardDescription>
                
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {renderStars(Math.round(parseFloat(averageRating)))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {averageRating} ({projectReviews.length} reviews)
                  </span>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {projectReviews.slice(0, 2).map((review) => (
                    <div key={review.id} className="border-l-2 border-border pl-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-sm">{review.user_name}</span>
                        <div className="flex items-center">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      {review.comment && (
                        <p className="text-sm text-muted-foreground">{review.comment}</p>
                      )}
                    </div>
                  ))}
                  
                  {projectReviews.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{projectReviews.length - 2} more reviews
                    </Badge>
                  )}

                  <Button
                    onClick={() => setSelectedProjectId(project.id)}
                    variant="outline"
                    size="sm"
                    className="w-full mt-4"
                  >
                    Leave a Review
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {selectedProjectId && (
        <ReviewForm
          projectId={selectedProjectId}
          onClose={() => setSelectedProjectId(null)}
          onReviewSubmitted={handleReviewSubmitted}
        />
      )}
      </div>
    </>
  );
};

export default Projects;