export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type trip_status = 'draft' | 'planning' | 'confirmed' | 'ongoing' | 'completed' | 'cancelled'
export type member_role = 'owner' | 'editor' | 'viewer'
export type expense_category = 'transportation' | 'accommodation' | 'food' | 'activities' | 'shopping' | 'insurance' | 'communication' | 'other'
export type notification_type = 'trip_invite' | 'expense_added' | 'expense_split' | 'reminder' | 'deadline' | 'weather_alert' | 'system'
export type notification_priority = 'low' | 'medium' | 'high'

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          phone: string | null
          timezone: string
          language: string
          preferred_currency: string
          is_admin: boolean
          email_verified: boolean
          last_login: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          timezone?: string
          language?: string
          preferred_currency?: string
          is_admin?: boolean
          email_verified?: boolean
          last_login?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          timezone?: string
          language?: string
          preferred_currency?: string
          is_admin?: boolean
          email_verified?: boolean
          last_login?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      trips: {
        Row: {
          id: string
          name: string
          description: string | null
          destination_id: string | null
          destination_name: string | null
          destination_lat: number | null
          destination_lng: number | null
          start_date: string
          end_date: string
          budget: number | null
          currency: string
          status: trip_status
          cover_image: string | null
          notes: string | null
          created_by: string
          is_public: boolean
          tags: string[] | null
          metadata: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          destination_id?: string | null
          destination_name?: string | null
          destination_lat?: number | null
          destination_lng?: number | null
          start_date: string
          end_date: string
          budget?: number | null
          currency?: string
          status?: trip_status
          cover_image?: string | null
          notes?: string | null
          created_by: string
          is_public?: boolean
          tags?: string[] | null
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          destination_id?: string | null
          destination_name?: string | null
          destination_lat?: number | null
          destination_lng?: number | null
          start_date?: string
          end_date?: string
          budget?: number | null
          currency?: string
          status?: trip_status
          cover_image?: string | null
          notes?: string | null
          created_by?: string
          is_public?: boolean
          tags?: string[] | null
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
      }
      expenses: {
        Row: {
          id: string
          trip_id: string
          user_id: string
          amount: number
          currency: string
          category: expense_category
          description: string
          merchant_name: string | null
          date: string
          receipt_url: string | null
          split_method: string
          split_details: Json
          is_shared: boolean
          exchange_rate: number
          original_amount: number | null
          original_currency: string | null
          tags: string[] | null
          metadata: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          trip_id: string
          user_id: string
          amount: number
          currency?: string
          category: expense_category
          description: string
          merchant_name?: string | null
          date?: string
          receipt_url?: string | null
          split_method?: string
          split_details?: Json
          is_shared?: boolean
          exchange_rate?: number
          original_amount?: number | null
          original_currency?: string | null
          tags?: string[] | null
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          trip_id?: string
          user_id?: string
          amount?: number
          currency?: string
          category?: expense_category
          description?: string
          merchant_name?: string | null
          date?: string
          receipt_url?: string | null
          split_method?: string
          split_details?: Json
          is_shared?: boolean
          exchange_rate?: number
          original_amount?: number | null
          original_currency?: string | null
          tags?: string[] | null
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
      }
      itineraries: {
        Row: {
          id: string
          trip_id: string
          destination_id: string | null
          day_number: number
          title: string
          description: string | null
          date: string
          start_time: string | null
          end_time: string | null
          location_name: string | null
          latitude: number | null
          longitude: number | null
          category: string | null
          estimated_cost: number | null
          currency: string
          booking_reference: string | null
          notes: string | null
          attachments: Json
          order_index: number
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          trip_id: string
          destination_id?: string | null
          day_number: number
          title: string
          description?: string | null
          date: string
          start_time?: string | null
          end_time?: string | null
          location_name?: string | null
          latitude?: number | null
          longitude?: number | null
          category?: string | null
          estimated_cost?: number | null
          currency?: string
          booking_reference?: string | null
          notes?: string | null
          attachments?: Json
          order_index?: number
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          trip_id?: string
          destination_id?: string | null
          day_number?: number
          title?: string
          description?: string | null
          date?: string
          start_time?: string | null
          end_time?: string | null
          location_name?: string | null
          latitude?: number | null
          longitude?: number | null
          category?: string | null
          estimated_cost?: number | null
          currency?: string
          booking_reference?: string | null
          notes?: string | null
          attachments?: Json
          order_index?: number
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          type: notification_type
          priority: notification_priority
          title: string
          message: string | null
          data: Json
          is_read: boolean
          is_sent: boolean
          trip_id: string | null
          action_url: string | null
          scheduled_at: string | null
          sent_at: string | null
          created_at: string
          expires_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          type: notification_type
          priority?: notification_priority
          title: string
          message?: string | null
          data?: Json
          is_read?: boolean
          is_sent?: boolean
          trip_id?: string | null
          action_url?: string | null
          scheduled_at?: string | null
          sent_at?: string | null
          created_at?: string
          expires_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          type?: notification_type
          priority?: notification_priority
          title?: string
          message?: string | null
          data?: Json
          is_read?: boolean
          is_sent?: boolean
          trip_id?: string | null
          action_url?: string | null
          scheduled_at?: string | null
          sent_at?: string | null
          created_at?: string
          expires_at?: string | null
        }
      }
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type InsertTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type UpdateTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']
