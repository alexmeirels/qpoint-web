import { Button, Typography } from "@mui/material";
import { Container } from "./styles";
import type { IHeaderPageProps } from "./types";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

const HeaderPage = ({
  title,
  buttonTitle,
  onClickButtonRight,
  buttonIcon,
}: IHeaderPageProps) => {
  return (
    <Container>
      <Typography sx={{ color: "#021226", fontSize: 28, fontWeight: 600 }}>
        {title}
      </Typography>
      {onClickButtonRight && (
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#FDB022",
            padding: "14px 10px",
            borderRadius: 3,
            textTransform: "none",
            fontSize: 16,
            fontWeight: 500,
            "&:hover": {
              bgcolor: "#FDB022",
              boxShadow: "none",
            },
            "&:focus": {
              outline: "none",
              boxShadow: "none",
            },
          }}
          startIcon={
            buttonIcon || (
              <AddRoundedIcon
                sx={{ color: "#060F20", width: 24, height: 24 }}
              />
            )
          }
          onClick={onClickButtonRight}
        >
          <Typography
            sx={{ fontSize: 16, fontWeight: 600, color: "#060F20" }}
            fontWeight="bold"
          >
            {buttonTitle || "Nova Reserva"}
          </Typography>
        </Button>
      )}
    </Container>
  );
};

export default HeaderPage;
