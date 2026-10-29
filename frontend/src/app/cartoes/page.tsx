import CartoesMainComp from '@/components/cartoes/main';
import CartoesProviders from '@/components/cartoes/main/Providers';

export default function CartoesPage() {
  return (
    <CartoesProviders>
      <CartoesMainComp />
    </CartoesProviders>
  );
}