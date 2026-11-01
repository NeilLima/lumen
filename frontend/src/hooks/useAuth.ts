import { useState, useEffect, useMemo, useCallback } from 'react';

/**
 * Hook de autenticação customizado - retorna dados do localStorage
 * Não usa next-auth, usa autenticação JWT customizada
 *
 * Usa useState + useEffect (em vez de useMemo com []) para lidar corretamente
 * com a hidratação: no servidor (SSR) window não existe, então inicia como
 * null e, após o mount no client, lê o localStorage uma única vez.
 *
 * Também reage a mudanças de autenticação (login/logout em outra aba ou na
 * mesma aba via evento 'auth-change') para evitar estado obsoleto em
 * componentes persistentes como o AuthGuard do layout raiz.
 */
function readAuthFromStorage() {
  if (typeof window === 'undefined') return { userId: null as string | null, token: null as string | null };
  const localId = localStorage.getItem('userId');
  const localToken = localStorage.getItem('token');
  return {
    userId: localId && localId !== 'undefined' && localId !== 'null' ? localId : null,
    token: localToken || null,
  };
}

export function useAuth() {
  const [userId, setUserId] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  const syncFromStorage = useCallback(() => {
    const { userId: id, token } = readAuthFromStorage();
    setUserId(id);
    setAccessToken(token);
    setIsChecking(false);
  }, []);

  useEffect(() => {
    syncFromStorage();

    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'token' || e.key === 'userId' || e.key === null) {
        syncFromStorage();
      }
    };
    const handleAuthChange = () => syncFromStorage();

    window.addEventListener('storage', handleStorage);
    window.addEventListener('auth-change', handleAuthChange);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('auth-change', handleAuthChange);
    };
  }, [syncFromStorage]);

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
