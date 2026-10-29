import NotificacoesMainComp from '@/components/notificacoes/main';
import { NotificacoesProviders } from '@/components/notificacoes/main/Providers';

export default function NotificacoesPage() {
  return (
    <NotificacoesProviders>
      <NotificacoesMainComp />
    </NotificacoesProviders>
  );
}
