import LinearProgress, { linearProgressClasses } from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";

const BorderLinearProgress = styled(LinearProgress)(() => ({
  height: 10,
  borderRadius: 9999, // rounded-full
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#e5e5e5",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 9999, // rounded-full
    background: "linear-gradient(to right, #0014ff, #07f)",
    mixBlendMode: "hard-light",
    transition: "transform 0.4s cubic-bezier(0.65, 0, 0.35, 1)", // easeInOutCubic
  },
}));

type BasicLinearProgressProps = {
  value: number;
};

export function BasicLinearProgress({ value }: BasicLinearProgressProps) {
  return <BorderLinearProgress variant="determinate" value={value} />;
}
