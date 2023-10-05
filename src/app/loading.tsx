import { LoadingLayer } from "@/components/layouts/LoadingLayer";

export default function Loading() {
  return (
    <main className="relative h-screen w-full overflow-clip">
      <LoadingLayer />
    </main>
  );
}
