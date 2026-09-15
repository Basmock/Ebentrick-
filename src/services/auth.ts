import { User, UserRole } from '../types';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AUTH_STORAGE_KEY = 'ebentrick_auth_user';
const USERS_STORAGE_KEY = 'ebentrick_registered_users';

// Pre-seeded accounts for immediate testing
const INITIAL_DEMO_USERS: (User & { passwordHash: string })[] = [
  {
    id: 'user-admin-1',
    name: 'Engr. Bassey Okon',
    email: 'admin@ebentrick.com',
    role: 'admin',
    phone: '+234 803 555 0192',
    company: 'Ebentrick Global Services Ltd',
    passwordHash: 'admin123',
    createdAt: '2026-01-10T08:00:00Z',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'user-client-1',
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
    id: 'user-student-1',
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
        // Ensure initial demo users exist
        INITIAL_DEMO_USERS.forEach(demo => {
          if (!this.users.some(u => u.email.toLowerCase() === demo.email.toLowerCase())) {
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
        this.currentUser = JSON.parse(activeSession);
      }
    } catch {
      this.currentUser = null;
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

  public isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }

  public async signIn(email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
    const cleanEmail = email.trim().toLowerCase();
    const userFound = this.users.find(u => u.email.toLowerCase() === cleanEmail);

    if (!userFound) {
      return { success: false, error: 'No account found with this email address. Please register or sign up.' };
    }

    if (userFound.passwordHash !== password) {
      return { success: false, error: 'Incorrect password. Please try again.' };
    }

    const { passwordHash, ...safeUser } = userFound;
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
    
    if (this.users.some(u => u.email.toLowerCase() === cleanEmail)) {
      return { success: false, error: 'An account with this email address already exists. Please sign in.' };
    }

    const newUser: User & { passwordHash: string } = {
      id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name: data.name.trim(),
      email: cleanEmail,
      role: data.role || 'client',
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

  public logout(): void {
    this.currentUser = null;
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch {}
    this.notify();
  }

  public quickLoginDemo(role: 'admin' | 'client' | 'student'): Promise<User> {
    const demo = INITIAL_DEMO_USERS.find(u => u.role === role) || INITIAL_DEMO_USERS[0];
    const { passwordHash, ...safeUser } = demo;
    this.currentUser = safeUser;
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(safeUser));
    } catch {}
    this.notify();
    return Promise.resolve(safeUser);
  }

  public getAllUsers(): User[] {
    return this.users.map(({ passwordHash, ...u }) => u);
  }
}

export const authService = new AuthService();
