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
      users: {
        Row: {
          id: string
          first_name: string
          last_name: string
          phone: string
          email: string
          username: string | null
          interested_subject: string | null
          is_active: boolean | null
          country: string | null
          learner_status: string | null
          assigned_program: string | null
          admin_notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          first_name: string
          last_name: string
          phone: string
          email: string
          username?: string | null
          interested_subject?: string | null
          is_active?: boolean | null
          country?: string | null
          learner_status?: string | null
          assigned_program?: string | null
          admin_notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          phone?: string
          email?: string
          username?: string | null
          interested_subject?: string | null
          is_active?: boolean | null
          country?: string | null
          learner_status?: string | null
          assigned_program?: string | null
          admin_notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      courses: {
        Row: {
          id: string
          title: string
          description: string | null
          duration: string | null
          price: number
          category: string | null
          level: string | null
          instructor_id: string | null
          code: string | null
          curriculum: string | null
          is_active: boolean | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          duration?: string | null
          price: number
          category?: string | null
          level?: string | null
          instructor_id?: string | null
          code?: string | null
          curriculum?: string | null
          is_active?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          duration?: string | null
          price?: number
          category?: string | null
          level?: string | null
          instructor_id?: string | null
          code?: string | null
          curriculum?: string | null
          is_active?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      instructors: {
        Row: {
          id: string
          first_name: string
          last_name: string
          email: string
          phone: string | null
          specialization: string | null
          bio: string | null
          linkedin: string | null
          github: string | null
          is_active: boolean | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          first_name: string
          last_name: string
          email: string
          phone?: string | null
          specialization?: string | null
          bio?: string | null
          linkedin?: string | null
          github?: string | null
          is_active?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          email?: string
          phone?: string | null
          specialization?: string | null
          bio?: string | null
          linkedin?: string | null
          github?: string | null
          is_active?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      enrollments: {
        Row: {
          id: string
          user_id: string | null
          course_id: string | null
          enrollment_date: string | null
          status: string | null
          payment_status: string | null
          payment_plan: string | null
          payment_method: string | null
          total_amount: number | null
          paid_amount: number | null
          enrollment_number: string | null
          razorpay_payment_id: string | null
          razorpay_order_id: string | null
          country: string | null
          first_name: string | null
          last_name: string | null
          email: string | null
          phone: string | null
          address: string | null
          city: string | null
          state: string | null
          zip: string | null
          education: string | null
          field: string | null
          employment_status: string | null
          programming_experience: string | null
          goals: string | null
          linkedin: string | null
          github: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          course_id?: string | null
          enrollment_date?: string | null
          status?: string | null
          payment_status?: string | null
          payment_plan?: string | null
          payment_method?: string | null
          total_amount?: number | null
          paid_amount?: number | null
          enrollment_number?: string | null
          razorpay_payment_id?: string | null
          razorpay_order_id?: string | null
          country?: string | null
          first_name?: string | null
          last_name?: string | null
          email?: string | null
          phone?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          zip?: string | null
          education?: string | null
          field?: string | null
          employment_status?: string | null
          programming_experience?: string | null
          goals?: string | null
          linkedin?: string | null
          github?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          course_id?: string | null
          enrollment_date?: string | null
          status?: string | null
          payment_status?: string | null
          payment_plan?: string | null
          payment_method?: string | null
          total_amount?: number | null
          paid_amount?: number | null
          enrollment_number?: string | null
          razorpay_payment_id?: string | null
          razorpay_order_id?: string | null
          country?: string | null
          first_name?: string | null
          last_name?: string | null
          email?: string | null
          phone?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          zip?: string | null
          education?: string | null
          field?: string | null
          employment_status?: string | null
          programming_experience?: string | null
          goals?: string | null
          linkedin?: string | null
          github?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'enrollments_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'enrollments_course_id_fkey'
            columns: ['course_id']
            isOneToOne: false
            referencedRelation: 'courses'
            referencedColumns: ['id']
          },
        ]
      }
      contacts: {
        Row: {
          id: string
          first_name: string
          last_name: string
          email: string
          phone: string | null
          subject: string | null
          message: string
          status: string | null
          created_at: string
        }
        Insert: {
          id?: string
          first_name: string
          last_name: string
          email: string
          phone?: string | null
          subject?: string | null
          message: string
          status?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          email?: string
          phone?: string | null
          subject?: string | null
          message?: string
          status?: string | null
          created_at?: string
        }
        Relationships: []
      }
      course_regional_prices: {
        Row: {
          id: string
          course_id: string
          region_code: string
          amount: number
          currency: string
          amount_inr: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          course_id: string
          region_code: string
          amount: number
          currency?: string
          amount_inr?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          course_id?: string
          region_code?: string
          amount?: number
          currency?: string
          amount_inr?: number | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'course_regional_prices_course_id_fkey'
            columns: ['course_id']
            isOneToOne: false
            referencedRelation: 'courses'
            referencedColumns: ['id']
          },
        ]
      }
      program_sessions: {
        Row: {
          id: string
          course_id: string | null
          title: string
          meet_link: string | null
          session_date: string
          session_time: string
          mentor_name: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          course_id?: string | null
          title: string
          meet_link?: string | null
          session_date: string
          session_time: string
          mentor_name?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          course_id?: string | null
          title?: string
          meet_link?: string | null
          session_date?: string
          session_time?: string
          mentor_name?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'program_sessions_course_id_fkey'
            columns: ['course_id']
            isOneToOne: false
            referencedRelation: 'courses'
            referencedColumns: ['id']
          },
        ]
      }
      assignments: {
        Row: {
          id: string
          course_id: string | null
          title: string
          description: string | null
          file_url: string | null
          file_name: string | null
          due_date: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          course_id?: string | null
          title: string
          description?: string | null
          file_url?: string | null
          file_name?: string | null
          due_date: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          course_id?: string | null
          title?: string
          description?: string | null
          file_url?: string | null
          file_name?: string | null
          due_date?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'assignments_course_id_fkey'
            columns: ['course_id']
            isOneToOne: false
            referencedRelation: 'courses'
            referencedColumns: ['id']
          },
        ]
      }
      assignment_submissions: {
        Row: {
          id: string
          assignment_id: string | null
          user_id: string | null
          learner_name: string | null
          learner_email: string | null
          file_url: string | null
          file_name: string | null
          submitted_at: string
          status: string | null
          notes: string | null
        }
        Insert: {
          id?: string
          assignment_id?: string | null
          user_id?: string | null
          learner_name?: string | null
          learner_email?: string | null
          file_url?: string | null
          file_name?: string | null
          submitted_at?: string
          status?: string | null
          notes?: string | null
        }
        Update: {
          id?: string
          assignment_id?: string | null
          user_id?: string | null
          learner_name?: string | null
          learner_email?: string | null
          file_url?: string | null
          file_name?: string | null
          submitted_at?: string
          status?: string | null
          notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'assignment_submissions_assignment_id_fkey'
            columns: ['assignment_id']
            isOneToOne: false
            referencedRelation: 'assignments'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'assignment_submissions_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      certificates: {
        Row: {
          id: string
          certificate_id: string
          student_name: string
          user_id: string | null
          course_id: string | null
          program_code: string | null
          completion_date: string
          status: string | null
          created_at: string
        }
        Insert: {
          id?: string
          certificate_id: string
          student_name: string
          user_id?: string | null
          course_id?: string | null
          program_code?: string | null
          completion_date: string
          status?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          certificate_id?: string
          student_name?: string
          user_id?: string | null
          course_id?: string | null
          program_code?: string | null
          completion_date?: string
          status?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'certificates_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'certificates_course_id_fkey'
            columns: ['course_id']
            isOneToOne: false
            referencedRelation: 'courses'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: {
      certificates_public: {
        Row: {
          certificate_id: string
          student_name: string
          program_code: string | null
          completion_date: string
          status: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
        DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] &
        DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
