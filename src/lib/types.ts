export interface UserData {
  name: string;
  age: number;
  currentWeight: number;
  weightGoal: number;
  programDuration: number;
  takesMedication: 'yes' | 'no';
  medicationDose: string;
  personalDream: string;
}

export interface DailyProgress {
  ritual: boolean;
  nutrition: boolean;
  movement: boolean;
}
