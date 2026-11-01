'use client';

import { useAuthGate } from '../utils/AuthGateUtils';
import type { AuthGateTypes } from '../types/AuthGateTypes';

export default function AuthGateComp({ children }: AuthGateTypes) {
  const { state } = useAuthGate();

  if (!state.isReady) {
    return (
      <div
        data-testid="auth-splash"
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0f172a',
        }}
      >
        <i
          className="bi bi-lightning-charge-fill"
          style={{ fontSize: 40, color: '#22c55e', animation: 'pulse 1.2s ease-in-out infinite' }}
        />
        <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`}</style>
      </div>
    );
  }

  return <>{children}</>;
}
