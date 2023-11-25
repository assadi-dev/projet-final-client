import { Outlet } from "react-router-dom";
import "../../../assets/css/admin.css";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="admin-container">
      <AdminNavbar />
      <AdminSidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
