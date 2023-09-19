import LinearProgress, { linearProgressClasses } from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";

const BorderLinearProgress = styled(LinearProgress)(() => ({
  height: 10,
  overflow: "clip",
  borderRadius: 9999, // rounded-full
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#e5e5e5",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 9999, // rounded-full
    background: "linear-gradient(to right, #0014ff, #07f)",
    mixBlendMode: "hard-light",
  },
}));

type BasicLinearProgressProps = {
  value: number;
};

export function BasicLinearProgress({ value }: BasicLinearProgressProps) {
  return <BorderLinearProgress variant="determinate" value={value} />;
}
