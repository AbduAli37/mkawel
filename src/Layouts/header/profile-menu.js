import React, { useState } from "react";
import "./style.css";
import { logOut } from "./functions";
function ProfileMenu({ userData }) {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <div className="profileMenu">
      <div className="menu-down">
        <button className="btn btn-danger" onClick={() => logOut()}>
          تسجيل الخروج
        </button>
      </div>
    </div>
  );
}

export default ProfileMenu;
