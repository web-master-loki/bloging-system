
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { updatePost, fetchPosts } from "@/store/blogSlice";
import DashboardLayout from "@/components/DashboardLayout";
import PostEditor from "@/components/PostEditor";
import { BlogPost } from "@/types/blog";
import { toast } from "@/hooks/use-toast";

const EditPost = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { posts, loading: postsLoading } = useAppSelector(state => state.blog);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPost, setIsLoadingPost] = useState(true);

  if (!user) {
    navigate('/login');
    return null;
  }

  useEffect(() => {
    if (posts.length === 0 && !postsLoading) {
      dispatch(fetchPosts());
    }
  }, [dispatch, posts.length, postsLoading]);

  useEffect(() => {
    const foundPost = posts.find(p => p.id === id);
    setPost(foundPost || null);
    setIsLoadingPost(false);
  }, [id, posts]);

  const handleSave = async (postData: Partial<BlogPost>) => {
    if (!post || !id) return;
    
    setIsLoading(true);
    
    try {
      await dispatch(updatePost({ 
        id, 
        updates: {
          ...postData,
          last_modified: new Date().toISOString()
        }
      })).unwrap();
      
      toast({
        title: "Post updated successfully!",
        description: "Your changes have been saved.",
      });
      
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingPost || postsLoading) {
    return (
      <DashboardLayout>
        <div className="d-flex align-items-center justify-content-center" style={{ height: '400px' }}>
          <div className="text-center">
            <div className="spinner-border text-primary mb-3" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p>Loading post...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!post) {
    return (
      <DashboardLayout>
        <div className="text-center py-5">
          <h1 className="display-6 fw-bold mb-3">Post not found</h1>
          <p className="text-muted mb-4">The post you're looking for doesn't exist.</p>
          <button 
            onClick={() => navigate('/dashboard')}
            className="btn btn-primary"
          >
            Return to Dashboard
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container-fluid" style={{ maxWidth: '800px' }}>
        <div className="mb-4">
          <h1 className="display-6 fw-bold">Edit Post</h1>
          <p className="text-muted">Make changes to "{post.title}"</p>
        </div>
        
        <PostEditor
          post={post}
          onSave={handleSave}
          isLoading={isLoading}
          mode="edit"
        />
      </div>
    </DashboardLayout>
  );
};

export default EditPost;
