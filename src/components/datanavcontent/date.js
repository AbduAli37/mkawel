import React, { useEffect, useState } from "react";
import "./style.css";
function Data() {
  const [date_s, setDate_s] = useState(false);
  useEffect(() => {
    const date = new Date();
    const locale = "ar-EG";

    const formatter = new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const formattedDate = formatter.format(date);
    const formatterTime = new Intl.DateTimeFormat(locale, {
      hour: "numeric",
      hour12: true,
    });
    const formattedTime = formatterTime.format(date);
    const timePeriod = formattedTime.endsWith("م") ? "مساءا" : "صباحا";
    const formattedTimePeriod = formattedTime.replace(/[مص]/g, "");
    setDate_s({ formattedDate, formattedTime: formattedTimePeriod + timePeriod   });
  }, []);
  return (
    <div className="date-d">
      <div className="data-md">
        <img
          src="https://res.cloudinary.com/dtt1sk8xl/image/upload/v1689195739/My%20Folder/public/calendar_hsm2xq.svg"
          alt=""
        />
        <span>
          {date_s["formattedDate"]
            ? date_s["formattedDate"]
            : "٢٥ ديسمبر ٢٠٢٢ "}
        </span>
      </div>
      <div className="clock-d">
        <img
          src="https://res.cloudinary.com/dtt1sk8xl/image/upload/v1689195755/My%20Folder/public/clock_1_le3ut9.svg"
          alt=""
        />
        <span>
          {date_s["formattedTime"] ? date_s["formattedTime"] : " ١٢ مساءً "}
        </span>
      </div>
    </div>
  );
}

export default Data;
