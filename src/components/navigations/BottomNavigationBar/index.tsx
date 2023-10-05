"use client";

import Calendar from "@icons/calendar.svg";
import Crown from "@icons/crown.svg";
import LogoFill from "@icons/logo-fill.svg";
import LogoOutline from "@icons/logo-outline.svg";
import User from "@icons/user.svg";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";

export function BottomNavigationBar() {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [value, setValue] = useState("home");

  const rootPath = "/webapp";

  const init = (pathname: string) => {
    pathname.includes("user") ? setValue("user") : setValue(pathname.split("/").pop() as string);
  };

  useLayoutEffect(() => {
    init(pathname);
  }, [pathname]);

  useEffect(() => setMounted(true), []);

  return (
    <div className="fixed inset-x-0 bottom-0 z-50">
      <BottomNavigation
        value={value}
        onChange={(event, value: string) => {
          setValue(value);
          router.push(`${rootPath}/${value}`);
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
          value="home"
          icon={
            mounted && (
              <span className="text-xl">{value === "home" ? <LogoFill /> : <LogoOutline />}</span>
            )
          }
        />
        <BottomNavigationAction
          value="ranking"
          icon={
            <span className="text-2xl">
              <Crown />
            </span>
          }
        />
        <BottomNavigationAction
          value="diary"
          icon={
            <span className="text-xl">
              <Calendar />
            </span>
          }
        />
        <BottomNavigationAction
          value="user"
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
