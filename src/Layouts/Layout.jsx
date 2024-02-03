import React, { useState } from "react";
import SideNav from "../SideNav/SideNav";
import "./layout.css";
import { FaBars } from "react-icons/fa6";
import { Add } from "../SvgsIcons/SvgsImages";
import Data from "../components/datanavcontent/date";
import Header from "./header";
const Layout = ({ children, page_name, have_add, handleShowAdd }) => {
  const [active, setActive] = useState(true);
  return (
    <div className="layoutContainer">
      <div className="side">
        <SideNav active={active} setActive={setActive} />
      </div>
      <div className="site-content">
        <div className="children">
          <Header active={active} setActive={setActive} />
          <div className="pageName">
            <h3>
              {/* <FaBars
                onClick={() => {
                  setActive(true);
                }}
                className={active ? "hid" : "act"}
              /> */}
              <span>{page_name}</span>
            </h3>
            {have_add ? (
              <div
                onClick={() => {
                  handleShowAdd();
                }}
                className="add_more"
              >
                <span>إضافه</span>
                <span>{Add}</span>
              </div>
            ) : null}
          </div>
          <Data />
          {children ? children : null}
        </div>
      </div>
    </div>
  );
};

export default Layout;
