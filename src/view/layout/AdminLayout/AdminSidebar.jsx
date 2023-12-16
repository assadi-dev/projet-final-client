import React from "react";
import { Link, NavLink } from "react-router-dom";

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
    <nav id="sidebar" className="sidebar js-sidebar">
      <div className="sidebar-content js-simplebar">
        <Link className="sidebar-brand" to={sidebarNavigation[0].to}>
          <span className="align-middle">BIGSCREEN</span>
        </Link>

        <ul className="sidebar-nav">
          {sidebarNavigation.map((item) => {
            return (
              <li key={item.name} className="sidebar-item">
                <NavLink className="sidebar-link" to={item.to}>
                  <i className="align-middle" data-feather="sliders"></i>{" "}
                  <span className="align-middle">{item.name}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default AdminSidebar;
