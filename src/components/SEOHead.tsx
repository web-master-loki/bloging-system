
import { useEffect } from 'react';
import { BlogPost } from '@/types/blog';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  robots?: string;
  image?: string;
  type?: 'website' | 'article';
  post?: BlogPost;
}

const SEOHead = ({ 
  title, 
  description, 
  keywords, 
  canonicalUrl, 
  robots = 'index, follow',
  image,
  type = 'website',
  post 
}: SEOHeadProps) => {
  useEffect(() => {
    // Set default values or use post data
    const metaTitle = post?.meta_title || title || 'Quill CMS';
    const metaDescription = post?.meta_description || description || 'A modern content management system';
    const metaKeywords = post?.meta_keywords || keywords || '';
    const metaRobots = post?.robots || robots;
    const metaCanonical = post?.canonical_url || canonicalUrl || window.location.href;
    const metaImage = image || 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=1200&h=630&fit=crop';
    
    // Update document title
    document.title = metaTitle;
    
    // Helper function to update or create meta tags
    const updateMetaTag = (property: string, content: string, useProperty = false) => {
      if (!content) return;
      
      const attribute = useProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${property}"]`) as HTMLMetaElement;
      
      if (element) {
        element.content = content;
      } else {
        element = document.createElement('meta');
        element.setAttribute(attribute, property);
        element.content = content;
        document.head.appendChild(element);
      }
    };
    
    // Update basic meta tags
    updateMetaTag('description', metaDescription);
    updateMetaTag('keywords', metaKeywords);
    updateMetaTag('robots', metaRobots);
    
    // Update Open Graph tags
    updateMetaTag('og:title', metaTitle, true);
    updateMetaTag('og:description', metaDescription, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:url', metaCanonical, true);
    updateMetaTag('og:image', metaImage, true);
    
    // Update Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', metaTitle);
    updateMetaTag('twitter:description', metaDescription);
    updateMetaTag('twitter:image', metaImage);
    
    // Update canonical URL
    let canonicalElement = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (canonicalElement) {
      canonicalElement.href = metaCanonical;
    } else {
      canonicalElement = document.createElement('link');
      canonicalElement.rel = 'canonical';
      canonicalElement.href = metaCanonical;
      document.head.appendChild(canonicalElement);
    }
    
    // If it's an article (blog post), add additional meta tags
    if (type === 'article' && post) {
      updateMetaTag('article:author', post.author, true);
      updateMetaTag('article:published_time', post.publish_date, true);
      updateMetaTag('article:modified_time', post.last_modified, true);
      if (post.category) {
        updateMetaTag('article:section', post.category, true);
      }
    }
  }, [title, description, keywords, canonicalUrl, robots, image, type, post]);

  return null; // This component doesn't render anything
};

export default SEOHead;
