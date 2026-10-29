/* eslint-disable prettier/prettier */
import { Logger } from '@nestjs/common';

export const dashboardLogger = new Logger('DashboardModule');

export function logDashboardLoaded(userId: string): void {
  dashboardLogger.log(`Dashboard carregado para o usuário ${userId}`);
}
