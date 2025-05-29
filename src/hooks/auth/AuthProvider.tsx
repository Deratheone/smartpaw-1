
import { useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { AuthContext } from './AuthContext';
import { performSignUp, performSignIn, performSignInWithGoogle, performSignOut, performDeleteAccount } from './authActions';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Setting up auth state listener...');
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event, session);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('Error getting initial session:', error);
      } else {
        console.log('Got existing session:', session);
        setSession(session);
        setUser(session?.user ?? null);
      }
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
      
      const data = await performSignUp(email, password, userData);
      
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
          navigate('/seller-dashboard');
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
      console.error('Sign up error in provider:', error);
      toast({
        title: "Registration Failed",
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
      
      const data = await performSignIn(email, password);
      
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
            navigate('/seller-dashboard');
          } else {
            navigate('/seller-dashboard');
          }
        } else {
          navigate('/');
        }
      }
    } catch (error: any) {
      console.error('Sign in error in provider:', error);
      toast({
        title: "Sign In Failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      await performSignInWithGoogle();
    } catch (error: any) {
      console.error('Google sign in error in provider:', error);
      toast({
        title: "Google Sign In Failed",
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
      await performSignOut();
      navigate('/login');
      toast({
        title: "Signed out successfully",
        description: "You have been logged out.",
      });
    } catch (error: any) {
      console.error('Sign out error in provider:', error);
      toast({
        title: "Sign Out Failed",
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
      
      await performDeleteAccount(user);
      
      toast({
        title: "Account deleted",
        description: "Your account has been permanently deleted.",
      });
      
      await signOut();
    } catch (error: any) {
      console.error('Delete account error in provider:', error);
      toast({
        title: "Account Deletion Failed",
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
