/**
 * Serviço global de encerramento de sessão.
 * Limpa as credenciais do localStorage e fornece as rotas de autenticação.
 */

export const AUTH_ROUTES = {
  login: '/login',
  register: '/registro',
};

export function clearSession(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
}

export function logoutService() {
  return {
    clearSession,
    routes: AUTH_ROUTES,
  };
}
