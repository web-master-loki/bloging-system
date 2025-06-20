import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BlogPost } from "@/types/blog";
import { blogService } from "@/services/blogService";
import { imageUploadService } from "@/services/imageUploadService";
import SEOHead from "@/components/SEOHead";
import BannerSection from "@/components/parts/BannerSection";
import { ArrowUpRight } from "lucide-react";

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPublishedPosts = async () => {
      try {
        const allPosts = await blogService.getAllPosts();
        // Filter only published posts for public blog
        const publishedPosts = allPosts.filter(post => post.status === 'published');
        setBlogPosts(publishedPosts);
      } catch (error) {
        console.error('Error fetching published posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPublishedPosts();
  }, []);

  const getFeatureImageUrl = (post: BlogPost) => {
    if (!post.feature_image) return null;
    return imageUploadService.getBlogImageUrl(post.feature_image);
  };
  const images = "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=250&fit=crop";
  
  const handleReadMore = (postSlug: string) => {
    navigate(`/blog/${postSlug}`);
  };

  if (loading) {
    return (
      <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading blog posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100">
      <SEOHead 
        title="Our Blog - Quill CMS"
        description="Discover insights, tutorials, and best practices for modern web development"
        keywords="blog, web development, tutorials, programming, technology"
        type="website"
      />
      
      <BannerSection 
        title="Our Blog" 
        slogan="Discover insights, tutorials, and best practices for modern web development" 
      />

      {/* Blog Posts Grid */}
      <main className="py-5">
        <div className="container">
          {blogPosts.length === 0 ? (
            <div className="text-center py-5">
              <h3>No published posts yet</h3>
              <p className="text-muted">Check back later for new content!</p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6"> 
            {/* row g-4 */}
              {blogPosts.map((post, index) => (
                <div 
                  key={post.id} 
                  className="card h-100 shadow-sm rounded-xl overflow-hidden"
                >
                    <img 
                      src={ post.feature_image ? getFeatureImageUrl(post) : images} 
                      className="card-img-top w-100" 
                      alt={post.title}
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <div className="card-body d-flex flex-column gap-2">
                      <div className="mb-2">
                        <span className="badge border-1 rounded-full border-blue-500 text-blue-900 bg-blue-100 py-1.5 px-3">{post.category}</span>
                      </div>
                      <h3 className="text-lg font-semibold card-title">{post.title}</h3>
                      <p className="card-text text-muted small mb-2">
                        By {post.author} • {new Date(post.publish_date).toLocaleDateString()}
                      </p>
                      <p className="card-text flex-grow-1">{post.excerpt}</p>
                      <div className="mt-auto">
                        <button 
                          className="btn bg-[#003cb9] hover:bg-black text-white rounded-full py-2 px-4 d-flex gpa-2 flex-nowrap items-center"
                          onClick={() => handleReadMore(post.slug)}
                        >
                          <span> Read More </span>
                          <ArrowUpRight size={18}/>
                        </button>
                      </div>
                    </div>
                  </div>
                // </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Blog;
