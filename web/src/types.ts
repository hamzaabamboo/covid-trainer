export type Levels = "beginner" | "intermediate" | "pro" | "h" | null;

export const repsData: { [level: string]: (reps: number) => boolean } = {
  beginner: (reps: number) => reps > 0 && reps < 20,
  intermediate: (reps: number) => reps > 21 && reps < 60,
  pro: (reps: number) => reps > 61,
  h: (reps: number) => reps > 2000,
};
