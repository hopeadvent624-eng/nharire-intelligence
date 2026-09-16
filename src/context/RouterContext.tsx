import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type AppRoute =
  | '/'
  | '/about'
  | '/platform'
  | '/solutions'
  | '/case-studies'
  | '/faq'
  | '/contact'
  | '/privacy-policy'
  | '/thank-you'
  | '/404';

interface RouterContextType {
  currentPath: string;
  navigate: (to: string) => void;
  canonicalUrl: string;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export const RouterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const p = window.location.pathname;
      return p === '' ? '/' : p;
    }
    return '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (to: string) => {
    if (typeof window !== 'undefined') {
      if (window.location.pathname !== to) {
        window.history.pushState({}, '', to);
      }
      setCurrentPath(to);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const canonicalUrl = `https://nharire.com${currentPath === '/' ? '' : currentPath}`;

  return (
    <RouterContext.Provider value={{ currentPath, navigate, canonicalUrl }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = (): RouterContextType => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};
