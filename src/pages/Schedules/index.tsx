import * as React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  MenuItem,
  Select,
  Stack,
  Typography,
  Chip,
  Tooltip,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import {
  createSchedule,
  getSchedules,
  type CreateScheduleParams,
} from "../../api/schedulesService";
import SelectedDate from "../../components/SelectDate";
import NewBookingDialog from "./components/NewBookingDialog";
import { addMinutesISO, dateTimeToISO } from "../../utils";
import { Container } from "./styles";
import HeaderPage from "../../components/HeaderPage";

type SlotStatus = "available" | "paid" | "pending";

type Slot = {
  time: string; // "08:00"
  status: SlotStatus;
};

type Court = {
  id: string;
  name: string;
  sports: string; // subtítulo
  pricePerHour: number;
  slots: Slot[];
};

const hours: string[] = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
];

function generateSlots(sampleBusy: Record<string, SlotStatus>): Slot[] {
  return hours.map((h) => ({
    time: h,
    status: sampleBusy[h] ?? "available",
  }));
}

const courtsMock: Court[] = [
  {
    id: "c1",
    name: "Quadra Society 1",
    sports: "Futebol Society",
    pricePerHour: 50,
    slots: generateSlots({
      "08:00": "available",
      "09:00": "available",
      "10:00": "available",
      "11:00": "available",
      "12:00": "available",
      "13:00": "available",
      "14:00": "available",
      "15:00": "available",
      "16:00": "available",
      "17:00": "available",
      "18:00": "available",
      "19:00": "available",
      "20:00": "paid",
      "21:00": "available",
      "22:00": "available",
    }),
  },
  {
    id: "c2",
    name: "Quadra Vôlei",
    sports: "Vôlei, Futevôlei",
    pricePerHour: 50,
    slots: generateSlots({
      "08:00": "available",
      "09:00": "available",
      "10:00": "available",
      "11:00": "available",
      "12:00": "available",
      "13:00": "available",
      "14:00": "available",
      "15:00": "available",
      "16:00": "available",
      "17:00": "available",
      "18:00": "available",
      "19:00": "available",
      "20:00": "available",
      "21:00": "available",
      "22:00": "available",
    }),
  },
];

