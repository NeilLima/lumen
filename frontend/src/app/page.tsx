import AuthGateComp from '@/components/auth/main/components/AuthGateComp';
import DashboardMainComp, { DashboardMainProviders } from '@/components/dashboard/components/DashboardMain';

export default function Home() {
  return (
    <AuthGateComp>
      <DashboardMainProviders>
        <DashboardMainComp />
      </DashboardMainProviders>
    </AuthGateComp>
  );
}