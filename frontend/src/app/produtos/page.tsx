import ProdutosMainComp from '@/components/produtos/main';
import { ProdutosProviders } from '@/components/produtos/main/Providers';

export default function ProdutosPage() {
  return (
    <ProdutosProviders>
      <ProdutosMainComp />
    </ProdutosProviders>
  );
}