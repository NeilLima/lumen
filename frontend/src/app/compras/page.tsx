import ComprasMainComp from '@/components/compras/main';
import { ComprasProviders } from '@/components/compras/main/Providers';

export default function ComprasPage() {
  return (
    <ComprasProviders>
      <ComprasMainComp />
    </ComprasProviders>
  );
}
