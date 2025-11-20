export type SelectedDateSize = "small" | "medium";

export interface ISelectedDateProps {
  value: Date;
  onChange: (nextDate: Date) => void;
  onPrev?: () => void;
  onNext?: () => void;

  /** formata o texto exibido (ex.: "segunda, 14 de outubro de 2025") */
  formatLabel?: (date: Date) => string;

  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  size?: SelectedDateSize;
  fullWidth?: boolean;
  className?: string;
}
