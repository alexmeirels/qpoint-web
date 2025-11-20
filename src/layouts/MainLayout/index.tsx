import { Outlet } from "react-router-dom";
import { Container, OutletContainer } from "./styles";
import Sidebar from "../../components/Sidebar";


export default function MainLayout() {

  return (
    <Container>
      <Sidebar />
      <OutletContainer>
        <Outlet />
      </OutletContainer>
    </Container>
  );
}
