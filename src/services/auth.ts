import { User, UserRole } from '../types';
import { supabase, ADMIN_MANAGER_UID, isAdminManager } from '../lib/supabase';

export { ADMIN_MANAGER_UID, isAdminManager };
export const ADMIN_MANAGER_EMAIL = 'workebentrick@gmail.com';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AUTH_STORAGE_KEY = 'ebentrick_auth_user';
const USERS_STORAGE_KEY = 'ebentrick_registered_users';

// Pre-seeded accounts for immediate testing with explicit UID mapping
const INITIAL_DEMO_USERS: (User & { passwordHash: string })[] = [
  {
    id: ADMIN_MANAGER_UID, // 350afc5a-9ae9-45d8-9c9b-ad64441da431
    name: 'Engr. Bassey Okon',
    email: ADMIN_MANAGER_EMAIL,
    role: 'admin',
    phone: '+234 803 245 8901',
    company: 'Ebentrick Global Services Ltd',
    passwordHash: 'Mockfast1122',
    createdAt: '2026-01-10T08:00:00Z',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'c9381665-2761-419b-a010-8b1b228b34aa',
    name: 'Chief Tunde Adeleke',
    email: 'client@ebentrick.com',
    role: 'client',
    phone: '+234 812 400 9988',
    company: 'Adeleke Commercial Estates VI',
    passwordHash: 'client123',
    createdAt: '2026-02-14T11:30:00Z',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 's1298471-5512-4cf4-912b-478ac6b28899',
    name: 'Chidinma Eze',
    email: 'student@ebentrick.com',
    role: 'student',
    phone: '+234 809 332 1144',
    company: 'Federal University of Technology Alumni',
    passwordHash: 'student123',
    createdAt: '2026-03-01T09:15:00Z',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  }
];

class AuthService {
  private currentUser: User | null = null;
  private users: (User & { passwordHash: string })[] = [];
  private listeners: Set<(user: User | null) => void> = new Set();

  constructor() {
    this.init();
  }

  private init() {
    if (typeof window === 'undefined') return;

    // Load registered users from storage or initialize with defaults
    try {
      const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
      if (storedUsers) {
        this.users = JSON.parse(storedUsers);
        // Ensure initial demo users exist and admin has exact UID
        INITIAL_DEMO_USERS.forEach(demo => {
          const idx = this.users.findIndex(u => u.email.toLowerCase() === demo.email.toLowerCase());
          if (idx >= 0) {
            if (demo.id === ADMIN_MANAGER_UID) {
              this.users[idx].id = ADMIN_MANAGER_UID;
              this.users[idx].role = 'admin';
            }
          } else {
            this.users.push(demo);
          }
        });
      } else {
        this.users = [...INITIAL_DEMO_USERS];
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(this.users));
      }
    } catch {
      this.users = [...INITIAL_DEMO_USERS];
    }

    // Load active session
    try {
      const activeSession = localStorage.getItem(AUTH_STORAGE_KEY);
      if (activeSession) {
        const parsed = JSON.parse(activeSession);
        // Validate admin role strictly against UID
        if (parsed.id === ADMIN_MANAGER_UID) {
          parsed.role = 'admin';
        } else if (parsed.role === 'admin') {
          // If someone has role admin but not the designated UID, demote to client
          parsed.role = 'client';
        }
        this.currentUser = parsed;
      }
    } catch {
      this.currentUser = null;
    }

