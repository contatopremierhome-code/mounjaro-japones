export interface UserData {
  name: string;
  age: number;
  currentWeight: number;
  weightGoal: number;
  takesMedication: 'yes' | 'no';
  medicationDose: string;
  personalDream: string;
}

export interface DailyProgress {
  ritual: boolean;
  nutrition: boolean;
  movement: boolean;
  dayFinished: boolean;
}

export interface ProgressHistory {
  [date: string]: DailyProgress;
}
