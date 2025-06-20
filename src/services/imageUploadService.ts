
import { supabase } from "@/integrations/supabase/client";

export const imageUploadService = {
  async uploadBlogImage(file: File): Promise<string> {
    try {
      // Generate a unique filename with timestamp
      const timestamp = Date.now();
      const fileExtension = file.name.split('.').pop() || 'jpg';
      const fileName = `${timestamp}-${Math.random().toString(36).substring(2)}.${fileExtension}`;
      const filePath = `blog/${fileName}`;

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        throw error;
      }

      // Return just the filename to store in database
      return fileName;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Failed to upload image');
    }
  },

  async deleteBlogImage(fileName: string): Promise<void> {
    try {
      const filePath = `blog/${fileName}`;
      
      const { error } = await supabase.storage
        .from('blog-images')
        .remove([filePath]);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      throw new Error('Failed to delete image');
    }
  },

  getBlogImageUrl(fileName: string): string {
    if (!fileName) return '';
    
    // If it's already a full URL, return as is
    if (fileName.startsWith('http')) {
      return fileName;
    }

    // Get public URL from Supabase Storage
    const { data } = supabase.storage
      .from('blog-images')
      .getPublicUrl(`blog/${fileName}`);

    return data.publicUrl;
  }
};
