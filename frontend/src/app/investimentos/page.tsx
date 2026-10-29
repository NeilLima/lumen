import InvestimentosMainComp from '@/components/investimentos/main';
import { InvestimentosProviders } from '@/components/investimentos/main/Providers';

export default function InvestimentosPage() {
  return (
    <InvestimentosProviders>
      <InvestimentosMainComp />
    </InvestimentosProviders>
  );
}
