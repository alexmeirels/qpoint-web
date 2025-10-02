// src/api/services/userService.ts
import api from "./index";

export const schedules = "/schedules";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getSchedules = async (): Promise<any> => {
  const { data } = await api.get(schedules);
  return data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createSchedule = async (schedule: Partial<any>): Promise<any> => {
  const { data } = await api.post(schedules, schedule);
  return data;
};
