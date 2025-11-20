import * as React from "react";
import {
  Dialog,
  DialogActions,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

import {
  TitleRow,
  Content,
  SectionTitle,
  FormGrid,
  FieldCol,
  ValueCard,
  ValueRow,
  SubNote,
} from "./styles";
import type { NewBookingDialogProps } from "./types";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { NewBookingFormData } from "./schemas";
import { NewBookingSchema } from "./schemas";

const DURATION_OPTIONS = [
  { label: "1h", hours: 1 },
  { label: "1h 30m", hours: 1.5 },
  { label: "2h", hours: 2 },
];

export default function NewBookingDialog({
  open,
  onClose,
  onSubmit,
  defaultDate,
  courts,
}: NewBookingDialogProps) {
  // estados não obrigatórios no formulário
  const [courtId, setCourtId] = React.useState(courts[0]?.id ?? "");
  const [date, setDate] = React.useState<Dayjs>(dayjs(defaultDate));
  const [time, setTime] = React.useState<string>("20:00");
  const [duration, setDuration] = React.useState<number>(1);
  const [paymentStatus, setPaymentStatus] = React.useState<"pending" | "paid">(
    "pending"
  );

  React.useEffect(() => {
    setDate(dayjs(defaultDate));
  }, [defaultDate]);

  const selectedCourt = React.useMemo(
    () => courts.find((c) => c.id === courtId) ?? courts[0],
    [courtId, courts]
  );

  const total = React.useMemo(() => {
    const v = (selectedCourt?.pricePerHour ?? 0) * duration;
    return v;
  }, [selectedCourt, duration]);

  // ✅ React Hook Form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm<NewBookingFormData>({
    resolver: zodResolver(NewBookingSchema),
    mode: "onChange",
    defaultValues: {
      responsibleName: "",
      phone: "",
      email: "",
      people: 1,
    },
  });

  // mantem people como number
  const peopleValue = watch("people");

  const onSave = (data: NewBookingFormData) => {
    onSubmit({
      courtId,
      courtName: selectedCourt?.name,
      date: date.toDate(),
      time,
      durationHours: duration,
      responsibleName: data.responsibleName,
      phone: data.phone,
      email: data.email,
      people: data.people,
      paymentStatus,
      total,
    });
    // opcional: resetar o form ao fechar
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <TitleRow>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Nova Reserva
        </Typography>
        <IconButton aria-label="Fechar" onClick={handleClose}>
          <CloseRoundedIcon />
        </IconButton>
      </TitleRow>

      <Content dividers>
        {/* Linha: Quadra */}
        <FormGrid>
          <FieldCol span={12}>
            <Typography variant="subtitle2" sx={{ mb: 0.75 }}>
              Quadra
            </Typography>
            <Select
              value={courtId}
              onChange={(e) => setCourtId(e.target.value as string)}
              fullWidth
              size="small"
              sx={{ borderRadius: 2 }}
            >
              {courts.map((c) => (
                <MenuItem key={c.id} value={c.id}>
                  {c.name} — R$ {c.pricePerHour?.toFixed(2)}/hora
                </MenuItem>
              ))}
            </Select>
          </FieldCol>

          {/* Data / Horário / Duração */}
          <FieldCol span={4}>
            <Typography variant="subtitle2" sx={{ mb: 0.75 }}>
              Data
            </Typography>
            <DatePicker
              value={date}
              onChange={(d) => d && setDate(d)}
              minDate={dayjs()} // 👈 permite apenas hoje em diante
              slotProps={{
                textField: {
                  size: "small",
                  fullWidth: true,
                  InputProps: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarMonthRoundedIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  },
                  sx: { borderRadius: 2 },
                },
              }}
            />
            <SubNote sx={{ mt: 0.5 }}>
              {date.format("dddd, DD [de] MMMM [de] YYYY")}
            </SubNote>
          </FieldCol>

          <FieldCol span={4}>
            <Typography variant="subtitle2" sx={{ mb: 0.75 }}>
              Horário
            </Typography>
            <Select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              fullWidth
              size="small"
              sx={{ borderRadius: 2 }}
            >
              {selectedCourt?.slots.map((opt) => (
                <MenuItem key={opt.time} value={opt.time}>
                  {opt.time}
                </MenuItem>
              ))}
            </Select>
          </FieldCol>

          <FieldCol span={4}>
            <Typography variant="subtitle2" sx={{ mb: 0.75 }}>
              Duração
            </Typography>
            <Select
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              fullWidth
              size="small"
              sx={{ borderRadius: 2 }}
            >
              {DURATION_OPTIONS.map((opt) => (
                <MenuItem key={opt.label} value={opt.hours}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </FieldCol>
        </FormGrid>

        {/* Dados do Cliente */}
        <SectionTitle>
          <PersonOutlineRoundedIcon fontSize="medium" />
          <Typography variant="subtitle1" fontWeight={600}>
            Dados do Cliente
          </Typography>
        </SectionTitle>

        <FormGrid>
          <FieldCol span={12}>
            <TextField
              required
              label="Nome do Responsável"
              {...register("responsibleName")}
              error={!!errors.responsibleName}
              helperText={errors.responsibleName?.message}
              size="small"
              fullWidth
              sx={{ borderRadius: 2 }}
            />
          </FieldCol>

          <FieldCol span={6}>
            <TextField
              label="Telefone"
              required
              {...register("phone")}
              error={!!errors.phone}
              helperText={errors.phone?.message}
              size="small"
              fullWidth
              placeholder="(11) 99999-9999"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneRoundedIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
              sx={{ borderRadius: 2 }}
            />
          </FieldCol>

          <FieldCol span={6}>
            <TextField
              label="E-mail"
              required
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              size="small"
              fullWidth
              placeholder="cliente@email.com"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailRoundedIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
              sx={{ borderRadius: 2 }}
            />
          </FieldCol>

          <FieldCol span={12}>
            <TextField
              label="Número Estimado de Pessoas"
              type="number"
              value={peopleValue}
              onChange={(e) =>
                setValue("people", Math.max(1, Number(e.target.value)), {
                  shouldValidate: true,
                })
              }
              error={!!errors.people}
              helperText={errors.people?.message}
              size="small"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <GroupsRoundedIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
              sx={{ borderRadius: 2 }}
            />
            <SubNote sx={{ mt: 0.5 }}>Capacidade máxima: 14 pessoas</SubNote>
          </FieldCol>
        </FormGrid>

        {/* Pagamento */}
        <SectionTitle>
          <AttachMoneyRoundedIcon fontSize="small" />
          <Typography variant="subtitle1" fontWeight={600}>
            Pagamento
          </Typography>
        </SectionTitle>

        <ValueCard>
          <ValueRow>
            <Typography fontWeight={600} color="#20864F">
              Valor Total:
            </Typography>
            <Typography variant="h6" fontWeight={800} color="#0F5B30">
              R$ {total?.toFixed(2)}
            </Typography>
          </ValueRow>
          <Typography sx={{ mt: 1 }} color="#009B46">
            R$ {selectedCourt?.pricePerHour?.toFixed(2)}/hora ×{" "}
            {DURATION_OPTIONS.find((d) => d.hours === duration)?.label}
          </Typography>
        </ValueCard>

        <Stack sx={{ mt: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Status do Pagamento
          </Typography>
          <RadioGroup
            row
            value={paymentStatus}
            onChange={(e) =>
              setPaymentStatus(e.target.value as "paid" | "pending")
            }
          >
            <FormControlLabel
              value="pending"
              control={<Radio />}
              label="Pendente"
            />
            <FormControlLabel value="paid" control={<Radio />} label="Pago" />
          </RadioGroup>
        </Stack>
      </Content>

      <DialogActions sx={{ p: 2.5 }}>
        <Button
          onClick={handleClose}
          variant="text"
          sx={{ textTransform: "none" }}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit(onSave)}
          variant="contained"
          disabled={!isValid}
          sx={{
            bgcolor: "#169941",
            "&:hover": { bgcolor: "#169941" },
            textTransform: "none",
            borderRadius: 2,
          }}
        >
          Confirmar Reserva
        </Button>
      </DialogActions>
    </Dialog>
  );
}
