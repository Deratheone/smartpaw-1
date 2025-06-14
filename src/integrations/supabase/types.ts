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
      bookings: {
        Row: {
          booking_date: string
          created_at: string | null
          end_date: string | null
          id: string
          notes: string | null
          provider_id: string
          service_id: string
          service_type: string
          start_date: string
          status: string
          total_amount: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          booking_date: string
          created_at?: string | null
          end_date?: string | null
          id?: string
          notes?: string | null
          provider_id: string
          service_id: string
          service_type: string
          start_date: string
          status?: string
          total_amount: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          booking_date?: string
          created_at?: string | null
          end_date?: string | null
          id?: string
          notes?: string | null
          provider_id?: string
          service_id?: string
          service_type?: string
          start_date?: string
          status?: string
          total_amount?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      pet_boarding_services: {
        Row: {
          address: string | null
          available: boolean
          created_at: string
          description: string
          id: string
          image_url: string | null
          price: number
          provider_id: string
          title: string
          updated_at: string
        }
        Insert: {
          address?: string | null
          available?: boolean
          created_at?: string
          description: string
          id?: string
          image_url?: string | null
          price: number
          provider_id: string
          title: string
          updated_at?: string
        }
        Update: {
          address?: string | null
          available?: boolean
          created_at?: string
          description?: string
          id?: string
          image_url?: string | null
          price?: number
          provider_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pet_boarding_services_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "service_providers"
            referencedColumns: ["id"]
          },
        ]
      }
      pet_grooming_services: {
        Row: {
          address: string | null
          available: boolean
          business_name: string
          city: string | null
          created_at: string
          description: string
          id: string
          image_url: string | null
          price_range: string
          provider_id: string
          services_offered: string
          state: string | null
          updated_at: string
          zip_code: string | null
        }
        Insert: {
          address?: string | null
          available?: boolean
          business_name: string
          city?: string | null
          created_at?: string
          description: string
          id?: string
          image_url?: string | null
          price_range: string
          provider_id: string
          services_offered: string
          state?: string | null
          updated_at?: string
          zip_code?: string | null
        }
        Update: {
          address?: string | null
          available?: boolean
          business_name?: string
          city?: string | null
          created_at?: string
          description?: string
          id?: string
          image_url?: string | null
          price_range?: string
          provider_id?: string
          services_offered?: string
          state?: string | null
          updated_at?: string
          zip_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pet_grooming_services_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "service_providers"
            referencedColumns: ["id"]
          },
        ]
      }
      pet_monitoring_services: {
        Row: {
          address: string | null
          available: boolean
          city: string | null
          created_at: string
          description: string
          features: string[] | null
          id: string
          image_url: string | null
          monitoring_type: string
          price_per_month: number
          provider_id: string
          service_name: string
          state: string | null
          updated_at: string
          zip_code: string | null
        }
        Insert: {
          address?: string | null
          available?: boolean
          city?: string | null
          created_at?: string
          description: string
          features?: string[] | null
          id?: string
          image_url?: string | null
          monitoring_type: string
          price_per_month: number
          provider_id: string
          service_name: string
          state?: string | null
          updated_at?: string
          zip_code?: string | null
        }
        Update: {
          address?: string | null
          available?: boolean
          city?: string | null
          created_at?: string
          description?: string
          features?: string[] | null
          id?: string
          image_url?: string | null
          monitoring_type?: string
          price_per_month?: number
          provider_id?: string
          service_name?: string
          state?: string | null
          updated_at?: string
          zip_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pet_monitoring_services_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "service_providers"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
          user_type: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          updated_at?: string
          user_type: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
          user_type?: string
        }
        Relationships: []
      }
      service_providers: {
        Row: {
          address: string | null
          business_name: string
          city: string | null
          created_at: string
          description: string | null
          id: string
          phone: string | null
          state: string | null
          updated_at: string
          website: string | null
          zip_code: string | null
        }
        Insert: {
          address?: string | null
          business_name: string
          city?: string | null
          created_at?: string
          description?: string | null
          id: string
          phone?: string | null
          state?: string | null
          updated_at?: string
          website?: string | null
          zip_code?: string | null
        }
        Update: {
          address?: string | null
          business_name?: string
          city?: string | null
          created_at?: string
          description?: string | null
          id?: string
          phone?: string | null
          state?: string | null
          updated_at?: string
          website?: string | null
          zip_code?: string | null
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
