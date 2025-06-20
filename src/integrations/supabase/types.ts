export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          author: string
          canonical_url: string | null
          category: string | null
          content: string
          created_at: string | null
          excerpt: string | null
          feature_image: string | null
          id: string
          last_modified: string | null
          meta_description: string | null
          meta_keywords: string | null
          meta_title: string | null
          publish_date: string | null
          robots: string | null
          slug: string
          status: string | null
          title: string
        }
        Insert: {
          author: string
          canonical_url?: string | null
          category?: string | null
          content: string
          created_at?: string | null
          excerpt?: string | null
          feature_image?: string | null
          id?: string
          last_modified?: string | null
          meta_description?: string | null
          meta_keywords?: string | null
          meta_title?: string | null
          publish_date?: string | null
          robots?: string | null
          slug: string
          status?: string | null
          title: string
        }
        Update: {
          author?: string
          canonical_url?: string | null
          category?: string | null
          content?: string
          created_at?: string | null
          excerpt?: string | null
          feature_image?: string | null
          id?: string
          last_modified?: string | null
          meta_description?: string | null
          meta_keywords?: string | null
          meta_title?: string | null
          publish_date?: string | null
          robots?: string | null
          slug?: string
          status?: string | null
          title?: string
        }
        Relationships: []
      }
      work_projects: {
        Row: {
          brand_images: string[]
          category: string[]
          challenge: string | null
          created_at: string
          final_thoughts: string | null
          gallery: string[]
          id: string
          services: Json
          short_description: string
          slug: string
          title: string
          tools: string[]
          top_image: string | null
          updated_at: string
          what_we_did: string | null
        }
        Insert: {
          brand_images?: string[]
          category?: string[]
          challenge?: string | null
          created_at?: string
          final_thoughts?: string | null
          gallery?: string[]
          id?: string
          services?: Json
          short_description: string
          slug: string
          title: string
          tools?: string[]
          top_image?: string | null
          updated_at?: string
          what_we_did?: string | null
        }
        Update: {
          brand_images?: string[]
          category?: string[]
          challenge?: string | null
          created_at?: string
          final_thoughts?: string | null
          gallery?: string[]
          id?: string
          services?: Json
          short_description?: string
          slug?: string
          title?: string
          tools?: string[]
          top_image?: string | null
          updated_at?: string
          what_we_did?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
