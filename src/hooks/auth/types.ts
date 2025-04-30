
import { Session, User } from '@supabase/supabase-js';

export interface AuthContextType {
  session: Session | null;
  user: User | null;
  signUp: (email: string, password: string, userData: { 
    full_name: string;
    user_type: 'pet-owner' | 'service-provider';
    business_name?: string;
  }) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  deleteAccount: () => Promise<void>;
  loading: boolean;
}
