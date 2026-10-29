import TransferenciasMainComp from '@/components/transferencias/main';
import TransferenciasProviders from '@/components/transferencias/main/Providers';

export default function TransferenciasPage() {
  return (
    <TransferenciasProviders>
      <TransferenciasMainComp />
    </TransferenciasProviders>
  );
}
