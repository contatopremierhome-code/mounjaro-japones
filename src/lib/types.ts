export interface UserData {
  name: string;
  age: number;
  currentWeight: number;
  weightGoal: number;
  height?: number;
  takesMedication: 'yes' | 'no';
  medicationDose: string;
  personalDream: string;
  onboarded: boolean;
}

export interface DailyProgress {
  ritual: number; // 0 to 100
  nutrition: number; // 0 to 100
  movement: number; // 0 to 100
  dayFinished: boolean;
}
