import React, { createContext, useContext, useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'ebentrick_theme_v2';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Check localStorage first
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored === 'light' || stored === 'dark') {
        return stored;
      }
    }
    return 'light'; // Default to neat clean white background mode
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
      root.style.colorScheme = 'light';
    }
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // ignore storage quota errors
    }
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark: theme === 'dark', toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const defaultThemeContext: ThemeContextType = {
  theme: 'dark',
  isDark: true,
  toggleTheme: () => {},
  setTheme: () => {},
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    return defaultThemeContext;
  }
  return context;
};

interface ThemeToggleProps {
  className?: string;
  variant?: 'button' | 'pill' | 'compact';
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = '',
  variant = 'button',
  showLabel = false,
}) => {
  const { theme, isDark, toggleTheme } = useTheme();

  if (variant === 'pill') {
    return (
      <button
        type="button"
        id="theme-toggle-pill"
        onClick={toggleTheme}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border shadow-sm ${
          isDark
            ? 'bg-slate-800/90 hover:bg-slate-700 text-slate-200 border-slate-700 hover:border-slate-600'
            : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300 hover:border-slate-400'
        } ${className}`}
      >
        <span className="relative flex items-center justify-center w-4 h-4">
          {isDark ? (
            <Sun className="w-3.5 h-3.5 text-amber-400 animate-in spin-in-180 duration-300" />
          ) : (
            <Moon className="w-3.5 h-3.5 text-indigo-600 animate-in spin-in-180 duration-300" />
          )}
        </span>
        <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
      </button>
    );
  }

  if (variant === 'compact') {
    return (
      <button
        type="button"
        id="theme-toggle-compact"
        onClick={toggleTheme}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        className={`p-2 rounded-xl transition-all border ${
          isDark
            ? 'bg-slate-800 text-amber-400 hover:text-amber-300 hover:bg-slate-700 border-slate-700'
            : 'bg-white text-indigo-600 hover:text-indigo-700 hover:bg-slate-100 border-slate-200'
        } ${className}`}
      >
        {isDark ? (
          <Sun className="w-4 h-4" />
        ) : (
          <Moon className="w-4 h-4" />
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      id="theme-toggle-btn"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`group relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all border shadow-sm ${
        isDark
          ? 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border-slate-700 hover:border-slate-600'
          : 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border-slate-300 hover:border-slate-400'
      } ${className}`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-4 h-4 text-amber-400 transition-transform group-hover:rotate-45" />
        ) : (
          <Moon className="w-4 h-4 text-indigo-600 transition-transform group-hover:-rotate-12" />
        )}
      </div>
      {showLabel && (
        <span className="hidden md:inline font-mono text-[11px]">
          {isDark ? 'Light' : 'Dark'}
        </span>
      )}
    </button>
  );
};
