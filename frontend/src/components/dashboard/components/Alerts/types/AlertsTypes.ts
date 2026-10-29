export interface AlertData {
  id: string;
  type: 'warning' | 'danger' | 'info' | 'success';
  icon: string;
  title: string;
  description: string;
}

export interface AlertsData {
  alerts: AlertData[];
}