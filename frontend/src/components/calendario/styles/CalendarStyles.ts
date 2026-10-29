import styled from 'styled-components';

export const StyledCalendarContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const StyledCalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const StyledCalendarTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  text-transform: capitalize;
`;

export const StyledCalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
`;

export const StyledCalendarDay = styled.div`
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-size: 14px;
  color: #374151;
  background: #f9fafb;
  
  &:hover {
    background: #e5e7eb;
  }
`;

export const StyledDayHeader = styled.div`
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 12px;
  color: #6b7280;
  text-transform: uppercase;
`;