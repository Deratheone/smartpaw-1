
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

export const performSignUp = async (
  email: string, 
  password: string, 
  userData: {
    full_name: string;
    user_type: 'pet-owner' | 'service-provider';
    business_name?: string;
  }
) => {
  // Validate input data
  if (!email?.trim() || !password?.trim() || !userData.full_name?.trim()) {
    throw new Error('All required fields must be provided');
  }

  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters long');
  }

  if (userData.user_type === 'service-provider' && !userData.business_name?.trim()) {
    throw new Error('Business name is required for service providers');
  }

  const { data, error } = await supabase.auth.signUp({
    email: email.trim(),
    password,
    options: {
      data: {
        full_name: userData.full_name.trim(),
        user_type: userData.user_type,
        business_name: userData.business_name?.trim() || null
      }
    }
  });

  if (error) {
    console.error('Sign up error:', error);
    throw error;
  }

  return data;
};

export const performSignIn = async (email: string, password: string) => {
  // Validate input
  if (!email?.trim() || !password?.trim()) {
    throw new Error('Email and password are required');
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });

  if (error) {
    console.error('Sign in error:', error);
    throw error;
  }

  return data;
};

export const performSignInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/`
    }
  });

  if (error) {
    console.error('Google sign in error:', error);
    throw error;
  }

  return data;
};

export const performSignOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Sign out error:', error);
    throw error;
  }
};

export const performDeleteAccount = async (user: User) => {
  if (!user) {
    throw new Error('User not found');
  }

  try {
    // Get the current session to pass the JWT token
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.access_token) {
      throw new Error('No valid session found');
    }

    // Call the secure Edge Function instead of using admin operations
    const response = await fetch(`${supabase.supabaseUrl}/functions/v1/delete-account`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
        'apikey': supabase.supabaseKey
      }
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.error || 'Failed to delete account');
    }

    console.log('Account deletion successful');
    
  } catch (error: any) {
    console.error('Delete account error:', error);
    throw new Error(error.message || 'Failed to delete account');
  }
};
