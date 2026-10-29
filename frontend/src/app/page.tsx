import DashboardMainComp, { DashboardMainProviders } from '@/components/dashboard/components/DashboardMain';

export default function Home() {
  return (
    <DashboardMainProviders>
      <DashboardMainComp />
    </DashboardMainProviders>
  );
}