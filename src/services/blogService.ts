import { supabase } from "@/integrations/supabase/client";
import { BlogPost } from "@/types/blog";

export const blogService = {
  async getAllPosts(): Promise<BlogPost[]> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('last_modified', { ascending: false });
    
    if (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
    
    return (data || []).map(post => ({
      ...post,
      status: post.status as 'draft' | 'published' | 'scheduled'
    }));
  },

  async getPostById(id: string): Promise<BlogPost | null> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching post:', error);
      return null;
    }
    
    return data ? {
      ...data,
      status: data.status as 'draft' | 'published' | 'scheduled'
    } : null;
  },

  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) {
      console.error('Error fetching post by slug:', error);
      return null;
    }
    
    return data ? {
      ...data,
      status: data.status as 'draft' | 'published' | 'scheduled'
    } : null;
  },

  async createPost(post: Omit<BlogPost, 'id' | 'created_at' | 'last_modified'>): Promise<BlogPost> {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User must be authenticated to create posts');
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .insert([{
        title: post.title,
        slug: post.slug,
        content: post.content,
        excerpt: post.excerpt,
        status: post.status,
        author: post.author || user.email || 'Unknown Author',
        category: post.category,
        publish_date: post.publish_date,
        meta_title: post.meta_title,
        meta_description: post.meta_description,
        meta_keywords: post.meta_keywords,
        canonical_url: post.canonical_url,
        robots: post.robots
      }])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating post:', error);
      throw error;
    }
    
    return {
      ...data,
      status: data.status as 'draft' | 'published' | 'scheduled'
    };
  },

  async updatePost(id: string, updates: Partial<BlogPost>): Promise<BlogPost> {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User must be authenticated to update posts');
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .update({
        ...updates,
        last_modified: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating post:', error);
      throw error;
    }
    
    return {
      ...data,
      status: data.status as 'draft' | 'published' | 'scheduled'
    };
  },

  async deletePost(id: string): Promise<void> {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User must be authenticated to delete posts');
    }

    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  }
};
