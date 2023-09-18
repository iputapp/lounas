import Cancel from "@icons/cancel.svg";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { Dispatch, SetStateAction } from "react";

const StyledDialog = styled(Dialog)(() => ({
  "& .MuiDialog-paper": {
    borderRadius: "1.5rem", // rounded-3xl
    border: "2px solid #07f", // border-2
    backdropFilter: "blur(12px) brightness(2)", // backdrop-blur-md backdrop-brightness-200
    backgroundColor: "rgb(255 255 255 / 80%)",
    overflowX: "clip",
  },
  "& .MuiBox-root": {
    padding: "0.5rem", // p-2
  },
  "& .MuiIconButton-root": {
    /** text-xl */
    fontSize: "1.25rem",
    lineHeight: "1.75rem",
    padding: "0.5rem", // p-2
  },
  "& .MuiDialogTitle-root": {
    color: "#262626",
    /** font-semibold */
    fontWeight: 600,
    /** text-lg */
    fontSize: "1.125rem",
    lineHeight: "1.75rem",
    margin: 0, // m-0
    marginTop: "0.125rem", // mt-0.5
    padding: "0.5rem", // p-2
  },
  "& .MuiDialogContent-root": {
    height: "60dvh",
    maxHeight: "24rem", // max-h-96
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
    <StyledDialog
      onClose={() => setIsOpen(!isOpen)}
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
  );
}
