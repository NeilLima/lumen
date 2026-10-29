import LoginMainComp from '@/components/login/main';
import LoginProviders from '@/components/login/main/Providers';

export const metadata = {
  title: 'Entrar - Lumen',
  description: 'Acesse sua conta Lumen',
};

export default function LoginPage() {
  return (
    <LoginProviders>
      <LoginMainComp />
    </LoginProviders>
  );
}
