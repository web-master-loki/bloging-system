import React, { useState, useEffect, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { BlogPost } from "@/types/blog";
import { ChevronDown, Save, Eye, Upload, X } from "lucide-react";
import { imageUploadService } from "@/services/imageUploadService";
import { toast } from "@/hooks/use-toast";

// Dynamic Froala Editor import to avoid SSR issues
const FroalaEditor = React.lazy(() => import('react-froala-wysiwyg'));

// Import Froala styles
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

interface PostEditorProps {
  post?: BlogPost;
  onSave: (post: Partial<BlogPost>) => void;
  isLoading: boolean;
  mode: 'create' | 'edit';
}

const PostEditor = ({ post, onSave, isLoading, mode }: PostEditorProps) => {
  const [formData, setFormData] = useState({
    title: post?.title || "",
    slug: post?.slug || "",
    content: post?.content || "",
    excerpt: post?.excerpt || "",
    status: post?.status || "draft",
    category: post?.category || "",
    feature_image: post?.feature_image || "",
    metaTags: {
      title: post?.meta_title || "",
      description: post?.meta_description || "",
      keywords: post?.meta_keywords || "",
      canonicalUrl: post?.canonical_url || "",
      robots: post?.robots || "index, follow"
    }
  });

  const [metaOpen, setMetaOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Set initial image preview
  useEffect(() => {
    if (post?.feature_image) {
      const imageUrl = imageUploadService.getBlogImageUrl(post.feature_image);
      setImagePreview(imageUrl);
    }
  }, [post?.feature_image]);

  // Froala Editor configuration
  const froalaConfig = {
    placeholderText: 'Write your blog post content here...',
    charCounterCount: false,
    toolbarButtons: {
      moreText: {
        buttons: ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting']
      },
      moreParagraph: {
        buttons: ['alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote']
      },
      moreRich: {
        buttons: ['insertLink', 'insertImage', 'insertVideo', 'insertTable', 'emoticons', 'fontAwesome', 'specialCharacters', 'embedly', 'insertFile', 'insertHR']
      },
      moreMisc: {
        buttons: ['undo', 'redo', 'fullscreen', 'print', 'getPDF', 'spellChecker', 'selectAll', 'html', 'help']
      }
    },
    pluginsEnabled: ['align', 'charCounter', 'codeBeautifier', 'codeView', 'colors', 'draggable', 'emoticons', 'entities', 'file', 'fontFamily', 'fontSize', 'fullscreen', 'image', 'imageManager', 'inlineStyle', 'lineBreaker', 'link', 'lists', 'paragraphFormat', 'paragraphStyle', 'quickInsert', 'quote', 'save', 'table', 'url', 'video', 'wordPaste']
  };

  // Generate slug from title
  useEffect(() => {
    if (mode === 'create' && formData.title && !formData.slug) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setFormData(prev => ({ ...prev, slug }));
    }
  }, [formData.title, mode]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleMetaChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      metaTags: { ...prev.metaTags, [field]: value }
    }));
  };

  const handleContentChange = (content: string) => {
    setFormData(prev => ({ ...prev, content }));
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file.",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 5MB.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    
    try {
      // Upload image and get filename
      const fileName = await imageUploadService.uploadBlogImage(file);
      
      // Update form data with filename
      setFormData(prev => ({ ...prev, feature_image: fileName }));
      
      // Set preview URL
      const imageUrl = imageUploadService.getBlogImageUrl(fileName);
      setImagePreview(imageUrl);
      
      toast({
        title: "Image uploaded successfully",
        description: "Your feature image has been uploaded.",
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      // Reset file input
      event.target.value = '';
    }
  };

  const handleImageUrlChange = (url: string) => {
    setFormData(prev => ({ ...prev, feature_image: url }));
    setImagePreview(url);
  };

  const removeImage = async () => {
    if (formData.feature_image && !formData.feature_image.startsWith('http')) {
      try {
        await imageUploadService.deleteBlogImage(formData.feature_image);
      } catch (error) {
        console.error('Error deleting image:', error);
      }
    }
    
    setImagePreview(null);
    setFormData(prev => ({ ...prev, feature_image: "" }));
  };

  const handleSubmit = (status: string) => {
    const postData: Partial<BlogPost> = {
      title: formData.title,
      slug: formData.slug,
      content: formData.content,
      excerpt: formData.excerpt,
      status: status as 'draft' | 'published',
      category: formData.category,
      feature_image: formData.feature_image,
      meta_title: formData.metaTags.title,
      meta_description: formData.metaTags.description,
      meta_keywords: formData.metaTags.keywords,
      canonical_url: formData.metaTags.canonicalUrl,
      robots: formData.metaTags.robots,
      publish_date: new Date().toISOString(),
    };
    
    onSave(postData);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Post Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter post title"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="slug">URL Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => handleInputChange('slug', e.target.value)}
                  placeholder="post-url-slug"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Web Development">Web Development</SelectItem>
                      <SelectItem value="JavaScript">JavaScript</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Tutorial">Tutorial</SelectItem>
                      <SelectItem value="News">News</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => handleInputChange('excerpt', e.target.value)}
                  placeholder="Brief description of the post"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Feature Image */}
          <Card>
            <CardHeader>
              <CardTitle>Feature Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {imagePreview ? (
                <div className="relative">
                  <img 
                    src={imagePreview} 
                    alt="Feature image preview" 
                    className="w-full h-48 object-cover rounded-md border"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={removeImage}
                    disabled={isUploading}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">Upload a feature image for your post</p>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="imageUpload">Upload Image</Label>
                <Input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                />
                {isUploading && (
                  <p className="text-sm text-blue-600">Uploading image...</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Or enter image URL</Label>
                <Input
                  id="imageUrl"
                  value={formData.feature_image.startsWith('http') ? formData.feature_image : ''}
                  onChange={(e) => handleImageUrlChange(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  disabled={isUploading}
                />
              </div>
            </CardContent>
          </Card>

          {/* Content Editor */}
          <Card>
            <CardHeader>
              <CardTitle>Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="froala-editor-container">
                <Suspense fallback={<div className="h-96 border rounded-md flex items-center justify-center">Loading editor...</div>}>
                  <FroalaEditor
                    tag="textarea"
                    config={froalaConfig}
                    model={formData.content}
                    onModelChange={handleContentChange}
                  />
                </Suspense>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Rich text editor with full formatting capabilities.
              </p>
            </CardContent>
          </Card>

          {/* SEO Meta Tags */}
          <Card>
            <Collapsible open={metaOpen} onOpenChange={setMetaOpen}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <CardTitle>SEO Meta Tags</CardTitle>
                    <ChevronDown className={`h-4 w-4 transition-transform ${metaOpen ? 'rotate-180' : ''}`} />
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="metaTitle">Meta Title</Label>
                    <Input
                      id="metaTitle"
                      value={formData.metaTags.title}
                      onChange={(e) => handleMetaChange('title', e.target.value)}
                      placeholder="SEO title for search engines"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="metaDescription">Meta Description</Label>
                    <Textarea
                      id="metaDescription"
                      value={formData.metaTags.description}
                      onChange={(e) => handleMetaChange('description', e.target.value)}
                      placeholder="Brief description for search engines"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="keywords">Keywords</Label>
                    <Input
                      id="keywords"
                      value={formData.metaTags.keywords}
                      onChange={(e) => handleMetaChange('keywords', e.target.value)}
                      placeholder="keyword1, keyword2, keyword3"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="canonicalUrl">Canonical URL</Label>
                    <Input
                      id="canonicalUrl"
                      value={formData.metaTags.canonicalUrl}
                      onChange={(e) => handleMetaChange('canonicalUrl', e.target.value)}
                      placeholder="https://yourblog.com/canonical-url"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="robots">Robots Tag</Label>
                    <Select value={formData.metaTags.robots} onValueChange={(value) => handleMetaChange('robots', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="index, follow">Index, Follow</SelectItem>
                        <SelectItem value="noindex, follow">No Index, Follow</SelectItem>
                        <SelectItem value="index, nofollow">Index, No Follow</SelectItem>
                        <SelectItem value="noindex, nofollow">No Index, No Follow</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              onClick={() => handleSubmit('draft')}
              variant="outline"
              disabled={isLoading || isUploading}
            >
              <Save className="h-4 w-4 mr-2" />
              Save as Draft
            </Button>
            <Button
              onClick={() => handleSubmit('published')}
              disabled={isLoading || isUploading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Eye className="h-4 w-4 mr-2" />
              {formData.status === 'published' ? 'Update Post' : 'Publish Post'}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                {imagePreview && (
                  <img 
                    src={imagePreview} 
                    alt={formData.title || 'Feature image'} 
                    className="w-full h-64 object-cover rounded-md mb-6"
                  />
                )}
                <h1>{formData.title || 'Post Title'}</h1>
                <p className="text-gray-600 italic">{formData.excerpt}</p>
                <div 
                  className="content-preview"
                  dangerouslySetInnerHTML={{ __html: formData.content || 'Post content will appear here...' }}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PostEditor;
