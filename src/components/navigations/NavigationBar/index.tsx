"use client";

import Calendar from "@icons/calendar.svg";
import Crown from "@icons/crown.svg";
import Home from "@icons/house.svg";
import Person from "@icons/person.svg";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useState } from "react";

export function Footer() {
  const [value, setValue] = useState<string>("home");

  return (
    <BottomNavigation
      value={value}
      onChange={(event, value: string) => {
        setValue(value);
      }}
      sx={{
        "& .MuiButtonBase-root": { color: "#707070" },
        "& .MuiButtonBase-root.Mui-selected": { color: "#07f" },
      }}
    >
      <BottomNavigationAction
        value="home"
        icon={
          <span>
            <Home />
          </span>
        }
      />
      <BottomNavigationAction
        value="ranking"
        icon={
          <span>
            <Crown />
          </span>
        }
      />
      <BottomNavigationAction
        value="diary"
        icon={
          <span>
            <Calendar />
          </span>
        }
      />
      <BottomNavigationAction
        value="user"
        icon={
          <span>
            <Person />
          </span>
        }
      />
    </BottomNavigation>
  );
}
