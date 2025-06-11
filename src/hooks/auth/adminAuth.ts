// Admin authentication utilities
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'smartpaw2025'
};

export interface AdminSession {
  isAuthenticated: boolean;
  username: string;
  loginTime: number;
  expiresAt: number;
}

export const authenticateAdmin = (username: string, password: string): boolean => {
  return username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password;
};

export const createAdminSession = (): AdminSession => {
  const now = Date.now();
  const expiresAt = now + (24 * 60 * 60 * 1000); // 24 hours
  
  const session: AdminSession = {
    isAuthenticated: true,
    username: ADMIN_CREDENTIALS.username,
    loginTime: now,
    expiresAt
  };

  localStorage.setItem('adminSession', JSON.stringify(session));
  return session;
};

export const getAdminSession = (): AdminSession | null => {
  try {
    const sessionData = localStorage.getItem('adminSession');
    if (!sessionData) return null;

    const session: AdminSession = JSON.parse(sessionData);
    
    // Check if session is expired
    if (Date.now() > session.expiresAt) {
      localStorage.removeItem('adminSession');
      return null;
    }

    return session;
  } catch (error) {
    localStorage.removeItem('adminSession');
    return null;
  }
};

export const clearAdminSession = (): void => {
  localStorage.removeItem('adminSession');
};

export const isAdminAuthenticated = (): boolean => {
  const session = getAdminSession();
  return session !== null && session.isAuthenticated;
};
