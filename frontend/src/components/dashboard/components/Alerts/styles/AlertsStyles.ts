import styled from 'styled-components';

export const StyledCard = styled.div`background: rgba(26, 26, 46, 0.6);backdrop-filter: blur(12px);border: 1px solid rgba(255, 255, 255, 0.05);border-radius: 16px;padding: 24px;box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);min-width: 0;overflow: hidden;`;
export const StyledCardHeader = styled.div`display: flex;align-items: center;justify-content: space-between;margin-bottom: 16px;`;
export const StyledCardTitle = styled.h3`font-size: 16px;font-weight: 600;color: #ffffff;margin: 0;`;
export const StyledCardLink = styled.a`font-size: 13px;color: #8b5cf6;cursor: pointer;font-weight: 500;text-decoration: none;&:hover { color: #a78bfa; }`;
export const StyledAlertItem = styled.div<{ $type: string }>`display: flex;align-items: flex-start;gap: 12px;padding: 12px 0;border-bottom: 1px solid rgba(255, 255, 255, 0.05);&:last-child { border-bottom: none; }`;
export const StyledAlertIcon = styled.span<{ $type: string }>`width: 36px;height: 36px;border-radius: 8px;background: ${props => props.$type === 'danger' ? 'rgba(239, 68, 68, 0.1)' : props.$type === 'warning' ? 'rgba(245, 158, 11, 0.1)' : props.$type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(59, 130, 246, 0.1)'};display: flex;align-items: center;justify-content: center;font-size: 16px;color: ${props => props.$type === 'danger' ? '#ef4444' : props.$type === 'warning' ? '#f59e0b' : props.$type === 'success' ? '#10b981' : '#3b82f6'};flex-shrink: 0;`;
export const StyledAlertInfo = styled.div`flex: 1;display: flex;flex-direction: column;gap: 2px;`;
export const StyledAlertTitle = styled.span`font-size: 14px;font-weight: 500;color: #ffffff;`;
export const StyledAlertDesc = styled.span`font-size: 12px;color: #a0a0b0;line-height: 1.4;`;