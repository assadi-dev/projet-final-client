import React from "react";
import { Link, NavLink } from "react-router-dom";
import Bigscreen from "../../../components/Svg/Bigscreen";
import { FaHome } from "react-icons/fa";
import { FaPersonCircleQuestion } from "react-icons/fa6";
import { FaListCheck } from "react-icons/fa6";

const AdminSidebar = () => {
  const sidebarNavigation = [
    {
      name: "Accueil",
      to: "/administration",
      icon: FaHome,
    },
    {
      name: "Questions",
      to: "/administration/questions",
      icon: FaPersonCircleQuestion,
    },
    {
      name: "Reponse",
      to: "/administration/answers",
      icon: FaListCheck,
    },
  ];

  return (
    <nav id="sidebar" className="sidebar js-sidebar">
      <div className="sidebar-content js-simplebar">
        <Link className="sidebar-brand" to={sidebarNavigation[0].to}>
          <span className="align-middle">
            <Bigscreen className="col-sm-8" />
          </span>
        </Link>

        <ul className="sidebar-nav">
          {sidebarNavigation.map((item) => {
            return (
              <li key={item.name} className="sidebar-item">
                <NavLink className="sidebar-link" to={item.to}>
                  <item.icon />
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
