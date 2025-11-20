import { Button } from "@mui/material";
import { Container } from "./styles";
import type { IViewModeTabsProps } from "./types";

const ViewModeTabs = ({ tabs }: IViewModeTabsProps) => {
  return (
    <Container>
      {tabs.map((tab) => (
        <Button key={tab.title} onClick={tab.onClick}>
          {tab.title}
        </Button>
      ))}
    </Container>
  );
};

export default ViewModeTabs;
