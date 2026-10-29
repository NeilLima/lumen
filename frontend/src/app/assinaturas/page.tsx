import AssinaturasMainComp from '@/components/assinaturas/main';
import { AssinaturasProviders } from '@/components/assinaturas/main/Providers';

export default function AssinaturasPage() {
  return (
    <AssinaturasProviders>
      <AssinaturasMainComp />
    </AssinaturasProviders>
  );
}
