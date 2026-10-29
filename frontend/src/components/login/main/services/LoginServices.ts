import { create } from '@/services/crudService';
import type { LoginFormData, LoginResponse, LoginUser } from '../types/LoginTypes';

export function loginService() {
  async function login(formData: LoginFormData): Promise<LoginResponse> {
    const response = await create<LoginResponse>('auth/login', {
      email: formData.email,
      password: formData.password,
    });

    if (typeof window !== 'undefined') {
      localStorage.setItem('token', response.token);
      localStorage.setItem('userId', response.user.id);
    }

    return response;
  }

  async function me(): Promise<LoginUser> {
    return create<LoginUser>('auth/me', {});
  }

  return { login, me };
}
