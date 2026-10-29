import RegisterMainComp from '@/components/registro/main';
import RegisterProviders from '@/components/registro/main/Providers';

export const metadata = {
  title: 'Criar conta - Lumen',
  description: 'Crie sua conta Lumen',
};

export default function RegisterPage() {
  return (
    <RegisterProviders>
      <RegisterMainComp />
    </RegisterProviders>
  );
}
