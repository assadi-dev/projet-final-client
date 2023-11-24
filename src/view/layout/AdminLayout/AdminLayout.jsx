import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div>
      <nav></nav>
      <div>sidebar</div>
      <Outlet />
    </div>
  );
};

export default AdminLayout;
