import styled from 'styled-components';
import type { Theme } from '@/theme/theme';

export const StyledSplash = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props: { theme: Theme }) => props.theme.bgPrimary};

  i {
    font-size: 40px;
    color: ${(props: { theme: Theme }) => props.theme.success};
    animation: pulse 1.2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
`;
