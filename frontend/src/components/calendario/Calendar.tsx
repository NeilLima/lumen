'use client';

import { useState } from 'react';
import {
  StyledCalendarContainer,
  StyledCalendarHeader,
  StyledCalendarTitle,
  StyledCalendarGrid,
  StyledCalendarDay,
  StyledDayHeader,
} from './styles/CalendarStyles';

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const mesAtual = currentDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' });

  const primeiroDia = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const ultimoDia = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const diasNoMes = ultimoDia.getDate();
  const diaInicio = primeiroDia.getDay();

  const gerarDias = () => {
    const dias = [];
    for (let i = 0; i < diaInicio; i++) {
      dias.push(null);
    }
    for (let i = 1; i <= diasNoMes; i++) {
      dias.push(i);
    }
    return dias;
  };

  const mesAnterior = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const proximoMes = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  return (
    <StyledCalendarContainer>
      <StyledCalendarHeader>
        <StyledCalendarTitle>{mesAtual}</StyledCalendarTitle>
        <div>
          <button onClick={mesAnterior}>←</button>
          <button onClick={proximoMes}>→</button>
        </div>
      </StyledCalendarHeader>

      <StyledCalendarGrid>
        {diasSemana.map(dia => (
          <StyledDayHeader key={dia}>{dia}</StyledDayHeader>
        ))}
        {gerarDias().map((dia, index) => (
          <StyledCalendarDay key={index}>
            {dia || ''}
          </StyledCalendarDay>
        ))}
      </StyledCalendarGrid>
    </StyledCalendarContainer>
  );
}