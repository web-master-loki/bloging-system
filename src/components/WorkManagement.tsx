
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { workProjectService, WorkProjectWithServices } from "@/services/workProjectService";

const WorkManagement = () => {
  const queryClient = useQueryClient();
  const [editingProject, setEditingProject] = useState<WorkProjectWithServices | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch projects
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['work-projects'],
    queryFn: workProjectService.getAllProjects,
  });

  // Create project mutation
  const createProjectMutation = useMutation({
    mutationFn: workProjectService.createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['work-projects'] });
      toast({
        title: "Project created",
        description: "New project has been successfully created.",
      });
      resetForm();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create project. Please try again.",
        variant: "destructive",
      });
      console.error('Create project error:', error);
    },
  });

  // Update project mutation
  const updateProjectMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: any }) => 
      workProjectService.updateProject(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['work-projects'] });
      toast({
        title: "Project updated",
        description: "The project has been successfully updated.",
      });
      resetForm();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update project. Please try again.",
        variant: "destructive",
      });
      console.error('Update project error:', error);
    },
  });

  // Delete project mutation
  const deleteProjectMutation = useMutation({
    mutationFn: workProjectService.deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['work-projects'] });
      toast({
        title: "Project deleted",
        description: "The project has been successfully deleted.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete project. Please try again.",
        variant: "destructive",
      });
      console.error('Delete project error:', error);
    },
  });

  const [formData, setFormData] = useState<Partial<WorkProjectWithServices>>({
    title: '',
    category: [],
    short_description: '',
    tools: [],
    challenge: '',
    what_we_did: '',
    top_image: '',
    gallery: [],
    brand_images: [],
    final_thoughts: '',
    services: [],
    slug: ''
  });

  const handleSave = () => {
    if (!formData.title || !formData.short_description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const slug = formData.slug || workProjectService.generateSlug(formData.title);

    const projectData = {
      title: formData.title,
      category: formData.category || [],
      short_description: formData.short_description,
      tools: formData.tools || [],
      challenge: formData.challenge || '',
      what_we_did: formData.what_we_did || '',
      top_image: formData.top_image || '',
      gallery: formData.gallery || [],
      brand_images: formData.brand_images || [],
      final_thoughts: formData.final_thoughts || '',
      services: formData.services || [],
      slug: slug
    };

    if (editingProject) {
      updateProjectMutation.mutate({
        id: editingProject.id,
        updates: projectData
      });
    } else {
      createProjectMutation.mutate(projectData);
    }
  };

  const handleEdit = (project: WorkProjectWithServices) => {
    setEditingProject(project);
    setFormData(project);
    setShowForm(true);
  };

  const handleDelete = (projectId: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteProjectMutation.mutate(projectId);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: [],
      short_description: '',
      tools: [],
      challenge: '',
      what_we_did: '',
      top_image: '',
      gallery: [],
      brand_images: [],
      final_thoughts: '',
      services: [],
      slug: ''
    });
    setEditingProject(null);
    setShowForm(false);
  };

  const handleArrayInput = (field: string, value: string) => {
    const items = value.split(',').map(item => item.trim()).filter(item => item);
    setFormData(prev => ({ ...prev, [field]: items }));
  };

  const handleServicesInput = (value: string) => {
    try {
      const services = value.split(',').map(item => {
        const trimmed = item.trim();
        if (trimmed) {
          return {
            title: trimmed,
            image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop'
          };
        }
        return null;
      }).filter(Boolean);
      setFormData(prev => ({ ...prev, services }));
    } catch (error) {
      console.error('Error parsing services:', error);
    }
  };

  if (showForm) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{editingProject ? 'Edit Project' : 'Create New Project'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title *</label>
              <Input
                value={formData.title || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Project title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Slug</label>
              <Input
                value={formData.slug || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                placeholder="project-slug (auto-generated if empty)"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Top Image URL</label>
            <Input
              value={formData.top_image || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, top_image: e.target.value }))}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Short Description *</label>
            <Textarea
              value={formData.short_description || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, short_description: e.target.value }))}
              placeholder="Brief project description"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Categories (comma-separated)</label>
              <Input
                value={formData.category?.join(', ') || ''}
                onChange={(e) => handleArrayInput('category', e.target.value)}
                placeholder="Web Development, UI/UX Design"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Tools (comma-separated)</label>
              <Input
                value={formData.tools?.join(', ') || ''}
                onChange={(e) => handleArrayInput('tools', e.target.value)}
                placeholder="ps, ae, ai, figma"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Challenge</label>
            <Textarea
              value={formData.challenge || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, challenge: e.target.value }))}
              placeholder="What was the main challenge?"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">What We Did</label>
            <Textarea
              value={formData.what_we_did || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, what_we_did: e.target.value }))}
              placeholder="Describe what you accomplished"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Final Thoughts</label>
            <Textarea
              value={formData.final_thoughts || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, final_thoughts: e.target.value }))}
              placeholder="Project conclusion and outcomes"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Gallery Images (comma-separated URLs)</label>
            <Textarea
              value={formData.gallery?.join(', ') || ''}
              onChange={(e) => handleArrayInput('gallery', e.target.value)}
              placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
              rows={2}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Services (comma-separated titles)</label>
            <Input
              value={formData.services?.map(s => s.title).join(', ') || ''}
              onChange={(e) => handleServicesInput(e.target.value)}
              placeholder="Web Development, Digital Marketing"
            />
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={handleSave}
              disabled={createProjectMutation.isPending || updateProjectMutation.isPending}
            >
              {createProjectMutation.isPending || updateProjectMutation.isPending 
                ? 'Saving...' 
                : (editingProject ? 'Update Project' : 'Create Project')
              }
            </Button>
            <Button variant="outline" onClick={resetForm}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Work Projects</h2>
            <p className="text-gray-600">Loading projects...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Work Projects</h2>
          <p className="text-gray-600">Manage your portfolio projects</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </div>

      <div className="grid gap-4">
        {projects.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-600">No projects found. Create your first project to get started.</p>
            </CardContent>
          </Card>
        ) : (
          projects.map((project) => (
            <Card key={project.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-3">{project.short_description}</p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {project.category.map((cat, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {cat}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {project.tools.map((tool, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => window.open(`/work/${project.slug}`, '_blank')}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleEdit(project)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDelete(project.id)}
                      disabled={deleteProjectMutation.isPending}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default WorkManagement;
