import EstoqueMainComp from '@/components/estoque/main';
import { EstoqueProviders } from '@/components/estoque/main/Providers';

export default function EstoquePage() {
  return (
    <EstoqueProviders>
      <EstoqueMainComp />
    </EstoqueProviders>
  );
}