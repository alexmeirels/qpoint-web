import * as React from "react";
import { useLocation, Link as RouterLink } from "react-router-dom";
import {
  Toolbar,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Divider,
  Typography,
} from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";
import logoSidebar from "../../assets/logo-sidebar.png";
import { Container } from "./styles";

type LinkItem = {
  to: string;
  label: string;
  icon: React.ReactNode;
  match: (pathname: string) => boolean;
};

const links: LinkItem[] = [
  {
    to: "/",
    label: "Home",
    icon: <HomeRoundedIcon />,
    match: (p) => p === "/",
  },
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: <DashboardRoundedIcon />,
    match: (p) => p.startsWith("/dashboard"),
  },
  {
    to: "/schedules",
    label: "Reservas",
    icon: <EventNoteRoundedIcon />,
    match: (p) => p.startsWith("/schedules"),
  },
];

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <Container >
      <Toolbar
        sx={{
          py: 3,
        }}
      >
        <Box
          component="img"
          src={logoSidebar}
          alt="Logo Marca"
          sx={{
            width: 160,
            height: "auto",
          }}
        />
      </Toolbar>
      <Divider />
      <Box
        sx={{
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: 0, // importante p/ o overflow funcionar dentro do flex
        }}
      >
        <List sx={{ py: 1 }}>
          {links.map((link) => {
            const selected = link.match(pathname);
            return (
              <ListItemButton
                key={link.to}
                component={RouterLink}
                to={link.to}
                selected={selected}
                sx={{
                  mx: 3,
                  borderRadius: 3,
                  bgcolor: selected ? "#FDB022" : "transparent",
                  transition: "background-color 0.2s ease",

                  "&.Mui-selected": {
                    bgcolor: "#FDB022",
                    "&:hover": {
                      bgcolor: "#FDB022",
                    },
                  },

                  "&:hover": {
                    bgcolor: selected
                      ? "rgba(253, 176, 34, 0.9)"
                      : "rgba(253, 176, 34, 0.1)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{ minWidth: 36, color: selected ? "#060F20" : "#FFF" }}
                >
                  {link.icon}
                </ListItemIcon>
                <ListItemText
                  primary={link.label}
                  slotProps={{
                    primary: {
                      sx: {
                        color: selected ? "#060F20" : "#FFF",
                        fontWeight: selected ? 600 : 400,
                        fontSize: 18,
                      },
                    },
                  }}
                />
              </ListItemButton>
            );
          })}
        </List>

        <Box sx={{ mt: "auto" }}>
          <Divider />
          <Box sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="caption" color="text.secondary">
              v0.1.0
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
