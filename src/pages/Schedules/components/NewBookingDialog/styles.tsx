import styled from "styled-components";
import { Box, Typography, DialogContent } from "@mui/material";

export const TitleRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px 16px 24px;
  border: 1px solid transparent;
`;

export const Content = styled(DialogContent)`
  padding: 16px 24px 24px 24px;
`;

export const SectionTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin: 16px 0 8px 0;
`;

export const FormGrid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  margin-top: 16px;
  gap: 24px;
`;

export const FieldCol = styled(Box)<{ span?: number }>`
  grid-column: span ${({ span }) => span || 12};
`;

export const ValueCard = styled.div`
  background-color: rgba(46, 204, 113, 0.12);
  border: 1px solid rgba(46, 204, 113, 0.35);
  border-radius: 12px;
  padding: 12px 16px;
`;

export const ValueRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const SubNote = styled(Typography)`
  color: #6b7280;
  font-size: 12px !important;
`;
