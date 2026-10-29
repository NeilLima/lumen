import AjudaMainComp from '@/components/ajuda/main';
import { AjudaProviders } from '@/components/ajuda/main/Providers';

export default function AjudaPage() {
  return (
    <AjudaProviders>
      <AjudaMainComp />
    </AjudaProviders>
  );
}
