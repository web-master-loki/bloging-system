
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { createPost } from "@/store/blogSlice";
import DashboardLayout from "@/components/DashboardLayout";
import PostEditor from "@/components/PostEditor";
import { BlogPost } from "@/types/blog";
import { toast } from "@/hooks/use-toast";

const CreatePost = () => {
  const { user, session } = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  if (!user || !session) {
    navigate('/login');
    return null;
  }

  const handleSave = async (postData: Partial<BlogPost>) => {
    setIsLoading(true);
    
    try {
      const newPostData = {
        title: postData.title || '',
        slug: postData.slug || '',
        content: postData.content || '',
        excerpt: postData.excerpt || '',
        status: postData.status || 'draft' as const,
        author: user.email || 'Unknown Author',
        category: postData.category || '',
        publish_date: new Date().toISOString(),
        meta_title: postData.meta_title || '',
        meta_description: postData.meta_description || '',
        meta_keywords: postData.meta_keywords || '',
        canonical_url: postData.canonical_url || '',
        robots: postData.robots || 'index, follow'
      };
      
      await dispatch(createPost(newPostData)).unwrap();
      
      toast({
        title: "Post created successfully!",
        description: "Your blog post has been saved.",
      });
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Create post error:', error);
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="container-fluid" style={{ maxWidth: '800px' }}>
        <div className="mb-4">
          <h1 className="display-6 fw-bold">Create New Post</h1>
          <p className="text-muted">Write and publish your next blog post</p>
        </div>
        
        <PostEditor
          onSave={handleSave}
          isLoading={isLoading}
          mode="create"
        />
      </div>
    </DashboardLayout>
  );
};

export default CreatePost;
