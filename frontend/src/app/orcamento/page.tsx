import OrcamentoMainComp from '@/components/orcamento/main';
import { OrcamentoProviders } from '@/components/orcamento/main/Providers';

export default function OrcamentoPage() {
  return (
    <OrcamentoProviders>
      <OrcamentoMainComp />
    </OrcamentoProviders>
  );
}
