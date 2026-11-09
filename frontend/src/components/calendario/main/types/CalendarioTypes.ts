export interface CalendarioTransacao {
  id: string;
  description: string;
  amount: number;
  type: string;
  date: string;
  status?: string | null;
  categoryName?: string | null;
  categoryColor?: string | null;
  accountName?: string | null;
}

export interface CalendarioDia {
  dia: number | null;
  data: string;
  transacoes: CalendarioTransacao[];
  totalReceitas: number;
  totalDespesas: number;
}

export interface CalendarioData {
  transacoes: CalendarioTransacao[];
}

export interface CalendarioResumo {
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
  quantidade: number;
}
