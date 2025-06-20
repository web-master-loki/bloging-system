
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchPosts, deletePost } from "@/store/blogSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/components/DashboardLayout";
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { posts, loading, error } = useAppSelector(state => state.blog);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  if (!user) {
    navigate('/login');
    return null;
  }

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
    }
  }, [error]);

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || post.status === filterStatus;
    const matchesCategory = filterCategory === "all" || post.category === filterCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published": return "bg-success text-white";
      case "draft": return "bg-warning text-dark";
      case "scheduled": return "bg-info text-white";
      default: return "bg-secondary text-dark";
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await dispatch(deletePost(postId)).unwrap();
        toast({
          title: "Post deleted",
          description: "The post has been removed successfully.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete post. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  if (loading && posts.length === 0) {
    return (
      <DashboardLayout>
        <div className="d-flex align-items-center justify-content-center" style={{ height: '400px' }}>
          <div className="text-center">
            <div className="spinner-border text-primary mb-3" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p>Loading posts...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container-fluid">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="display-5 fw-bold">Dashboard</h1>
            <p className="text-muted">Manage your blog posts and content</p>
          </div>
          <Button onClick={() => navigate('/create-post')} className="btn btn-primary">
            <Plus className="me-2" size={16} />
            Create Post
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="row g-3 mb-4">
          <div className="col-md-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="fs-6 text-muted">Total Posts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="fs-2 fw-bold">{posts.length}</div>
              </CardContent>
            </Card>
          </div>
          <div className="col-md-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="fs-6 text-muted">Published</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="fs-2 fw-bold text-success">
                  {posts.filter(p => p.status === "published").length}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="col-md-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="fs-6 text-muted">Drafts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="fs-2 fw-bold text-warning">
                  {posts.filter(p => p.status === "draft").length}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="col-md-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="fs-6 text-muted">Scheduled</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="fs-2 fw-bold text-info">
                  {posts.filter(p => p.status === "scheduled").length}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-4">
          <CardContent className="pt-3">
            <div className="row g-3">
              <div className="col-md-6">
                <div className="position-relative">
                  <Search className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" size={16} />
                  <Input
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="ps-5"
                  />
                </div>
              </div>
              <div className="col-md-3">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-md-3">
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Web Development">Web Development</SelectItem>
                    <SelectItem value="JavaScript">JavaScript</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Posts List */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="d-flex flex-column gap-3">
              {filteredPosts.length === 0 ? (
                <div className="text-center py-5">
                  <p className="text-muted">No posts found. Create your first post!</p>
                  <Button onClick={() => navigate('/create-post')} className="btn btn-primary">
                    <Plus className="me-2" size={16} />
                    Create Post
                  </Button>
                </div>
              ) : (
                filteredPosts.map((post) => (
                  <div key={post.id} className="border rounded p-3 hover-bg-light">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div className="flex-grow-1">
                        <h5 className="fw-semibold mb-1">{post.title}</h5>
                        <p className="text-muted small mb-2">{post.excerpt}</p>
                        <div className="d-flex align-items-center gap-3 small text-muted">
                          <span>By {post.author}</span>
                          <span>•</span>
                          <span>{post.category}</span>
                          <span>•</span>
                          <span>{new Date(post.publish_date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-2 ms-3">
                        <Badge className={getStatusColor(post.status)}>
                          {post.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="d-flex justify-content-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/post/${post.id}`)}
                        className="btn btn-outline-secondary btn-sm"
                      >
                        <Eye className="me-1" size={14} />
                        View
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/edit-post/${post.id}`)}
                        className="btn btn-outline-primary btn-sm"
                      >
                        <Edit className="me-1" size={14} />
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDeletePost(post.id)}
                        className="btn btn-outline-danger btn-sm"
                        disabled={loading}
                      >
                        <Trash2 className="me-1" size={14} />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
