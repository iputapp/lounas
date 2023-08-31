import Cancel from "@icons/cancel.svg";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { Dispatch, SetStateAction } from "react";

type DialogInfoProps = {
  header: string;
  children?: React.ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export function DialogInfo({ header, children, isOpen, setIsOpen }: DialogInfoProps) {
  return (
    <div>
      <BootstrapDialog
        onClose={() => setIsOpen(!isOpen)}
        aria-labelledby="customized-dialog-title"
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
          <DialogTitle
            sx={{ paddingLeft: 0 }}
            id="customized-dialog-title"
            className="m-auto font-bold"
          >
            {header}
          </DialogTitle>
        </Box>
        <DialogContent dividers>{children}</DialogContent>
      </BootstrapDialog>
    </div>
  );
}

const BootstrapDialog = styled(Dialog)(() => ({
  "& .MuiPaper-root": {
    borderRadius: "1.5rem",
    border: "3px solid #07f",
    backdropFilter: "blur(4px) brightness(2)",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  "& .MuiDialogContent-root": {
    height: "60dvh",
    maxHeight: "24rem",
  },
}));
