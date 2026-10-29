export interface KpiCard {
  id: string;
  icon: string;
  iconColor: string;
  iconBg: string;
  title: string;
  value: string;
  percentage: number;
  trend: 'up' | 'down';
  trendText: string;
}

export interface KpiCardsData {
  cards: KpiCard[];
}