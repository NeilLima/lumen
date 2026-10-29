import MetasMainComp from '@/components/metas/main';
import { MetasProviders } from '@/components/metas/main/Providers';

export default function MetasPage() {
  return (
    <MetasProviders>
      <MetasMainComp />
    </MetasProviders>
  );
}