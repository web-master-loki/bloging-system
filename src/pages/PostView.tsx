
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchPosts } from "@/store/blogSlice";
import { BlogPost } from "@/types/blog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Edit, Calendar, User, BookOpen } from "lucide-react";

const PostView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { posts, loading } = useAppSelector(state => state.blog);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (posts.length === 0 && !loading) {
      dispatch(fetchPosts());
    }
  }, [dispatch, posts.length, loading]);

  useEffect(() => {
    const foundPost = posts.find(p => p.id === id);
    setPost(foundPost || null);
    setIsLoading(false);
  }, [id, posts]);

  if (isLoading || loading) {
    return (
      <div className="container py-5">
        <div className="d-flex align-items-center justify-content-center" style={{ height: '400px' }}>
          <div className="text-center">
            <div className="spinner-border text-primary mb-3" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p>Loading post...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container py-5">
        <div className="text-center py-5">
          <h1 className="display-6 fw-bold mb-3">Post not found</h1>
          <p className="text-muted mb-4">The post you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/dashboard')} className="btn btn-primary">
            <ChevronLeft className="me-2" size={16} />
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published": return "bg-success text-white";
      case "draft": return "bg-warning text-dark";
      case "scheduled": return "bg-info text-white";
      default: return "bg-secondary text-dark";
    }
  };

  return (
    <div className="min-vh-100 bg-light">
      {/* Header */}
      <div className="bg-white border-bottom py-3">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <Button 
              onClick={() => navigate('/dashboard')}
              variant="outline"
              className="btn btn-outline-secondary"
            >
              <ChevronLeft className="me-2" size={16} />
              Back to Dashboard
            </Button>
            <Button 
              onClick={() => navigate(`/edit-post/${post.id}`)}
              className="btn btn-primary"
            >
              <Edit className="me-2" size={16} />
              Edit Post
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
                  <Badge className={getStatusColor(post.status)}>
                    {post.status.toUpperCase()}
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
                <div className="prose max-w-none">
                  <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                    {post.content}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SEO Meta Information */}
            {(post.meta_title || post.meta_description) && (
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="h5">SEO Information</CardTitle>
                </CardHeader>
                <CardContent>
                  {post.meta_title && (
                    <div className="mb-3">
                      <strong>Meta Title:</strong>
                      <p className="text-muted mb-0">{post.meta_title}</p>
                    </div>
                  )}
                  {post.meta_description && (
                    <div className="mb-3">
                      <strong>Meta Description:</strong>
                      <p className="text-muted mb-0">{post.meta_description}</p>
                    </div>
                  )}
                  {post.meta_keywords && (
                    <div className="mb-3">
                      <strong>Keywords:</strong>
                      <p className="text-muted mb-0">{post.meta_keywords}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostView;
