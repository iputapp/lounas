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
    backdropFilter: "blur(8px) brightness(1.75)", // backdrop-blur backdrop-brightness-[1.75]
    backgroundColor: "rgb(255 255 255 / 50%)",
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
    /** font-semibold */
    fontWeight: 600,
    /** text-xl */
    fontSize: "1.25rem",
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
  header: string;
  children?: React.ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export function DialogInfo({ header, children, isOpen, setIsOpen }: DialogInfoProps) {
  return (
    <div>
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
          <DialogTitle id="info-dialog-title">{header}</DialogTitle>
        </Box>
        <DialogContent>{children}</DialogContent>
      </StyledDialog>
    </div>
  );
}