    // Also listen to Supabase auth state changes if available
    try {
      supabase.auth.onAuthStateChange(async (_event, session) => {
        if (session?.user) {
          const isManager = session.user.id === ADMIN_MANAGER_UID;
          const safeUser: User = {
            id: session.user.id,
            email: session.user.email || '',
            name: session.user.user_metadata?.name || (isManager ? 'Engr. Bassey Okon' : session.user.email?.split('@')[0] || 'User'),
            role: isManager ? 'admin' : ((session.user.user_metadata?.role as UserRole) || 'client'),
            phone: session.user.user_metadata?.phone || (isManager ? '+234 803 245 8901' : undefined),
            company: session.user.user_metadata?.company || (isManager ? 'Ebentrick Global Services Ltd' : undefined),
            createdAt: session.user.created_at,
            avatarUrl: session.user.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(session.user.email || 'User')}&backgroundColor=0284c7`,
          };
          this.currentUser = safeUser;
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(safeUser));
          this.notify();
        }
      });
    } catch (err) {
      console.warn('Supabase auth state change listener error:', err);
    }
  }

  public subscribe(listener: (user: User | null) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach(fn => fn(this.currentUser));
  }

  public getCurrentUser(): User | null {
    return this.currentUser;
  }

  public isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  /**
   * Strictly checks if current user is the Project Admin Manager
   * UID MUST be 350afc5a-9ae9-45d8-9c9b-ad64441da431
   */
  public isAdmin(): boolean {
    return this.currentUser !== null && this.currentUser.id === ADMIN_MANAGER_UID;
  }

  public async signIn(email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
    let cleanEmail = email.trim().toLowerCase();

    // Map common admin aliases to the official Admin Manager email
    if (cleanEmail === 'admin' || cleanEmail === 'admin@ebentrick.com') {
      cleanEmail = ADMIN_MANAGER_EMAIL.toLowerCase();
    }

    // 1. Try Supabase Auth first
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password: password,
      });

      if (!error && data?.user) {
        const isManager = data.user.id === ADMIN_MANAGER_UID;
        const safeUser: User = {
          id: data.user.id,
          name: data.user.user_metadata?.name || (isManager ? 'Engr. Bassey Okon' : cleanEmail.split('@')[0]),
          email: data.user.email || cleanEmail,
          role: isManager ? 'admin' : ((data.user.user_metadata?.role as UserRole) || 'client'),
          phone: data.user.user_metadata?.phone || (isManager ? '+234 803 245 8901' : undefined),
          company: data.user.user_metadata?.company || (isManager ? 'Ebentrick Global Services Ltd' : undefined),
          createdAt: data.user.created_at,
          avatarUrl: data.user.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(cleanEmail)}&backgroundColor=0284c7`,
        };

        this.currentUser = safeUser;
        try {
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(safeUser));
        } catch {}

        this.notify();
        return { success: true, user: safeUser };
      }
    } catch (sbErr) {
      console.warn('Supabase signIn error, checking local registry:', sbErr);
    }

    // 2. Check local/demo credentials fallback
    // Special handling for the designated admin manager
    if (
      (cleanEmail === ADMIN_MANAGER_EMAIL.toLowerCase() || cleanEmail === 'admin@ebentrick.com') &&
      (password === 'Mockfast1122' || password === 'admin123')
    ) {
      const adminUser: User = {
        id: ADMIN_MANAGER_UID, // Strictly designated UID
        name: 'Engr. Bassey Okon',
        email: ADMIN_MANAGER_EMAIL,
        role: 'admin',
        phone: '+234 803 245 8901',
        company: 'Ebentrick Global Services Ltd',
        createdAt: '2026-01-10T08:00:00Z',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      };

      this.currentUser = adminUser;
      try {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(adminUser));
      } catch {}