export default function Schedules() {
  const [date, setDate] = React.useState<Date>(new Date());
  const [courtFilter, setCourtFilter] = React.useState<string>("all");
  const [openDialog, setOpenDialog] = React.useState(false);

  const newBooking = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const getCourtById = React.useCallback(
    (id: string) => courtsMock.find((c) => c.id === id),
    []
  );

  const handleSubmitBooking = async (payload: {
    courtId: string;
    courtName?: string;
    date: Date; // do DatePicker (dayjs->Date na hora do submit)
    time: string; // "HH:mm"
    durationHours: number; // 1 | 1.5 | 2 ...
    responsibleName: string;
    phone: string;
    email: string;
    people: number;
    paymentStatus: "paid" | "pending";
    total: number; // já calculado no modal
  }) => {
    try {
      const startedAt = dateTimeToISO(payload.date, payload.time);
      const rentalDuration = Math.round(payload.durationHours * 60); // minutos
      const endedAt = addMinutesISO(startedAt, rentalDuration);

      // (opcional) se quiser garantir total pelo backend/local:
      const court = getCourtById(payload.courtId);
      const recomputedTotal = court
        ? court.pricePerHour * payload.durationHours
        : payload.total;

      const params: CreateScheduleParams = {
        title: `Reserva ${payload.courtName ?? ""}`.trim(),
        rentalDuration, // em minutos
        scheduleType: "SINGLE",
        startedAt,
        endedAt,
        status: "CONFIRMED", // ajuste se quiser "PENDING"
        peopleAmount: payload.people,
        totalValue: Number(recomputedTotal.toFixed(2)),
        paymentStatus: payload.paymentStatus === "paid" ? "PAID" : "PENDING",
      };

      const res = await createSchedule(params);
      console.log("✅ Reserva criada:", res);

      setOpenDialog(false);
    } catch (err) {
      console.error("❌ Erro ao criar reserva:", err);
    }
  };

  const courts = React.useMemo(() => {
    if (courtFilter === "all") return courtsMock;
    return courtsMock.filter((c) => c.id === courtFilter);
  }, [courtFilter]);

  const onClickSlot = (court: Court, slot: Slot) => {
    if (slot.status === "available") {
      alert(`Nova reserva em ${court.name} às ${slot.time}`);
    } else if (slot.status === "paid") {
      alert(`Reserva PAGA em ${court.name} às ${slot.time}`);
    } else {
      alert(`Reserva PENDENTE em ${court.name} às ${slot.time}`);
    }
  };

  const requestGetSchedules = async () => {
    const data = await getSchedules();
    console.log(data);
  };

  React.useEffect(() => {
    requestGetSchedules();
  }, []);

  return (
    <Container>
      <HeaderPage
        title="Reservas"
        buttonTitle="Nova Reserva"
        onClickButtonRight={newBooking}
      />
      <Stack spacing={2}>
        <Card variant="outlined" sx={{ borderRadius: 3 }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ xs: "stretch", sm: "center" }}
            justifyContent="space-between"
            gap={2}
            sx={{ p: 2 }}
          >
            <SelectedDate
              value={date}
              onChange={(d) => setDate(d)}
              onPrev={() =>
                setDate(
                  (d) =>
                    new Date(d.getFullYear(), d.getMonth(), d.getDate() - 1)
                )
              }
              onNext={() =>
                setDate(
                  (d) =>
                    new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1)
                )
              }
              fullWidth
              size="medium"
            />

            <Stack
              direction="row"
              gap={1}
              alignItems="center"
              justifyContent="flex-end"
            >
              <Select
                size="small"
                value={courtFilter}
                onChange={(e) => setCourtFilter(e.target.value)}
                sx={{
                  minWidth: 180,
                  bgcolor: "background.paper",
                  borderRadius: 2,
                  fontSize: 16,
                  fontWeight: 500,
                }}
              >
                <MenuItem value="all">Todas as Quadras</MenuItem>
                {courtsMock.map((c) => (
                  <MenuItem key={c.id} value={c.id}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>

              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#169941",
                  width: 180,
                  height: 40,
                  borderRadius: 2,
                  textTransform: "none",
                  fontSize: 16,
                  fontWeight: 500,
                  "&:hover": {
                    bgcolor: "#169941",
                    boxShadow: "none",
                  },
                  "&:focus": {
                    outline: "none",
                    boxShadow: "none",
                  },
                }}
                startIcon={<AddRoundedIcon />}
                onClick={newBooking}
              >
                Nova Reserva
              </Button>
            </Stack>
          </Stack>
        </Card>

        <Stack spacing={2}>
          {courts.map((court) => (
            <Card key={court.id} variant="outlined" sx={{ borderRadius: 3 }}>
              <CardContent sx={{ p: 2.5 }}>
                <Stack gap={0.5} sx={{ mb: 1.5 }}>
                  <Typography variant="subtitle1" fontWeight={700}>
                    {court.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {court.sports}
                  </Typography>
                </Stack>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(92px, 1fr))",
                    gap: 1,
                  }}
                >
                  {court.slots.map((slot) => (
                    <SlotButton
                      key={slot.time}
                      slot={slot}
                      onClick={() => onClickSlot(court, slot)}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>

        <Divider />

        {/* Legenda */}
        <Stack direction="row" alignItems="center" gap={3} flexWrap="wrap">
          <Legend color="success" label="Disponível" />
          <Legend color="error" label="Reservado - Pago" />
          <Legend color="warning" label="Reservado - Pendente" />
        </Stack>
      </Stack>
      <NewBookingDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onSubmit={handleSubmitBooking}
        defaultDate={date}
        courts={courts.map((c) => ({
          id: c.id,
          name: c.name,
          pricePerHour: c.pricePerHour,
          slots: c.slots,
        }))}
      />
    </Container>
  );
}

function SlotButton({ slot, onClick }: { slot: Slot; onClick: () => void }) {
  // cores suaves (como na imagem) com tema MUI
  const mapStyles: Record<
    SlotStatus,
    { bg: string; border: string; text: string; hoverBg: string }
  > = {
    available: {
      bg: "rgba(46, 204, 113, 0.10)", // verde claro translúcido
      border: "rgba(46, 204, 113, 0.40)",
      text: "success.dark",
      hoverBg: "rgba(46, 204, 113, 0.18)",
    },
    paid: {
      bg: "rgba(239, 68, 68, 0.08)", // vermelho claro
      border: "rgba(239, 68, 68, 0.40)",
      text: "error.dark",
      hoverBg: "rgba(239, 68, 68, 0.16)",
    },
    pending: {
      bg: "rgba(245, 158, 11, 0.10)", // amarelo/laranja claro
      border: "rgba(245, 158, 11, 0.45)",
      text: "warning.dark",
      hoverBg: "rgba(245, 158, 11, 0.18)",
    },
  };

  const s = mapStyles[slot.status];

  return (
    <Tooltip title={tooltipByStatus(slot.status)} arrow placement="top">
      <Button
        size="small"
        variant="outlined"
        onClick={onClick}
        sx={{
          justifyContent: "center",
          fontWeight: 700,
          borderRadius: 2,
          py: 1.2,
          borderColor: s.border,
          bgcolor: s.bg,
          color: s.text,
          "&:hover": {
            borderColor: s.border,
            bgcolor: s.hoverBg,
          },
        }}
      >
        {slot.time}
      </Button>
    </Tooltip>
  );
}

function tooltipByStatus(status: SlotStatus) {
  switch (status) {
    case "available":
      return "Disponível";
    case "paid":
      return "Reservado — Pago";
    case "pending":
      return "Reservado — Pendente";
  }
}

function Legend({
  color,
  label,
}: {
  color: "success" | "error" | "warning";
  label: string;
}) {
  // Chip suave (filled com opacidade controlada)
  const map: Record<
    typeof color,
    { bg: string; text: string; border: string }
  > = {
    success: {
      bg: "rgba(46, 204, 113, 0.10)",
      text: "success.dark",
      border: "rgba(46, 204, 113, 0.35)",
    },
    error: {
      bg: "rgba(239, 68, 68, 0.08)",
      text: "error.dark",
      border: "rgba(239, 68, 68, 0.35)",
    },
    warning: {
      bg: "rgba(245, 158, 11, 0.10)",
      text: "warning.dark",
      border: "rgba(245, 158, 11, 0.35)",
    },
  } as const;

  const s = map[color];

  return (
    <Chip
      label={label}
      variant="outlined"
      sx={{
        bgcolor: s.bg,
        color: s.text,
        borderColor: s.border,
        fontWeight: 500,
      }}
    />
  );
}
