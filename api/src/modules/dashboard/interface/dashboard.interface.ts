/* eslint-disable prettier/prettier */
export interface IDashboardService {
  getDashboard(userId: string): Promise<Record<string, unknown>>;
}

