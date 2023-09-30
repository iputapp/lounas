import { createTheme, Theme } from "@mui/material/styles";
import { Noto_Sans_JP } from "next/font/google";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  display: "swap",
});

const theme: Theme = createTheme({
  typography: {
    fontFamily: notoSansJP.style.fontFamily,
  },
});

export { theme };
