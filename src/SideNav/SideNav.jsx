import React, { Fragment, useEffect, useState } from "react";
import { NavLink, Navigate } from "react-router-dom";
import "./sidenav.css";
// import { checkLoggin } from "../../pages/login/functions";
import { Icon } from "@iconify/react";
// import axios from "axios";
import { SideNavData } from "./SideNavData";
function SideNav({ active, setActive }) {
  const [logo, setlogo] = useState("");
  // useEffect(() => {
  //   axios
  //     .get("https://roma-cosmetic.com/api/v1/admin/home/select_logo.php")
  //     .then((res) => {
  //       if (res.data.status === "success") {
  //         setlogo(res.data.message.logo);
  //       }
  //     });
  // }, []);
  return (
    <Fragment>
      <aside className={active ? "active" : "hidden"}>
        <div className="logo-ic">
          <div className="list-close" onClick={() => setActive(false)}>
            <Icon icon="line-md:close-small" />
          </div>
          {/* <img
            src={
              "https://res.cloudinary.com/duovxefh6/image/upload/v1700918823/Screenshot_2023-11-25_152447-removebg-preview_wfmkrf.png"
            }
            alt=""
          /> */}
        </div>
        <div className="links">
          {SideNavData.map((item, index) => {
            return (
              <NavLink
                to={item.path}
                onClick={() => setActive(false)}
                key={index}
              >
                <span style={{ color: "black" }}>{item.icon}</span>
                <em>{item.label}</em>
              </NavLink>
            );
          })}
        </div>
      </aside>
    </Fragment>
  );
}

export default SideNav;
