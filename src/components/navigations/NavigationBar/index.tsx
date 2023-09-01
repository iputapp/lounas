"use client";

import Calendar from "@icons/calendar.svg";
import Crown from "@icons/crown.svg";
import Home from "@icons/house.svg";
import Person from "@icons/person.svg";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useState } from "react";

type ButtonProps = {
  homeClick: () => void;
  rankingClick: () => void;
  diaryClick: () => void;
  userClick: () => void;
};

export function Footer({ homeClick, rankingClick, diaryClick, userClick }: ButtonProps) {
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
          <span onClick={homeClick}>
            <Home className="text-xl" />
          </span>
        }
      />
      <BottomNavigationAction
        value="ranking"
        icon={
          <span onClick={rankingClick}>
            <Crown className="text-2xl" />
          </span>
        }
      />
      <BottomNavigationAction
        value="diary"
        icon={
          <span onClick={diaryClick}>
            <Calendar className="text-xl" />
          </span>
        }
      />
      <BottomNavigationAction
        value="user"
        icon={
          <span onClick={userClick}>
            <Person className="text-xl" />
          </span>
        }
      />
    </BottomNavigation>
  );
}
