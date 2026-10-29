import EmprestimosMainComp from '@/components/emprestimos/main';
import { EmprestimosProviders } from '@/components/emprestimos/main/Providers';

export default function EmprestimosPage() {
  return (
    <EmprestimosProviders>
      <EmprestimosMainComp />
    </EmprestimosProviders>
  );
}
