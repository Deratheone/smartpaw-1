
/**
 * Security utilities for input validation and sanitization
 */

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password strength requirements
const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{6,}$/;

export const validateEmail = (email: string): boolean => {
  if (!email || typeof email !== 'string') return false;
  return EMAIL_REGEX.test(email.trim());
};

export const validatePassword = (password: string): { isValid: boolean; message?: string } => {
  if (!password || typeof password !== 'string') {
    return { isValid: false, message: 'Password is required' };
  }

  if (password.length < PASSWORD_MIN_LENGTH) {
    return { isValid: false, message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters long` };
  }

  if (!PASSWORD_REGEX.test(password)) {
    return { 
      isValid: false, 
      message: 'Password must contain at least one letter and one number' 
    };
  }

  return { isValid: true };
};

export const sanitizeInput = (input: string): string => {
  if (!input || typeof input !== 'string') return '';
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .slice(0, 1000); // Limit length to prevent abuse
};

export const validateServiceData = (data: {
  title?: string;
  description?: string;
  price?: number;
  address?: string;
}): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.title?.trim()) {
    errors.push('Title is required');
  } else if (data.title.length > 100) {
    errors.push('Title must be less than 100 characters');
  }

  if (!data.description?.trim()) {
    errors.push('Description is required');
  } else if (data.description.length > 1000) {
    errors.push('Description must be less than 1000 characters');
  }

  if (data.price !== undefined) {
    if (typeof data.price !== 'number' || data.price <= 0) {
      errors.push('Price must be a positive number');
    } else if (data.price > 100000) {
      errors.push('Price cannot exceed ₹1,00,000');
    }
  }

  if (data.address && data.address.length > 500) {
    errors.push('Address must be less than 500 characters');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateUserData = (data: {
  full_name?: string;
  user_type?: string;
  business_name?: string;
}): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.full_name?.trim()) {
    errors.push('Full name is required');
  } else if (data.full_name.length > 100) {
    errors.push('Full name must be less than 100 characters');
  }

  if (!data.user_type || !['pet-owner', 'service-provider'].includes(data.user_type)) {
    errors.push('Valid user type is required');
  }

  if (data.user_type === 'service-provider' && !data.business_name?.trim()) {
    errors.push('Business name is required for service providers');
  }

  if (data.business_name && data.business_name.length > 100) {
    errors.push('Business name must be less than 100 characters');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Rate limiting helper (simple client-side implementation)
class RateLimiter {
  private attempts: Map<string, number[]> = new Map();
  private readonly maxAttempts: number;
  private readonly windowMs: number;

  constructor(maxAttempts: number = 5, windowMs: number = 15 * 60 * 1000) {
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }

  isAllowed(key: string): boolean {
    const now = Date.now();
    const attempts = this.attempts.get(key) || [];
    
    // Remove old attempts outside the window
    const recentAttempts = attempts.filter(time => now - time < this.windowMs);
    
    if (recentAttempts.length >= this.maxAttempts) {
      return false;
    }

    // Add current attempt
    recentAttempts.push(now);
    this.attempts.set(key, recentAttempts);
    
    return true;
  }
}

export const authRateLimiter = new RateLimiter(5, 15 * 60 * 1000); // 5 attempts per 15 minutes
