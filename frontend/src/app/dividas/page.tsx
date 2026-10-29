import DividasMainComp from '@/components/dividas/main';
import { DividasProviders } from '@/components/dividas/main/Providers';

export default function DividasPage() {
  return (
    <DividasProviders>
      <DividasMainComp />
    </DividasProviders>
  );
}
