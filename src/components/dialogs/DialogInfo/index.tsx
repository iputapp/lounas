import Cancel from "@icons/cancel.svg";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { styled, ThemeProvider } from "@mui/material/styles";
import { Dispatch, SetStateAction } from "react";

import { theme } from "@/styles/mui";

const StyledDialog = styled(Dialog)(() => ({
  "& .MuiDialog-paper": {
    borderRadius: "1.5rem", // rounded-3xl
    border: "2px solid rgb(0 119 255 / 80%)", // border-2
    backdropFilter: "blur(12px) brightness(2)", // backdrop-blur-md backdrop-brightness-200
    backgroundColor: "rgb(255 255 255 / 80%)",
    overflowX: "clip",
  },
  "& .MuiBox-root": {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "0.75rem", // p-3
  },
  "& .MuiIconButton-root": {
    /** text-lg */
    fontSize: "1.125rem",
    lineHeight: "1.75rem",
    padding: 0,
  },
  "& .MuiDialogTitle-root": {
    color: "#262626",
    /** font-semibold */
    fontWeight: 600,
    /** text-lg */
    fontSize: "1.125rem",
    lineHeight: "1.75rem",
    marginTop: "0.125rem", // mt-0.5
    marginLeft: "auto", // mx-auto
    marginRight: "auto", // mx-auto
    padding: 0,
  },
  "& .MuiDialogContent-root": {
    maxHeight: "50dvh",
    color: "#404040",
  },
}));

type DialogInfoProps = {
  title: string;
  children?: React.ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export function DialogInfo({ title, children, isOpen, setIsOpen }: DialogInfoProps) {
  return (
    <ThemeProvider theme={theme}>
      <StyledDialog
        onClose={() => setIsOpen((prev) => !prev)}
        aria-labelledby="info-dialog-title"
        open={isOpen}
        scroll="paper"
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconButton aria-label="close" onClick={() => setIsOpen(!isOpen)}>
            <Cancel />
          </IconButton>
          <DialogTitle id="info-dialog-title">{title}</DialogTitle>
        </Box>
        <DialogContent>{children}</DialogContent>
      </StyledDialog>
    </ThemeProvider>
  );
}
