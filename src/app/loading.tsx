import { LoadingLayer } from "@/components/layouts/Loading";

export default function Loading() {
  return (
    <div className="w-full h-screen overflow-clip">
      <LoadingLayer />
    </div>
  );
}
