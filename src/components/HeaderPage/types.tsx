import type { ReactNode } from "react";

export interface IHeaderPageProps {
  title: string;
  buttonTitle?: string;
  onClickButtonRight?: () => void;
  buttonIcon?: ReactNode;
}