      this.notify();
      return { success: true, user: adminUser };
    }

    const userFound = this.users.find(u => u.email.toLowerCase() === cleanEmail);

    if (!userFound) {
      return { success: false, error: 'No account found with this email. Please verify credentials or sign up.' };
    }

    if (userFound.passwordHash !== password) {
      return { success: false, error: 'Incorrect password. Please try again.' };
    }

    const { passwordHash, ...safeUser } = userFound;
    
    // Strict UID check: Only ADMIN_MANAGER_UID can be admin
    if (safeUser.id !== ADMIN_MANAGER_UID && safeUser.role === 'admin') {
      safeUser.role = 'client';
    }

    this.currentUser = safeUser;
    
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(safeUser));
    } catch {}

    this.notify();
    return { success: true, user: safeUser };
  }

  public async signUp(data: {
    name: string;
    email: string;
    password: string;
    role?: UserRole;
    phone?: string;
    company?: string;
  }): Promise<{ success: boolean; user?: User; error?: string }> {
    const cleanEmail = data.email.trim().toLowerCase();
    
    // Standard users signing up CANNOT become admin; role is forced to client/student
    const assignedRole: UserRole = data.role === 'student' ? 'student' : 'client';

    // 1. Try Supabase Auth signUp
    try {
      const { data: sbData, error: sbError } = await supabase.auth.signUp({
        email: cleanEmail,
        password: data.password,
        options: {
          data: {
            name: data.name.trim(),
            role: assignedRole,
            phone: data.phone?.trim() || '',
            company: data.company?.trim() || '',
          }
        }
      });

      if (!sbError && sbData?.user) {
        // Automatically sign in so a live session and JWT are established
        try {
          await supabase.auth.signInWithPassword({
            email: cleanEmail,
            password: data.password,
          });
        } catch {}

        // Any user signing up gets their Supabase UID, never the admin manager UID
        const safeUser: User = {
          id: sbData.user.id,
          name: data.name.trim(),
          email: cleanEmail,
          role: assignedRole, // Strictly non-admin
          phone: data.phone?.trim(),
          company: data.company?.trim(),
          createdAt: sbData.user.created_at,
          avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(data.name)}&backgroundColor=0284c7`,
        };

        // Sync profile to Supabase database
        try {
          await supabase.from('profiles').upsert({
            id: sbData.user.id,
            email: cleanEmail,
            name: data.name.trim(),
            role: assignedRole,
            phone: data.phone?.trim(),
            company: data.company?.trim(),
          });
        } catch (pErr) {
          console.warn('Profile sync notice:', pErr);
        }

        this.currentUser = safeUser;
        try {
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(safeUser));
        } catch {}

        this.notify();
        return { success: true, user: safeUser };
      } else if (sbError && !sbError.message.includes('fetch')) {
        return { success: false, error: sbError.message };
      }
    } catch (sbErr) {
      console.warn('Supabase signUp fallback to local:', sbErr);
    }

    // 2. Local fallback registration
    if (this.users.some(u => u.email.toLowerCase() === cleanEmail)) {
      return { success: false, error: 'An account with this email address already exists. Please sign in.' };
    }

    const newUser: User & { passwordHash: string } = {
      id: `usr-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`, // Distinct UID, never admin
      name: data.name.trim(),
      email: cleanEmail,
      role: assignedRole, // Non-admin
      phone: data.phone?.trim(),
      company: data.company?.trim(),
      passwordHash: data.password,
      createdAt: new Date().toISOString(),
      avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(data.name)}&backgroundColor=0284c7`,
    };

    this.users.push(newUser);
    
    try {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(this.users));
    } catch {}

    const { passwordHash, ...safeUser } = newUser;
    this.currentUser = safeUser;
    
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(safeUser));
    } catch {}

    this.notify();
    return { success: true, user: safeUser };
  }

  public async logout(): Promise<void> {
    try {
      await supabase.auth.signOut();
    } catch {}
    this.currentUser = null;
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch {}
    this.notify();
  }

  public async quickLoginDemo(role: 'admin' | 'client' | 'student'): Promise<User> {
    let email = ADMIN_MANAGER_EMAIL;
    let password = 'Mockfast1122';

    if (role === 'client') {
      email = 'client@ebentrick.com';
      password = 'client123';
    } else if (role === 'student') {
      email = 'student@ebentrick.com';
      password = 'student123';
    }

    const res = await this.signIn(email, password);
    if (res.success && res.user) {
      return res.user;
    }
    throw new Error(res.error || 'Failed to sign in with demo account');
  }

  public getAllUsers(): User[] {
    return this.users.map(({ passwordHash, ...u }) => u);
  }
}

export const authService = new AuthService();
