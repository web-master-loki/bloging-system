import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BlogPost } from "@/types/blog";
import { blogService } from "@/services/blogService";
import { imageUploadService } from "@/services/imageUploadService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Calendar, User, BookOpen } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const BlogPostView = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      
      try {
        const fetchedPost = await blogService.getPostBySlug(slug);
        // Only show published posts in public view
        if (fetchedPost && fetchedPost.status === 'published') {
          setPost(fetchedPost);
        } else {
          setPost(null);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        setPost(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const getFeatureImageUrl = (post: BlogPost) => {
    if (!post.feature_image) return null;
    return imageUploadService.getBlogImageUrl(post.feature_image);
  };

  if (isLoading) {
    return (
      <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-vh-100 bg-light">
        <SEOHead 
          title="Post not found - Quill CMS"
          description="The post you're looking for doesn't exist or is not published."
        />
        <div className="container py-5">
          <div className="text-center py-5">
            <h1 className="display-6 fw-bold mb-3">Post not found</h1>
            <p className="text-muted mb-4">The post you're looking for doesn't exist or is not published.</p>
            <Button onClick={() => navigate('/blog')} className="btn btn-primary">
              <ChevronLeft className="me-2" size={16} />
              Back to Blog
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const featureImageUrl = getFeatureImageUrl(post);

  return (
    <div className="min-vh-100 bg-light">
      <SEOHead 
        post={post}
        type="article"
        image={featureImageUrl || undefined}
      />
      
      {/* Header */}
      <div className="bg-white border-bottom py-3">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <Button 
              onClick={() => navigate('/blog')}
              variant="outline"
              className="btn btn-outline-secondary"
            >
              <ChevronLeft className="me-2" size={16} />
              Back to Blog
            </Button>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <Card>
              <CardHeader className="border-bottom">
                <div className="d-flex align-items-start justify-content-between mb-3">
                  <Badge className="bg-success text-white">
                    PUBLISHED
                  </Badge>
                </div>
                <CardTitle className="display-6 fw-bold mb-3">
                  {post.title}
                </CardTitle>
                
                {post.excerpt && (
                  <p className="lead text-muted mb-4">{post.excerpt}</p>
                )}

                <div className="d-flex flex-wrap gap-3 text-muted small">
                  <div className="d-flex align-items-center">
                    <User size={16} className="me-1" />
                    <span>By {post.author}</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <Calendar size={16} className="me-1" />
                    <span>{new Date(post.publish_date).toLocaleDateString()}</span>
                  </div>
                  {post.category && (
                    <div className="d-flex align-items-center">
                      <BookOpen size={16} className="me-1" />
                      <span>{post.category}</span>
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="pt-4">
                {featureImageUrl && (
                  <div className="mb-4">
                    <img 
                      src={featureImageUrl} 
                      alt={post.title}
                      className="w-100 rounded"
                      style={{ maxHeight: '400px', objectFit: 'cover' }}
                    />
                  </div>
                )}
                
                <div className="prose max-w-none">
                  <div 
                    style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white py-4 mt-5">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <p className="mb-0">&copy; 2024 Quill CMS. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogPostView;
