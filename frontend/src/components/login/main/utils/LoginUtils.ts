'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { loginService } from '../services/LoginServices';
import { loginRoutes, LOGIN_API } from '../routes/LoginRoutes';
import type { LoginActions, LoginFormData, LoginState } from '../types/LoginTypes';

export function useLoginMain() {
  const router = useRouter();
  const service = loginService();

  // ============================================
  // 2️⃣ ESTADOS
  // ============================================
  const [form, setForm] = useState<LoginFormData>({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ============================================
  // 4️⃣ FUNÇÕES
  // ============================================
  const handleEmailChange = useCallback(
    (value: string) => setForm((prev) => ({ ...prev, email: value })),
    [],
  );

  const handlePasswordChange = useCallback(
    (value: string) => setForm((prev) => ({ ...prev, password: value })),
    [],
  );

  const handleSubmit = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await service.login(form);
      router.push(LOGIN_API.successRedirect);
    } catch (err) {
      const axiosErr = err as { response?: { data?: { message?: string | string[] } } };
      const msg = axiosErr?.response?.data?.message;
      setError(Array.isArray(msg) ? msg[0] : msg ?? 'Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  }, [form, router, service]);

  const navigateToRegister = useCallback(() => {
    router.push(loginRoutes.register);
  }, [router]);

  const state: LoginState = { email: form.email, password: form.password, loading, error };

  const actions: LoginActions = {
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
    navigateToRegister,
  };

  return { state, actions };
}

