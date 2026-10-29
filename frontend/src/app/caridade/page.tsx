import CaridadeMainComp from '@/components/caridade/main';
import { CaridadeProviders } from '@/components/caridade/main/Providers';

export default function CaridadePage() {
  return (
    <CaridadeProviders>
      <CaridadeMainComp />
    </CaridadeProviders>
  );
}
