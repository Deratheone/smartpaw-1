
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
  console.log('Starting sign up process with:', email, userData);
  
  try {
    if (userData.user_type === 'service-provider' && !userData.business_name) {
      userData.business_name = userData.full_name;
    }
    
    // Get the current origin for the redirect URL
    const origin = window.location.origin;
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

    if (error) {
      console.error('Supabase signup error:', error);
      throw error;
    }

    console.log('Sign up result:', data);
    return data;
  } catch (error: any) {
    console.error('Sign up error details:', error);
    
    // Handle specific error types
    if (error.message?.includes('fetch')) {
      throw new Error('Network connection failed. Please check your internet connection and try again.');
    }
    
    if (error.message?.includes('Email rate limit exceeded')) {
      throw new Error('Too many signup attempts. Please wait a few minutes before trying again.');
    }
    
    if (error.message?.includes('User already registered')) {
      throw new Error('An account with this email already exists. Please try logging in instead.');
    }
    
    // Default error message
    throw new Error(error.message || 'Failed to create account. Please try again.');
  }
};

export const performSignIn = async (email: string, password: string) => {
  console.log('Starting sign in process with:', email);
  
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.error('Supabase signin error:', error);
      throw error;
    }

    console.log('Sign in successful:', data);
    return data;
  } catch (error: any) {
    console.error('Sign in error details:', error);
    
    // Handle specific error types
    if (error.message?.includes('fetch')) {
      throw new Error('Network connection failed. Please check your internet connection and try again.');
    }
    
    if (error.message?.includes('Invalid login credentials')) {
      throw new Error('Incorrect email or password. Please try again.');
    }
    
    if (error.message?.includes('Email not confirmed')) {
      throw new Error('Please verify your email address before logging in. Check your inbox for a confirmation link.');
    }
    
    // Default error message
    throw new Error(error.message || 'Failed to sign in. Please try again.');
  }
};

export const performSignInWithGoogle = async () => {
  try {
    // Get the current origin for proper redirect
    const origin = window.location.origin;
    const redirectUrl = `${origin}/login`;
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl
      }
    });

    if (error) {
      console.error('Google signin error:', error);
      throw error;
    }
  } catch (error: any) {
    console.error('Google sign in error details:', error);
    
    if (error.message?.includes('fetch')) {
      throw new Error('Network connection failed. Please check your internet connection and try again.');
    }
    
    throw new Error(error.message || 'Failed to sign in with Google. Please try again.');
  }
};

export const performSignOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  } catch (error: any) {
    console.error('Sign out error details:', error);
    throw new Error(error.message || 'Failed to sign out. Please try again.');
  }
};

export const performDeleteAccount = async (user: User) => {
  try {
    // Delete service provider data if applicable
    if (user.user_metadata.user_type === 'service-provider') {
      const { error: providerError } = await supabase
        .from('service_providers')
        .delete()
        .eq('id', user.id);
        
      if (providerError) {
        console.error('Error deleting service provider data:', providerError);
        throw providerError;
      }
    }
    
    // Delete the user account
    const { error } = await supabase.auth.admin.deleteUser(user.id);
    if (error) {
      console.error('Error deleting user account:', error);
      throw error;
    }
  } catch (error: any) {
    console.error('Delete account error details:', error);
    throw new Error(error.message || 'Failed to delete account. Please try again.');
  }
};
