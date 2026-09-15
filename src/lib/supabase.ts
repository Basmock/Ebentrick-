import { createClient } from '@supabase/supabase-js';

// Supabase configuration provided for the Ebentrick project
export const SUPABASE_URL = (import.meta as any).env?.VITE_SUPABASE_URL || 'https://tvrdiaokpgxhglogjvsp.supabase.co';
export const SUPABASE_ANON_KEY = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2cmRpYW9rcGd4aGdsb2dqdnNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk0NDI1NjcsImV4cCI6MjEwNTAxODU2N30.Ql-D3VjSDFrIVrLEMANY7QJwbzISq3TeAPbjdgCP8ws';

// Designated Admin Manager UID for Ebentrick Global Services
export const ADMIN_MANAGER_UID = '350afc5a-9ae9-45d8-9c9b-ad64441da431';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storageKey: 'ebentrick_supabase_auth_token'
  }
});

/**
 * Checks strictly if a user is the authorized Project Admin Manager.
 * ONLY user with UID '350afc5a-9ae9-45d8-9c9b-ad64441da431' is the Admin Manager.
 */
export const isAdminManager = (user?: { id?: string; email?: string } | null): boolean => {
  if (!user || !user.id) return false;
  return user.id === ADMIN_MANAGER_UID;
};
