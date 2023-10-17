import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { styled, ThemeProvider } from "@mui/material/styles";
import { Dispatch, SetStateAction } from "react";

import { RectButton } from "@/components/buttons/RectButton";
import { theme } from "@/styles/mui";

const StyledDialog = styled(Dialog)(() => ({
  "& .MuiDialog-paper": {
    display: "grid",
    gap: "1.5rem", // gap-6
    borderRadius: "1.5rem", // rounded-3xl
    border: "2px solid rgb(0 119 255 / 80%)", // border-2
    backdropFilter: "blur(12px) brightness(2)", // backdrop-blur-md backdrop-brightness-200
    backgroundColor: "rgb(255 255 255 / 50%)",
    overflowX: "clip",
    paddingTop: "2rem", // pt-8
    paddingBottom: "1.5rem", // pb-6
    paddingLeft: "1rem", // px-4
    paddingRight: "1rem", // px-4
  },
  "& .MuiTypography-root": {
    color: "#262626",
    /** text-xl */
    fontSize: "1.25rem",
    lineHeight: "1.75rem",
    /** font-bold */
    fontWeight: 700,
    textAlign: "center",
    marginLeft: "auto", // mx-auto
    marginRight: "auto", // mx-auto
    padding: 0,
  },
  "& .MuiDialogContent-root": {
    color: "#404040",
    width: "95%", // w-[95%]
    maxWidth: "24rem", // max-w-sm
    minHeight: "3rem", // min-h-12
    maxHeight: "40dvh",
    padding: 0,
    marginLeft: "auto", // mx-auto
    marginRight: "auto", // mx-auto
  },
}));

type DialogAlertProps = {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onClickYes?: React.MouseEventHandler<HTMLButtonElement>;
  onClickNo?: React.MouseEventHandler<HTMLButtonElement>;
};

export function DialogAlert({
  title,
  children,
  isOpen,
  setIsOpen,
  onClickYes,
  onClickNo,
}: DialogAlertProps) {
  return (
    <ThemeProvider theme={theme}>
      <StyledDialog open={isOpen} onClose={() => setIsOpen((prev) => !prev)}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions className="mx-auto flex w-[90%] items-center justify-between space-x-11 p-0">
          <RectButton color="red" autoFocus={true} onClick={onClickNo}>
            いいえ
          </RectButton>
          <RectButton color="blue" onClick={onClickYes}>
            はい
          </RectButton>
        </DialogActions>
      </StyledDialog>
    </ThemeProvider>
  );
}
