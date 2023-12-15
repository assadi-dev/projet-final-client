import { Outlet } from "react-router-dom";
import "../../../assets/css/admin.css";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="wrapper">
      <AdminSidebar />
      <div className="main">
        <AdminNavbar />
        <main className="content">
          <div className="container-fluid p-0">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
