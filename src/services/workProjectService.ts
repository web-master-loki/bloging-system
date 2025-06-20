
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type WorkProject = Database['public']['Tables']['work_projects']['Row'];
type WorkProjectInsert = Database['public']['Tables']['work_projects']['Insert'];
type WorkProjectUpdate = Database['public']['Tables']['work_projects']['Update'];

export interface WorkProjectWithServices extends Omit<WorkProject, 'services'> {
  services: { title: string; image: string }[];
}

export const workProjectService = {
  // Get all work projects (public access)
  async getAllProjects(): Promise<WorkProjectWithServices[]> {
    const { data, error } = await supabase
      .from('work_projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching work projects:', error);
      throw error;
    }

    return data?.map(project => ({
      ...project,
      services: Array.isArray(project.services) ? project.services as { title: string; image: string }[] : []
    })) || [];
  },

  // Get project by slug
  async getProjectBySlug(slug: string): Promise<WorkProjectWithServices | null> {
    const { data, error } = await supabase
      .from('work_projects')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // Project not found
      }
      console.error('Error fetching work project:', error);
      throw error;
    }

    return data ? {
      ...data,
      services: Array.isArray(data.services) ? data.services as { title: string; image: string }[] : []
    } : null;
  },

  // Create new project (authenticated users only)
  async createProject(project: Omit<WorkProjectInsert, 'id' | 'created_at' | 'updated_at'>): Promise<WorkProjectWithServices> {
    const { data, error } = await supabase
      .from('work_projects')
      .insert({
        ...project,
        services: project.services || []
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating work project:', error);
      throw error;
    }

    return {
      ...data,
      services: Array.isArray(data.services) ? data.services as { title: string; image: string }[] : []
    };
  },

  // Update project (authenticated users only)
  async updateProject(id: string, updates: WorkProjectUpdate): Promise<WorkProjectWithServices> {
    const { data, error } = await supabase
      .from('work_projects')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating work project:', error);
      throw error;
    }

    return {
      ...data,
      services: Array.isArray(data.services) ? data.services as { title: string; image: string }[] : []
    };
  },

  // Delete project (authenticated users only)
  async deleteProject(id: string): Promise<void> {
    const { error } = await supabase
      .from('work_projects')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting work project:', error);
      throw error;
    }
  },

  // Generate unique slug from title
  generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
};
