"use client";

import Calendar from "@icons/calendar.svg";
import Crown from "@icons/crown.svg";
import Home from "@icons/home.svg";
import User from "@icons/user.svg";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useRouter } from "next/navigation";
import { useState } from "react";

type BottomNavigationBarProps = {
  pathname?: string;
};

export function BottomNavigationBar({ pathname = "" }: BottomNavigationBarProps) {
  const router = useRouter();
  const [value, setValue] = useState("home");

  return (
    <div className="fixed inset-x-0 bottom-0">
      <BottomNavigation
        value={value}
        onChange={(event, value: string) => {
          setValue(value);
          router.push(`${pathname}/${value}`);
        }}
        sx={{
          "&": {
            backdropFilter: "blur(8px)", // backdrop-blur
            backgroundColor: "transparent",
            height: "5rem", // 3.5rem(default) + paddingBottom
          },
          "& .MuiBottomNavigationAction-root": {
            color: "#707070",
            paddingBottom: "1.5rem",
          },
          "& .MuiBottomNavigationAction-root.Mui-selected": { color: "#07f" },
        }}
      >
        <BottomNavigationAction
          value="home"
          icon={
            <span>
              <Home className="text-xl" />
            </span>
          }
        />
        <BottomNavigationAction
          value="ranking"
          icon={
            <span>
              <Crown className="text-2xl" />
            </span>
          }
        />
        <BottomNavigationAction
          value="diary"
          icon={
            <span>
              <Calendar className="text-xl" />
            </span>
          }
        />
        <BottomNavigationAction
          value="user"
          icon={
            <span>
              <User className="text-xl" />
            </span>
          }
        />
      </BottomNavigation>
    </div>
  );
}
