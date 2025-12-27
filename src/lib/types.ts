export interface UserData {
  name: string;
  age: number;
  currentWeight: number;
  weightGoal: number;
  height?: number;
  takesMedication: 'yes' | 'no';
  medicationDose: string;
  personalDream: string;
}

export interface DailyProgress {
  ritual: number; // 0 to 100
  nutrition: number; // 0 to 100
  movement: number; // 0 to 100
  dayFinished: boolean;
}

export interface ProgressHistory {
  [date: string]: DailyProgress;
}
