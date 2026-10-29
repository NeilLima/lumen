import CategoriasMainComp from '@/components/categorias/main';
import { CategoriasProviders } from '@/components/categorias/main/Providers';

export default function CategoriasPage() {
  return (
    <CategoriasProviders>
      <CategoriasMainComp />
    </CategoriasProviders>
  );
}
