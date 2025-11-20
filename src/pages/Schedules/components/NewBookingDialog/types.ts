export interface Court {
  id: string;
  name: string;
  pricePerHour: number; // R$ por hora
  slots: Slot[];
}

export interface NewBookingDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (payload: any) => void; 
  defaultDate: Date;
  courts: Court[];
}

export interface Slot {
  time: string; // HH:mm
}