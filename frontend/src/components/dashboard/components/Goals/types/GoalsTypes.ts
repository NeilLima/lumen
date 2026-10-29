export interface GoalData {
  id: string;
  name: string;
  icon: string;
  currentAmount: number;
  targetAmount: number;
  percentage: number;
}

export interface GoalsData {
  goals: GoalData[];
}