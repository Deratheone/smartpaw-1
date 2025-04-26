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
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  deleteAccount: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event, session);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

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
      
      if (userData.user_type === 'service-provider' && !userData.business_name) {
        userData.business_name = userData.full_name;
      }
      
      const redirectUrl = `${window.location.origin}/login`;
      console.log('Using redirect URL:', redirectUrl);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
          emailRedirectTo: redirectUrl
        }
      });

      if (error) throw error;

      console.log('Sign up result:', data);
      
      if (!data.user || data.user.identities?.length === 0) {
        toast({
          title: "This email is already registered",
          description: "Please use a different email or try logging in.",
          variant: "destructive"
        });
        return;
      }

      if (data.session) {
        setSession(data.session);
        setUser(data.user);
        
        toast({
          title: "Account created and logged in!",
          description: "Welcome to SmartPaw.",
        });

        if (userData.user_type === 'service-provider') {
          navigate('/service-provider/profile');
        } else {
          navigate('/');
        }
      } else {
        toast({
          title: "Account created successfully!",
          description: "Please check your email for a confirmation link before logging in.",
        });
        navigate('/login');
      }
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
        const userType = data.user.user_metadata.user_type;
        
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in."
        });
        
        if (userType === 'service-provider') {
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

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/login`
        }
      });

      if (error) throw error;
    } catch (error: any) {
      console.error('Google sign in error:', error);
      toast({
        title: "Error signing in with Google",
        description: error.message,
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

  const deleteAccount = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      if (user.user_metadata.user_type === 'service-provider') {
        const { error: providerError } = await supabase
          .from('service_providers')
          .delete()
          .eq('id', user.id);
          
        if (providerError) throw providerError;
      }
      
      const { error } = await supabase.auth.admin.deleteUser(user.id);
      if (error) throw error;
      
      toast({
        title: "Account deleted",
        description: "Your account has been permanently deleted.",
      });
      
      await signOut();
    } catch (error: any) {
      console.error('Delete account error:', error);
      toast({
        title: "Error deleting account",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      session, 
      user, 
      signUp, 
      signIn, 
      signInWithGoogle,
      signOut, 
      deleteAccount,
      loading 
    }}>
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
