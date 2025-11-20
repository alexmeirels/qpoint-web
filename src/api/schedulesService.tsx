// src/api/services/userService.ts
import api from "./index";

export const schedules = "/schedules";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getSchedules = async (): Promise<any> => {
  const { data } = await api.get(schedules);
  console.log(data);
  return data;
};

// 🧩 Tipo para os parâmetros
export interface CreateScheduleParams {
  title: string;
  rentalDuration: number; 
  scheduleType: "SINGLE" | "RECURRING";
  startedAt: string; 
  endedAt: string;
  status: "CONFIRMED" | "PENDING" | "CANCELLED";
  peopleAmount: number;
  totalValue: number;
  paymentStatus: "PAID" | "PENDING";
}

// 🧠 Função usando o tipo
export const createSchedule = async (
  params: CreateScheduleParams
): Promise<CreateScheduleParams> => {
  const { data } = await api.post("/schedules", params);
  return data;
};
