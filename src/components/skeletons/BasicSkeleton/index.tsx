import Skeleton from "@mui/material/Skeleton";

type BasicSkeletonProps = {
  delay?: number;
};

export function BasicSkeleton({ delay = 0 }: BasicSkeletonProps) {
  return (
    <div className="flex h-14 w-full items-center justify-center space-x-4">
      <Skeleton
        variant="rounded"
        width={"3.25rem"}
        height={"3.25rem"}
        sx={{ animationDelay: `${delay}s` }}
        className="bg-neutral-400/80"
      />
      <div className="grid h-full content-around">
        <Skeleton
          variant="rounded"
          width={"6rem"}
          height={"1rem"}
          sx={{ animationDelay: `${delay + 0.3}s` }}
          className="bg-neutral-400/80"
        />
        <Skeleton
          variant="rounded"
          width={"8rem"}
          height={"1rem"}
          sx={{ animationDelay: `${delay + 0.6}s` }}
          className="bg-neutral-400/80"
        />
      </div>
    </div>
  );
}
