import ConfiguracoesMainComp from '@/components/configuracoes/main';
import { ConfiguracoesProviders } from '@/components/configuracoes/main/Providers';

export default function ConfiguracoesPage() {
  return (
    <ConfiguracoesProviders>
      <ConfiguracoesMainComp />
    </ConfiguracoesProviders>
  );
}
