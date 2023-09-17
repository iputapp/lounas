import { LoadingLayer } from "@/components/layouts/Loading";

export default function Loading() {
  return (
    <main className="relative w-full h-screen overflow-clip">
      <LoadingLayer />
    </main>
  );
}
