import CalendarioMainComp from '@/components/calendario/main';
import { CalendarioProviders } from '@/components/calendario/main/Providers';

export default function CalendarioPage() {
  return (
    <CalendarioProviders>
      <CalendarioMainComp />
    </CalendarioProviders>
  );
}
