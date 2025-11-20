export interface IViewModeTabsProps {
  tabs: {
    title: string;
    onClick: () => void;
  }[];
}