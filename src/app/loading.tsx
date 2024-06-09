import { LoadingLayer } from "@/components/overlays/LoadingLayer";

export default function Loading() {
  return (
    <main className="h-screen w-full overflow-clip">
      <LoadingLayer />
    </main>
  );
}
