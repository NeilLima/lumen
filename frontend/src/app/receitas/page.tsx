import ReceitasMainComp from '@/components/receitas/main';
import { ReceitasProviders } from '@/components/receitas/main/Providers';

export default function ReceitasPage() {
  return (
    <ReceitasProviders>
      <ReceitasMainComp />
    </ReceitasProviders>
  );
}