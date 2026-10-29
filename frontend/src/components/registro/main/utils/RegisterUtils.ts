'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { registerService } from '../services/RegisterServices';
import { registerRoutes, REGISTER_API } from '../routes/RegisterRoutes';
import { useAuth } from '@/hooks/useAuth';
import type { RegisterActions, RegisterFormData, RegisterState } from '../types/RegisterTypes';

export function useRegisterMain() {
  const router = useRouter();
  const service = registerService();
  const { status, isAuthenticated } = useAuth();

  // ============================================
  // 2️⃣ ESTADOS
  // ============================================
  const [form, setForm] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ============================================
  // 4️⃣ FUNÇÕES
  // ============================================
  // Já autenticado vai direto para o dashboard
  useEffect(() => {
    // Enquanto ainda estamos verificando o localStorage (hidratação),
    // não fazemos nenhum redirecionamento para evitar loops.
    if (status === 'checking') return;

    if (isAuthenticated) {
      router.replace(REGISTER_API.successRedirect);
    }
  }, [status, isAuthenticated, router]);

  const handleFirstNameChange = useCallback(
    (value: string) => setForm((prev) => ({ ...prev, firstName: value })),
    [],
  );

  const handleLastNameChange = useCallback(
    (value: string) => setForm((prev) => ({ ...prev, lastName: value })),
    [],
  );

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
      await service.register(form);
      router.push(REGISTER_API.successRedirect);
    } catch (err) {
      const axiosErr = err as { response?: { data?: { message?: string | string[] } } };
      const msg = axiosErr?.response?.data?.message;
      setError(
        Array.isArray(msg)
          ? msg[0]
          : msg ?? 'Erro ao criar conta. Verifique os dados informados.',
      );
    } finally {
      setLoading(false);
    }
  }, [form, router, service]);

  const navigateToLogin = useCallback(() => {
    router.push(registerRoutes.login);
  }, [router]);

  const state: RegisterState = {
    firstName: form.firstName,
    lastName: form.lastName,
    email: form.email,
    password: form.password,
    loading,
    error,
  };

  const actions: RegisterActions = {
    handleFirstNameChange,
    handleLastNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
    navigateToLogin,
  };

  return { state, actions };
}
