import React from "react";
import ProfileMenu from "./profile-menu";
import "./style.css";
import { Icon } from "@iconify/react";
// import { loggedInData } from "../../data/fakeLoginData";
function Header({ active, setActive }) {
  return (
    <header>
      <div className="div_header">
        <div
          className="list-toggle"
          style={{ cursor: "pointer" }}
          onClick={() => setActive(!active)}
        >
          <img
            src="https://res.cloudinary.com/duovxefh6/image/upload/v1693606296/menu_s5rljg.png"
            alt=""
          />
        </div>
        {/* <div className="person">
          <img src={loggedInData?.image} alt="" />
          <div className="person__data">
            <span>{loggedInData?.name}</span>
            <span style={{ color: "var(--main-color-1)" }}>
              {loggedInData?.jop}
            </span>
          </div>
        </div> */}
      </div>

      <ProfileMenu userData={null} />
    </header>
  );
}

export default Header;
