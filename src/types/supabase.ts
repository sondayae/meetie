export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      badge: {
        Row: {
          description: string | null
          id: number
          image_path: string
          name: string | null
          title: string | null
          type: string | null
        }
        Insert: {
          description?: string | null
          id?: number
          image_path: string
          name?: string | null
          title?: string | null
          type?: string | null
        }
        Update: {
          description?: string | null
          id?: number
          image_path?: string
          name?: string | null
          title?: string | null
          type?: string | null
        }
        Relationships: []
      }
      badge_condition: {
        Row: {
          badge_id: number
          condition: Json[]
          created_at: string
          id: number
        }
        Insert: {
          badge_id: number
          condition: Json[]
          created_at?: string
          id?: number
        }
        Update: {
          badge_id?: number
          condition?: Json[]
          created_at?: string
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "badge_condition_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badge"
            referencedColumns: ["id"]
          },
        ]
      }
      bookmark: {
        Row: {
          created_at: string
          id: number
          study_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          study_id: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          study_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookmark_study_id_fkey"
            columns: ["study_id"]
            isOneToOne: false
            referencedRelation: "study"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookmark_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          comment: string
          created_at: string
          id: number
          target_id: number
          user_id: string
        }
        Insert: {
          comment: string
          created_at?: string
          id?: number
          target_id: number
          user_id: string
        }
        Update: {
          comment?: string
          created_at?: string
          id?: number
          target_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_target_id_fkey"
            columns: ["target_id"]
            isOneToOne: false
            referencedRelation: "handin"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      feedback_reactions: {
        Row: {
          created_at: string
          emoji: string
          id: number
          target_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          emoji: string
          id?: number
          target_id: number
          user_id: string
        }
        Update: {
          created_at?: string
          emoji?: string
          id?: number
          target_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "feedback_reactions_target_id_fkey"
            columns: ["target_id"]
            isOneToOne: false
            referencedRelation: "handin"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feedback_reactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      handin: {
        Row: {
          created_at: string
          homework_id: number
          id: number
          study_id: number | null
          text: string
          user_id: string
        }
        Insert: {
          created_at?: string
          homework_id: number
          id?: number
          study_id?: number | null
          text: string
          user_id: string
        }
        Update: {
          created_at?: string
          homework_id?: number
          id?: number
          study_id?: number | null
          text?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "handin_homework_id_fkey"
            columns: ["homework_id"]
            isOneToOne: false
            referencedRelation: "homework"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "handin_study_id_fkey"
            columns: ["study_id"]
            isOneToOne: false
            referencedRelation: "study"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "handin_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      homework: {
        Row: {
          created_at: string
          endDate: string | null
          id: number
          startDate: string | null
          study_id: number | null
          studyId: number
          subtitle: string | null
          title: string | null
        }
        Insert: {
          created_at?: string
          endDate?: string | null
          id?: number
          startDate?: string | null
          study_id?: number | null
          studyId: number
          subtitle?: string | null
          title?: string | null
        }
        Update: {
          created_at?: string
          endDate?: string | null
          id?: number
          startDate?: string | null
          study_id?: number | null
          studyId?: number
          subtitle?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "homework_study_id_fkey"
            columns: ["study_id"]
            isOneToOne: false
            referencedRelation: "study"
            referencedColumns: ["id"]
          },
        ]
      }
      images: {
        Row: {
          created_at: string
          id: number
          target: string | null
          target_id: number | null
          url: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          target?: string | null
          target_id?: number | null
          url?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          target?: string | null
          target_id?: number | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "images_target_id_fkey"
            columns: ["target_id"]
            isOneToOne: false
            referencedRelation: "handin"
            referencedColumns: ["id"]
          },
        ]
      }
      message: {
        Row: {
          created_at: string
          id: number
          message: string
          receiver: string | null
          sender: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          message: string
          receiver?: string | null
          sender?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          message?: string
          receiver?: string | null
          sender?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "message_receiver_fkey"
            columns: ["receiver"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "message_sender_fkey"
            columns: ["sender"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      reactions: {
        Row: {
          created_at: string
          emoji: string
          id: number
          target_id: number | null
          user_id: string
        }
        Insert: {
          created_at?: string
          emoji: string
          id?: number
          target_id?: number | null
          user_id: string
        }
        Update: {
          created_at?: string
          emoji?: string
          id?: number
          target_id?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reactions_target_id_fkey"
            columns: ["target_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      schedule: {
        Row: {
          created_at: string | null
          created_by: string
          description: string | null
          event_date: string
          event_type: string | null
          id: number
          start_time: string | null
          study_room_id: number
          title: string
        }
        Insert: {
          created_at?: string | null
          created_by: string
          description?: string | null
          event_date: string
          event_type?: string | null
          id?: number
          start_time?: string | null
          study_room_id: number
          title: string
        }
        Update: {
          created_at?: string | null
          created_by?: string
          description?: string | null
          event_date?: string
          event_type?: string | null
          id?: number
          start_time?: string | null
          study_room_id?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "schedule_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      study: {
        Row: {
          author: string | null
          created_at: string
          endDate: string
          goal: string
          id: number
          info: string
          isRecruiting: boolean
          purposes: string[]
          recruitNum: number
          roles: string[]
          startDate: string
          tags: string[] | null
          title: string
          topic: string
          viewCount: number
        }
        Insert: {
          author?: string | null
          created_at?: string
          endDate: string
          goal: string
          id?: number
          info: string
          isRecruiting?: boolean
          purposes: string[]
          recruitNum: number
          roles: string[]
          startDate: string
          tags?: string[] | null
          title: string
          topic: string
          viewCount?: number
        }
        Update: {
          author?: string | null
          created_at?: string
          endDate?: string
          goal?: string
          id?: number
          info?: string
          isRecruiting?: boolean
          purposes?: string[]
          recruitNum?: number
          roles?: string[]
          startDate?: string
          tags?: string[] | null
          title?: string
          topic?: string
          viewCount?: number
        }
        Relationships: [
          {
            foreignKeyName: "study_author_fkey"
            columns: ["author"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      study_apply: {
        Row: {
          created_at: string
          id: number
          status: string | null
          studyId: number | null
          userId: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          status?: string | null
          studyId?: number | null
          userId?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          status?: string | null
          studyId?: number | null
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "study_apply_studyId_fkey"
            columns: ["studyId"]
            isOneToOne: false
            referencedRelation: "study"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "study_apply_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      studymember: {
        Row: {
          id: number
          isLeader: boolean
          participantId: string | null
          study_id: number | null
        }
        Insert: {
          id?: number
          isLeader?: boolean
          participantId?: string | null
          studyId?: number | null
        }
        Update: {
          id?: number
          isLeader?: boolean
          participantId?: string | null
          studyId?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "studymember_participantId_fkey"
            columns: ["participantId"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "studymember_studyId_fkey"
            columns: ["study_id"]
            isOneToOne: false
            referencedRelation: "study"
            referencedColumns: ["id"]
          },
        ]
      }
      test: {
        Row: {
          created_at: string
          id: number
          name: string | null
          user: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
          user?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
          user?: string | null
        }
        Relationships: []
      }
      user: {
        Row: {
          bookmark_study: number | null
          created_at: string | null
          email: string | null
          ex_study: number | null
          expected_study_span: string | null
          id: string
          image_id: number | null
          introduction: string | null
          job: string | null
          name: string | null
          nickname: string | null
          participating_study: number | null
          personality: string[] | null
          purpose: string[] | null
        }
        Insert: {
          bookmark_study?: number | null
          created_at?: string | null
          email?: string | null
          ex_study?: number | null
          expected_study_span?: string | null
          id?: string
          image_id?: number | null
          introduction?: string | null
          job?: string | null
          name?: string | null
          nickname?: string | null
          participating_study?: number | null
          personality?: string[] | null
          purpose?: string[] | null
        }
        Update: {
          bookmark_study?: number | null
          created_at?: string | null
          email?: string | null
          ex_study?: number | null
          expected_study_span?: string | null
          id?: string
          image_id?: number | null
          introduction?: string | null
          job?: string | null
          name?: string | null
          nickname?: string | null
          participating_study?: number | null
          personality?: string[] | null
          purpose?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "user_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_image_id_fkey"
            columns: ["image_id"]
            isOneToOne: false
            referencedRelation: "images"
            referencedColumns: ["id"]
          },
        ]
      }
      user_activity: {
        Row: {
          comment: number | null
          created_at: string
          feedback: number | null
          id: number
          study: number | null
          user_id: string
        }
        Insert: {
          comment?: number | null
          created_at?: string
          feedback?: number | null
          id?: number
          study?: number | null
          user_id: string
        }
        Update: {
          comment?: number | null
          created_at?: string
          feedback?: number | null
          id?: number
          study?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_activity_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      user_studyroom: {
        Row: {
          id: number
          studyroom_id: number
          user_id: string
        }
        Insert: {
          id?: number
          studyroom_id: number
          user_id: string
        }
        Update: {
          id?: number
          studyroom_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_studyroom_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
