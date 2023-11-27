import React from "react";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  const sidebarNavigation = [
    {
      name: "Accueil",
      to: "/administration",
    },
    {
      name: "Questions",
      to: "/administration/questions",
    },
    {
      name: "Reponse",
      to: "/administration/answers",
    },
  ];

  const LogoutBtn = React.lazy(() =>
    import("../../../components/LogoutBtn/LogoutBtn")
  );

  return (
    <div className="sidebar">
      <p>sidebar</p>
      <ul>
        {sidebarNavigation.map((path) => (
          <li key={path.name}>
            <NavLink to={path.to}>{path.name}</NavLink>
          </li>
        ))}
        <li>
          <React.Suspense>
            <LogoutBtn />
          </React.Suspense>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
