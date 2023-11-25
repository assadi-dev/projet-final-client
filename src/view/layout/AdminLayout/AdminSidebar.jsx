import React from "react";
import { NavLink } from "react-router-dom";
import LogoutBtn from "../../../components/LogoutBtn/LogoutBtn";

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
          <LogoutBtn />
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
