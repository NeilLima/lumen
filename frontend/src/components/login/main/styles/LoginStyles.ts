import styled from 'styled-components';
import type { Theme } from '@/theme/theme';

export const StyledLoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props: { theme: Theme }) => props.theme.bgPrimary};
  padding: 16px;

  @media (min-width: 768px) {
    padding: 32px;
  }
`;

export const StyledLoginCard = styled.div`
  width: 100%;
  max-width: 420px;
  background: ${(props: { theme: Theme }) => props.theme.bgCard};
  border: 1px solid ${(props: { theme: Theme }) => props.theme.borderColor};
  border-radius: ${(props: { theme: Theme }) => props.theme.radiusXl};
  box-shadow: ${(props: { theme: Theme }) => props.theme.shadowXl};
  backdrop-filter: blur(10px);
  padding: 32px;

  @media (min-width: 768px) {
    padding: 40px;
  }
`;

export const StyledLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 8px;

  i {
    font-size: 32px;
    color: ${(props: { theme: Theme }) => props.theme.success};
  }
`;

export const StyledTitle = styled.h1`
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  color: ${(props: { theme: Theme }) => props.theme.textPrimary};
  margin-bottom: 4px;
`;

export const StyledSubtitle = styled.p`
  text-align: center;
  font-size: 14px;
  color: ${(props: { theme: Theme }) => props.theme.textSecondary};
  margin-bottom: 32px;
`;

export const StyledField = styled.div`
  margin-bottom: 20px;
`;

export const StyledLabel = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: ${(props: { theme: Theme }) => props.theme.textSecondary};
  margin-bottom: 8px;
`;

export const StyledInputWrapper = styled.div`
  position: relative;

  i {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: ${(props: { theme: Theme }) => props.theme.textMuted};
    font-size: 15px;
  }
`;

export const StyledInput = styled.input`
  width: 100%;
  background: ${(props: { theme: Theme }) => props.theme.bgTertiary};
  border: 1px solid ${(props: { theme: Theme }) => props.theme.borderColor};
  border-radius: ${(props: { theme: Theme }) => props.theme.radiusMd};
  color: ${(props: { theme: Theme }) => props.theme.textPrimary};
  font-size: 14px;
  font-family: ${(props: { theme: Theme }) => props.theme.fontFamily};
  padding: 12px 14px 12px 40px;
  transition: border-color ${(props: { theme: Theme }) => props.theme.transitionFast} ease;
  outline: none;

  &::placeholder {
    color: ${(props: { theme: Theme }) => props.theme.textMuted};
  }

  &:focus {
    border-color: ${(props: { theme: Theme }) => props.theme.success};
  }
`;

export const StyledError = styled.div`
  background: ${(props: { theme: Theme }) => props.theme.dangerBg};
  border: 1px solid ${(props: { theme: Theme }) => props.theme.danger};
  border-radius: ${(props: { theme: Theme }) => props.theme.radiusMd};
  color: ${(props: { theme: Theme }) => props.theme.dangerLight};
  font-size: 13px;
  padding: 10px 14px;
  margin-bottom: 20px;
`;

export const StyledSubmitButton = styled.button`
  width: 100%;
  background: ${(props: { theme: Theme }) => props.theme.success};
  color: #ffffff;
  font-size: 15px;
  font-weight: 600;
  font-family: ${(props: { theme: Theme }) => props.theme.fontFamily};
  border: none;
  border-radius: ${(props: { theme: Theme }) => props.theme.radiusMd};
  padding: 12px;
  cursor: pointer;
  transition: background ${(props: { theme: Theme }) => props.theme.transitionFast} ease;

  &:hover:not(:disabled) {
    background: ${(props: { theme: Theme }) => props.theme.successLight};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const StyledFooter = styled.div`
  text-align: center;
  font-size: 13px;
  color: ${(props: { theme: Theme }) => props.theme.textSecondary};
  margin-top: 24px;
`;

export const StyledFooterLink = styled.button`
  background: none;
  border: none;
  color: ${(props: { theme: Theme }) => props.theme.success};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  padding: 0;

  &:hover {
    color: ${(props: { theme: Theme }) => props.theme.successLight};
    text-decoration: underline;
  }
`;
