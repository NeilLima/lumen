'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

/**
 * AuthGuard - Protege todas as rotas da aplicação.
 *
 * Regras:
 * - Se o usuário NÃO estiver autenticado e tentar acessar qualquer rota
 *   diferente de /login e /registro, é redirecionado para /login.
 * - Se o usuário já estiver autenticado e acessar /login ou /registro,
 *   a página é carregada normalmente (a própria página de login decide o que fazer).
 *
 * Deve ser envolver as crianças no RootLayout para proteger todas as páginas.
 */
export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { status, isAuthenticated } = useAuth();

  const publicRoutes = ['/login', '/registro'];
  const isPublicRoute = publicRoutes.includes(pathname);

  useEffect(() => {
    // Enquanto ainda estamos verificando o localStorage (hidratação),
    // não fazemos nenhum redirecionamento para evitar loops.
    if (status === 'checking') return;

    if (!isAuthenticated) {
      if (!isPublicRoute) {
        router.replace('/login');
      }
      return;
    }

    // Usuário autenticado pode acessar /login e /registro livremente.
    // A própria página de login decide o que fazer (ex: mostrar mensagem "já está logado").
  }, [status, isAuthenticated, isPublicRoute, router, pathname]);

  return <>{children}</>;
}
