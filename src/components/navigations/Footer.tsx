"use client";

// import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
// import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
// import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
// import React from "react";

export function Footer() {
  // const [value, setValue] = React.useState<number>(0);

  return (
    <footer>
      <BottomNavigation
      // value={value}
      // onChange={(event, value) => {
      //   setValue(value);
      // }}
      >
        <BottomNavigationAction label="Home" icon={<></>} />
        <BottomNavigationAction label="Ranking" icon={<></>} />
        <BottomNavigationAction label="Diary" icon={<></>} />
        <BottomNavigationAction label="User" icon={<></>} />
      </BottomNavigation>
    </footer>
  );
}
