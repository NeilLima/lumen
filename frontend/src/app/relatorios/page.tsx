import RelatoriosMainComp from '@/components/relatorios/main';
import { RelatoriosProviders } from '@/components/relatorios/main/Providers';

export default function RelatoriosPage() {
  return (
    <RelatoriosProviders>
      <RelatoriosMainComp />
    </RelatoriosProviders>
  );
}
