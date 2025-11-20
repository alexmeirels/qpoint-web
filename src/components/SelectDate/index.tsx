import * as React from "react";
import {
  ChevronLeftRounded as ChevronLeftRoundedIcon,
  ChevronRightRounded as ChevronRightRoundedIcon,
  CalendarTodayRounded as CalendarTodayRoundedIcon,
} from "@mui/icons-material";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import {
  Root,
  Row,
  NavButton,
  DateText,
  CalendarButton,
  CalendarPopover,
  CalendarPaper,
} from "./styles";
import type { ISelectedDateProps } from "./types";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

const defaultFormat = (date: Date) =>
  new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
    .format(date)
    .replace(/^\w/, (c) => c.toUpperCase());

export default function SelectedDate({
  value,
  onChange,
  onPrev,
  onNext,
  formatLabel = defaultFormat,
  minDate,
  maxDate,
  disabled,
  size = "medium",
  fullWidth,
  className,
}: ISelectedDateProps) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const openCalendar = (e: React.MouseEvent<HTMLElement>) => {
    if (disabled) return;
    setAnchorEl(e.currentTarget);
  };

  const closeCalendar = () => setAnchorEl(null);
  const open = Boolean(anchorEl);

  const handleSelectDate = (nextValue: Dayjs | null) => {
    if (!nextValue) return;

    const dateObj = nextValue.toDate();
    if (dateObj instanceof Date && !isNaN(dateObj.getTime())) {
      onChange(dateObj);
      closeCalendar();
    }
  };

  return (
    <Root className={className} $fullWidth={fullWidth}>
      <Row direction="row" alignItems="center" gap={1.5} $size={size}>
        <NavButton
          $size={size}
          size="small"
          onClick={onPrev}
          disabled={disabled}
          disableRipple
          disableFocusRipple
        >
          <ChevronLeftRoundedIcon />
        </NavButton>

        <NavButton
          $size={size}
          size="small"
          onClick={onNext}
          disabled={disabled}
          disableRipple
          disableFocusRipple
        >
          <ChevronRightRoundedIcon />
        </NavButton>

        <CalendarButton
          aria-label="Abrir calendário"
          onClick={openCalendar}
          $size={size}
          disabled={disabled}
          disableRipple
          disableFocusRipple
        >
          <CalendarTodayRoundedIcon />
        </CalendarButton>

        <DateText $size={size} variant="h6">
          {formatLabel(value)}
        </DateText>

        <CalendarPopover
          open={open}
          anchorEl={anchorEl}
          onClose={closeCalendar}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <CalendarPaper elevation={4}>
            <DateCalendar
              value={value ? dayjs(value) : null}
              onChange={handleSelectDate}
              minDate={minDate ? dayjs(minDate) : undefined}
              maxDate={maxDate ? dayjs(maxDate) : undefined}
              disabled={disabled}
              slotProps={{ day: { disableRipple: true } }}
            />
          </CalendarPaper>
        </CalendarPopover>
      </Row>
    </Root>
  );
}
