import AdminNavbar from "./AdminNavbar";
import FooterLayout from "./FooterLayout";
  
import { Outlet } from "react-router";

const AdminLayout = () => {
  return (
    <>
      <AdminNavbar />
      <Outlet />
      <FooterLayout />
    </>
  )
}

export default AdminLayout