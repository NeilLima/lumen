import { create } from '@/services/crudService';
import type { RegisterFormData, RegisterResponse } from '../types/RegisterTypes';

export function registerService() {
  async function register(formData: RegisterFormData): Promise<RegisterResponse> {
    const response = await create<RegisterResponse>('auth/register', {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    });

    if (typeof window !== 'undefined') {
      localStorage.setItem('token', response.token);
      localStorage.setItem('userId', response.user.id);
    }

    return response;
  }

  return { register };
}
