'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { isAuthenticated, getCurrentUser } from '@/lib/auth';

type User = {
  id: string;
  fullName: string;
  email: string;
} | null;

type AuthContextType = {
  user: User;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      const authenticated = isAuthenticated();
      const currentUser = getCurrentUser();

      setUser(currentUser);
      setLoading(false);

      // Redirect logic
      const publicRoutes = ['/signin', '/signup', '/forgot-password'];
      const isPublicRoute = publicRoutes.includes(pathname);

      if (!authenticated && !isPublicRoute) {
        router.push('/signin');
      } else if (authenticated && isPublicRoute) {
        router.push('/');
      }
    };

    checkAuth();
  }, [pathname, router]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
