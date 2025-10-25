import AppNavbar from "./AppNavbar";
import FooterLayout from "./FooterLayout";
import { Outlet } from "react-router";
const AppLayout = () => {
  return (
    <>
      <AppNavbar />
         <Outlet />
      <FooterLayout />
    </>
  )
}

export default AppLayout




