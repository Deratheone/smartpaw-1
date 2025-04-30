
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { User } from "@supabase/supabase-js";

export const performSignUp = async (
  email: string, 
  password: string, 
  userData: {
    full_name: string;
    user_type: 'pet-owner' | 'service-provider';
    business_name?: string;
  }
) => {
  console.log('Signing up with:', email, userData);
  
  if (userData.user_type === 'service-provider' && !userData.business_name) {
    userData.business_name = userData.full_name;
  }
  
  // Get the current origin (with protocol) for the redirect URL
  const origin = window.location.origin;
  // Create a proper redirect URL that points to the login page
  const redirectUrl = `${origin}/login`;
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
  
  return data;
};

export const performSignIn = async (email: string, password: string) => {
  console.log('Signing in with:', email);
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) throw error;

  console.log('Sign in successful:', data);
  
  return data;
};

export const performSignInWithGoogle = async () => {
  // Get the current origin for proper redirect
  const origin = window.location.origin;
  const redirectUrl = `${origin}/login`;
  
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: redirectUrl
    }
  });

  if (error) throw error;
};

export const performSignOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const performDeleteAccount = async (user: User) => {
  // Delete service provider data if applicable
  if (user.user_metadata.user_type === 'service-provider') {
    const { error: providerError } = await supabase
      .from('service_providers')
      .delete()
      .eq('id', user.id);
      
    if (providerError) throw providerError;
  }
  
  // Delete the user account
  const { error } = await supabase.auth.admin.deleteUser(user.id);
  if (error) throw error;
};
