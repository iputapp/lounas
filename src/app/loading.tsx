import { LoadingLayer } from "@/components/layouts/Loading";

export default function Loading() {
  return (
    <main className="relative h-screen w-full overflow-clip">
      <LoadingLayer />
    </main>
  );
}
