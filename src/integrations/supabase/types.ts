export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      blogs: {
        Row: {
          author_id: string | null
          content: string | null
          created_at: string
          excerpt: string | null
          id: string
          image_url: string | null
          is_published: boolean | null
          published_at: string | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          content?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          published_at?: string | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          content?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          published_at?: string | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      cart_items: {
        Row: {
          course_id: string
          created_at: string
          delivery_mode: Database["public"]["Enums"]["delivery_mode"]
          id: string
          quantity: number | null
          schedule_id: string | null
          user_id: string
        }
        Insert: {
          course_id: string
          created_at?: string
          delivery_mode?: Database["public"]["Enums"]["delivery_mode"]
          id?: string
          quantity?: number | null
          schedule_id?: string | null
          user_id: string
        }
        Update: {
          course_id?: string
          created_at?: string
          delivery_mode?: Database["public"]["Enums"]["delivery_mode"]
          id?: string
          quantity?: number | null
          schedule_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_items_schedule_id_fkey"
            columns: ["schedule_id"]
            isOneToOne: false
            referencedRelation: "course_schedules"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          icon: string | null
          id: string
          is_active: boolean | null
          name: string
          slug: string
          sort_order: number | null
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          slug: string
          sort_order?: number | null
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          slug?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      certificates: {
        Row: {
          certificate_number: string
          course_id: string
          enrollment_id: string
          id: string
          issued_at: string
          pdf_url: string | null
          user_id: string
          verification_url: string | null
        }
        Insert: {
          certificate_number: string
          course_id: string
          enrollment_id: string
          id?: string
          issued_at?: string
          pdf_url?: string | null
          user_id: string
          verification_url?: string | null
        }
        Update: {
          certificate_number?: string
          course_id?: string
          enrollment_id?: string
          id?: string
          issued_at?: string
          pdf_url?: string | null
          user_id?: string
          verification_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "certificates_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "certificates_enrollment_id_fkey"
            columns: ["enrollment_id"]
            isOneToOne: true
            referencedRelation: "enrollments"
            referencedColumns: ["id"]
          },
        ]
      }
      corporate_requests: {
        Row: {
          company_name: string
          contact_email: string
          contact_name: string
          contact_phone: string | null
          course_id: string | null
          created_at: string
          id: string
          message: string | null
          num_employees: number | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          company_name: string
          contact_email: string
          contact_name: string
          contact_phone?: string | null
          course_id?: string | null
          created_at?: string
          id?: string
          message?: string | null
          num_employees?: number | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          company_name?: string
          contact_email?: string
          contact_name?: string
          contact_phone?: string | null
          course_id?: string | null
          created_at?: string
          id?: string
          message?: string | null
          num_employees?: number | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "corporate_requests_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      coupons: {
        Row: {
          code: string
          created_at: string
          current_uses: number | null
          discount_amount: number | null
          discount_percent: number | null
          id: string
          is_active: boolean | null
          max_uses: number | null
          valid_from: string | null
          valid_until: string | null
        }
        Insert: {
          code: string
          created_at?: string
          current_uses?: number | null
          discount_amount?: number | null
          discount_percent?: number | null
          id?: string
          is_active?: boolean | null
          max_uses?: number | null
          valid_from?: string | null
          valid_until?: string | null
        }
        Update: {
          code?: string
          created_at?: string
          current_uses?: number | null
          discount_amount?: number | null
          discount_percent?: number | null
          id?: string
          is_active?: boolean | null
          max_uses?: number | null
          valid_from?: string | null
          valid_until?: string | null
        }
        Relationships: []
      }
      course_delivery_options: {
        Row: {
          course_id: string
          id: string
          is_available: boolean | null
          mode: Database["public"]["Enums"]["delivery_mode"]
          price: number
          schedule: string | null
        }
        Insert: {
          course_id: string
          id?: string
          is_available?: boolean | null
          mode: Database["public"]["Enums"]["delivery_mode"]
          price: number
          schedule?: string | null
        }
        Update: {
          course_id?: string
          id?: string
          is_available?: boolean | null
          mode?: Database["public"]["Enums"]["delivery_mode"]
          price?: number
          schedule?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_delivery_options_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      course_schedules: {
        Row: {
          course_id: string
          created_at: string
          delivery_mode: Database["public"]["Enums"]["delivery_mode"]
          end_date: string | null
          id: string
          is_active: boolean | null
          location: string | null
          seats_available: number | null
          start_date: string
          timezone: string | null
        }
        Insert: {
          course_id: string
          created_at?: string
          delivery_mode: Database["public"]["Enums"]["delivery_mode"]
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          location?: string | null
          seats_available?: number | null
          start_date: string
          timezone?: string | null
        }
        Update: {
          course_id?: string
          created_at?: string
          delivery_mode?: Database["public"]["Enums"]["delivery_mode"]
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          location?: string | null
          seats_available?: number | null
          start_date?: string
          timezone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_schedules_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          base_price: number
          category_id: string | null
          certificate_eligible: boolean | null
          created_at: string
          curriculum: Json | null
          description: string | null
          duration: string | null
          faq: Json | null
          highlights: string[] | null
          id: string
          image_url: string | null
          is_active: boolean | null
          is_trending: boolean | null
          level: Database["public"]["Enums"]["course_level"] | null
          original_price: number | null
          policy_pdf_url: string | null
          prerequisites: string[] | null
          rating: number | null
          seat_capacity: number | null
          short_description: string | null
          slug: string
          students_count: number | null
          title: string
          updated_at: string
          vendor_id: string | null
        }
        Insert: {
          base_price?: number
          category_id?: string | null
          certificate_eligible?: boolean | null
          created_at?: string
          curriculum?: Json | null
          description?: string | null
          duration?: string | null
          faq?: Json | null
          highlights?: string[] | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          is_trending?: boolean | null
          level?: Database["public"]["Enums"]["course_level"] | null
          original_price?: number | null
          policy_pdf_url?: string | null
          prerequisites?: string[] | null
          rating?: number | null
          seat_capacity?: number | null
          short_description?: string | null
          slug: string
          students_count?: number | null
          title: string
          updated_at?: string
          vendor_id?: string | null
        }
        Update: {
          base_price?: number
          category_id?: string | null
          certificate_eligible?: boolean | null
          created_at?: string
          curriculum?: Json | null
          description?: string | null
          duration?: string | null
          faq?: Json | null
          highlights?: string[] | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          is_trending?: boolean | null
          level?: Database["public"]["Enums"]["course_level"] | null
          original_price?: number | null
          policy_pdf_url?: string | null
          prerequisites?: string[] | null
          rating?: number | null
          seat_capacity?: number | null
          short_description?: string | null
          slug?: string
          students_count?: number | null
          title?: string
          updated_at?: string
          vendor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "courses_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "courses_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      email_logs: {
        Row: {
          body: string | null
          created_at: string
          email_type: Database["public"]["Enums"]["email_type"]
          id: string
          metadata: Json | null
          recipient_email: string
          related_enrollment_id: string | null
          related_order_id: string | null
          status: string | null
          subject: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          email_type: Database["public"]["Enums"]["email_type"]
          id?: string
          metadata?: Json | null
          recipient_email: string
          related_enrollment_id?: string | null
          related_order_id?: string | null
          status?: string | null
          subject: string
        }
        Update: {
          body?: string | null
          created_at?: string
          email_type?: Database["public"]["Enums"]["email_type"]
          id?: string
          metadata?: Json | null
          recipient_email?: string
          related_enrollment_id?: string | null
          related_order_id?: string | null
          status?: string | null
          subject?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_logs_related_enrollment_id_fkey"
            columns: ["related_enrollment_id"]
            isOneToOne: false
            referencedRelation: "enrollments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_logs_related_order_id_fkey"
            columns: ["related_order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      enrollments: {
        Row: {
          completed_at: string | null
          course_id: string
          delivery_mode: Database["public"]["Enums"]["delivery_mode"] | null
          enrolled_at: string
          expires_at: string | null
          id: string
          order_id: string | null
          progress: number | null
          status: Database["public"]["Enums"]["enrollment_status"] | null
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          course_id: string
          delivery_mode?: Database["public"]["Enums"]["delivery_mode"] | null
          enrolled_at?: string
          expires_at?: string | null
          id?: string
          order_id?: string | null
          progress?: number | null
          status?: Database["public"]["Enums"]["enrollment_status"] | null
          user_id: string
        }
        Update: {
          completed_at?: string | null
          course_id?: string
          delivery_mode?: Database["public"]["Enums"]["delivery_mode"] | null
          enrolled_at?: string
          expires_at?: string | null
          id?: string
          order_id?: string | null
          progress?: number | null
          status?: Database["public"]["Enums"]["enrollment_status"] | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollments_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          course_id: string | null
          created_at: string
          delivery_mode: Database["public"]["Enums"]["delivery_mode"] | null
          id: string
          order_id: string
          price: number
          quantity: number | null
          schedule_id: string | null
        }
        Insert: {
          course_id?: string | null
          created_at?: string
          delivery_mode?: Database["public"]["Enums"]["delivery_mode"] | null
          id?: string
          order_id: string
          price: number
          quantity?: number | null
          schedule_id?: string | null
        }
        Update: {
          course_id?: string | null
          created_at?: string
          delivery_mode?: Database["public"]["Enums"]["delivery_mode"] | null
          id?: string
          order_id?: string
          price?: number
          quantity?: number | null
          schedule_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_items_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_schedule_id_fkey"
            columns: ["schedule_id"]
            isOneToOne: false
            referencedRelation: "course_schedules"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          billing_company: string | null
          billing_country: string | null
          billing_email: string | null
          billing_name: string | null
          billing_phone: string | null
          coupon_id: string | null
          created_at: string
          discount_amount: number | null
          id: string
          invoice_number: string | null
          status: Database["public"]["Enums"]["order_status"] | null
          stripe_payment_intent_id: string | null
          stripe_session_id: string | null
          subtotal: number
          tax_amount: number | null
          total: number
          updated_at: string
          user_id: string
        }
        Insert: {
          billing_company?: string | null
          billing_country?: string | null
          billing_email?: string | null
          billing_name?: string | null
          billing_phone?: string | null
          coupon_id?: string | null
          created_at?: string
          discount_amount?: number | null
          id?: string
          invoice_number?: string | null
          status?: Database["public"]["Enums"]["order_status"] | null
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
          subtotal?: number
          tax_amount?: number | null
          total?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          billing_company?: string | null
          billing_country?: string | null
          billing_email?: string | null
          billing_name?: string | null
          billing_phone?: string | null
          coupon_id?: string | null
          created_at?: string
          discount_amount?: number | null
          id?: string
          invoice_number?: string | null
          status?: Database["public"]["Enums"]["order_status"] | null
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
          subtotal?: number
          tax_amount?: number | null
          total?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_coupon_id_fkey"
            columns: ["coupon_id"]
            isOneToOne: false
            referencedRelation: "coupons"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          company: string | null
          country: string | null
          created_at: string
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          company?: string | null
          country?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          company?: string | null
          country?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          comment: string | null
          course_id: string
          created_at: string
          id: string
          is_approved: boolean | null
          rating: number
          user_id: string
        }
        Insert: {
          comment?: string | null
          course_id: string
          created_at?: string
          id?: string
          is_approved?: boolean | null
          rating: number
          user_id: string
        }
        Update: {
          comment?: string | null
          course_id?: string
          created_at?: string
          id?: string
          is_approved?: boolean | null
          rating?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      support_tickets: {
        Row: {
          created_at: string
          id: string
          message: string
          status: Database["public"]["Enums"]["ticket_status"] | null
          subject: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          status?: Database["public"]["Enums"]["ticket_status"] | null
          subject: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          status?: Database["public"]["Enums"]["ticket_status"] | null
          subject?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      vendors: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          logo_url: string | null
          name: string
          slug: string
          website: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          name: string
          slug: string
          website?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          name?: string
          slug?: string
          website?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "student" | "corporate"
      course_level: "beginner" | "intermediate" | "advanced" | "expert"
      delivery_mode:
        | "live_online"
        | "classroom"
        | "self_paced"
        | "one_on_one"
        | "fly_me_trainer"
        | "corporate"
        | "hybrid"
      email_type:
        | "enrollment_confirmation"
        | "invoice"
        | "admin_notification"
        | "password_reset"
        | "welcome"
        | "certificate"
        | "quote_request"
        | "general"
      enrollment_status: "active" | "completed" | "cancelled" | "expired"
      order_status: "pending" | "paid" | "failed" | "refunded" | "cancelled"
      ticket_status: "open" | "in_progress" | "resolved" | "closed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "student", "corporate"],
      course_level: ["beginner", "intermediate", "advanced", "expert"],
      delivery_mode: [
        "live_online",
        "classroom",
        "self_paced",
        "one_on_one",
        "fly_me_trainer",
        "corporate",
        "hybrid",
      ],
      email_type: [
        "enrollment_confirmation",
        "invoice",
        "admin_notification",
        "password_reset",
        "welcome",
        "certificate",
        "quote_request",
        "general",
      ],
      enrollment_status: ["active", "completed", "cancelled", "expired"],
      order_status: ["pending", "paid", "failed", "refunded", "cancelled"],
      ticket_status: ["open", "in_progress", "resolved", "closed"],
    },
  },
} as const
