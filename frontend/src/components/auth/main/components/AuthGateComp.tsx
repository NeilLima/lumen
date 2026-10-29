'use client';

import { useTheme } from '@/context/theme/ThemeContext';
import { useAuthGate } from '../utils/AuthGateUtils';
import { StyledSplash } from '../styles/AuthGateStyles';
import type { AuthGateTypes } from '../types/AuthGateTypes';

export default function AuthGateComp({ children }: AuthGateTypes) {
  const theme = useTheme();
  const { state } = useAuthGate();

  if (!state.isReady) {
    return (
      <StyledSplash theme={theme} data-testid="auth-splash">
        <i className="bi bi-lightning-charge-fill" />
      </StyledSplash>
    );
  }

  return <>{children}</>;
}
