import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  min-width: calc(100vw - 16px);
  min-height: calc(100vh - 32px);
  margin: 16px;
  background-color: #f5f5f5;
  overflow: hidden;

  main {
    flex: 1;
    padding: 32px;
    overflow-y: auto;
  }
`;

export const OutletContainer = styled.div`
  margin: 0px 16px;
  display: flex;
  flex: 1;
`;
