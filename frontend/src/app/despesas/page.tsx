import DespesasMainComp from '@/components/despesas/main';
import { DespesasProviders } from '@/components/despesas/main/Providers';

export default function DespesasPage() {
  return (
    <DespesasProviders>
      <DespesasMainComp />
    </DespesasProviders>
  );
}