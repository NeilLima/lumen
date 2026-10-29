'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { authGateRoutes } from '../routes/AuthGateRoutes';
import type { AuthGateState } from '../types/AuthGateTypes';

/**
 * Protege rotas: redireciona para /login quando não autenticado.
 * Enquanto verifica, retorna isReady=false para exibir o splash.
 */
export function useAuthGate() {
  const router = useRouter();
  const { status, isAuthenticated } = useAuth();
  const [isReady, setIsReady] = useState(false);

  // ============================================
  // 4️⃣ FUNÇÕES
  // ============================================
  useEffect(() => {
    // Enquanto ainda estamos verificando o localStorage (hidratação),
    // não fazemos nenhum redirecionamento para evitar loops.
    if (status === 'checking') return;

    if (!isAuthenticated) {
      router.replace(authGateRoutes.login);
      return;
    }
    setIsReady(true);
  }, [status, isAuthenticated, router]);

  const state: AuthGateState = { isReady, isAuthenticated };

  return { state };
}
