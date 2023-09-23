"use client";

import Calendar from "@icons/calendar.svg";
import Crown from "@icons/crown.svg";
import LogoFill from "@icons/logo-fill.svg";
import LogoOutline from "@icons/logo-outline.svg";
import User from "@icons/user.svg";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function BottomNavigationBar() {
  const router = useRouter();
  const [value, setValue] = useState("home");

  return (
    <div className="fixed inset-x-0 bottom-0 z-50">
      <BottomNavigation
        value={value}
        onChange={(event, value: string) => {
          const page = value.split("/").pop() as string;
          setValue(page);
          router.push(`${value}`);
        }}
        sx={{
          "&": {
            backdropFilter: "blur(8px) brightness(1.25)", // backdrop-blur, backdrop-brightness-125
            backgroundColor: "rgb(255 255 255 / 50%)",
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
          value="/webapp/home"
          icon={
            <span className="text-xl">{value === "home" ? <LogoFill /> : <LogoOutline />}</span>
          }
        />
        <BottomNavigationAction
          value="/webapp/ranking"
          icon={
            <span className="text-2xl">
              <Crown />
            </span>
          }
        />
        <BottomNavigationAction
          value="/webapp/diary"
          icon={
            <span className="text-xl">
              <Calendar />
            </span>
          }
        />
        <BottomNavigationAction
          value="/webapp/user"
          icon={
            <span className="text-xl">
              <User />
            </span>
          }
        />
      </BottomNavigation>
    </div>
  );
}
