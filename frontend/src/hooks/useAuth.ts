import { useState, useEffect, useMemo } from 'react';

/**
 * Hook de autenticação customizado - retorna dados do localStorage
 * Não usa next-auth, usa autenticação JWT customizada
 *
 * Usa useState + useEffect (em vez de useMemo com []) para lidar corretamente
 * com a hidratação: no servidor (SSR) window não existe, então inicia como
 * null e, após o mount no client, lê o localStorage uma única vez.
 */
export function useAuth() {
  const [userId, setUserId] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') {
      setIsChecking(false);
      return;
    }

    const localId = localStorage.getItem('userId');
    if (localId && localId !== 'undefined' && localId !== 'null') {
      setUserId(localId);
    }

    const localToken = localStorage.getItem('token');
    if (localToken) {
      setAccessToken(localToken);
    }

    setIsChecking(false);
  }, []);

  const isAuthenticated = useMemo(() => !!userId && !!accessToken, [userId, accessToken]);

  const status = useMemo(() => {
    if (isChecking) return 'checking';
    return isAuthenticated ? 'authenticated' : 'unauthenticated';
  }, [isChecking, isAuthenticated]);

  return {
    user: null,
    userId,
    accessToken,
    isAuthenticated,
    status,
    isChecking,
    session: null,
  };
}
