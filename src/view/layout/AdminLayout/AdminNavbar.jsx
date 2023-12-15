import React, { Suspense } from "react";

const AdminNavbar = () => {
  const LogoutBtn = React.lazy(() =>
    import("../../../components/LogoutBtn/LogoutBtn")
  );

  return (
    <nav className="navbar navbar-expand navbar-light navbar-bg">
      <span className="sidebar-toggle js-sidebar-toggle">
        <i className="hamburger align-self-center"></i>
      </span>
      <div className="d-flex justify-content-end w-100">
        <Suspense>
          <LogoutBtn />
        </Suspense>
      </div>
    </nav>
  );
};

export default AdminNavbar;
