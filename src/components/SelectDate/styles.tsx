import styled, { css } from "styled-components";
import { IconButton, Typography, Stack, Popover, Paper } from "@mui/material";

export const Root = styled.div<{ $fullWidth?: boolean }>`
  display: flex;
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};
`;

export const Row = styled(Stack)<{ $size: "small" | "medium" }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${({ $size }) => ($size === "small" ? 8 : 12)}px;
`;

export const NavButton = styled(IconButton)<{ $size: "small" | "medium" }>`
  border-radius: 8px;
  ${({ $size }) =>
    $size === "small"
      ? css`
          width: 28px;
          height: 28px;
        `
      : css`
          width: 36px;
          height: 36px;
        `}
  /* remove realces de foco/hover padrão */
  &:focus,
  &:focus-visible,
  &:active {
    outline: none !important;
    box-shadow: none !important;
  }
  &.Mui-focusVisible {
    outline: none !important;
    box-shadow: none !important;
  }
  &::-moz-focus-inner {
    border: 0 !important;
  }
  &:-moz-focusring {
    outline: none !important;
  }
`;

export const DateIconWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const DateText = styled(Typography)<{ $size: "small" | "medium" }>`
  font-weight: 700;
  ${({ $size }) =>
    $size === "small"
      ? css`
          font-size: 0.95rem;
          line-height: 1.2;
        `
      : css`
          font-size: 1.1rem;
          line-height: 1.3;
        `}
  white-space: nowrap;
`;

export const CalendarButton = styled(IconButton)<{ $size: "small" | "medium" }>`
  border-radius: 8px;
  ${({ $size }) =>
    $size === "small"
      ? css`
          width: 32px;
          height: 32px;
        `
      : css`
          width: 36px;
          height: 36px;
        `}

  /* sem anéis de foco azuis */
  &:focus,
  &:focus-visible,
  &:active {
    outline: none !important;
    box-shadow: none !important;
  }
  &.Mui-focusVisible {
    outline: none !important;
    box-shadow: none !important;
  }
  &::-moz-focus-inner {
    border: 0 !important;
  }
  &:-moz-focusring {
    outline: none !important;
  }
`;

export const CalendarPopover = styled(Popover)``;

export const CalendarPaper = styled(Paper)`
  padding: 8px;
  border-radius: 12px;
`;
