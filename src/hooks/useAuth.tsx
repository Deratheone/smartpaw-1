
import { useEffect, useState, createContext, useContext } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  signUp: (email: string, password: string, userData: { 
    full_name: string;
    user_type: 'pet-owner' | 'service-provider';
    business_name?: string;
  }) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event, session);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Got existing session:', session);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (
    email: string, 
    password: string, 
    userData: {
      full_name: string;
      user_type: 'pet-owner' | 'service-provider';
      business_name?: string;
    }
  ) => {
    try {
      setLoading(true);
      console.log('Signing up with:', email, userData);
      
      // For service providers, ensure business_name is provided
      if (userData.user_type === 'service-provider' && !userData.business_name) {
        userData.business_name = userData.full_name; // Use full name as fallback
      }
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
          emailRedirectTo: `${window.location.origin}/login`
        }
      });

      if (error) throw error;

      console.log('Sign up result:', data);
      
      // Check if email confirmation is required
      if (!data.user || data.user.identities?.length === 0) {
        toast({
          title: "This email is already registered",
          description: "Please use a different email or try logging in.",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Account created successfully!",
        description: "You can now login with your credentials.",
      });

      navigate('/login');
    } catch (error: any) {
      console.error('Sign up error:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      console.log('Signing in with:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      console.log('Sign in successful:', data);
      
      if (data.user) {
        // Check user type and redirect accordingly
        const userType = data.user.user_metadata.user_type;
        
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in."
        });
        
        if (userType === 'service-provider') {
          // Check if profile is complete
          const { data: providerData, error: providerError } = await supabase
            .from('service_providers')
            .select('description')
            .eq('id', data.user.id)
            .single();
            
          if (providerError || !providerData || !providerData.description) {
            navigate('/service-provider/profile');
          } else {
            navigate('/seller-dashboard');
          }
        } else {
          navigate('/');
        }
      }
    } catch (error: any) {
      console.error('Sign in error:', error);
      
      let errorMessage = error.message;
      
      if (error.message.includes('Email not confirmed')) {
        errorMessage = "Please verify your email address before logging in. Check your inbox for a confirmation link.";
      } else if (error.message.includes('Invalid login credentials')) {
        errorMessage = "Incorrect email or password. Please try again.";
      }
      
      toast({
        title: "Error signing in",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      navigate('/login');
    } catch (error: any) {
      console.error('Sign out error:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ session, user, signUp, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
