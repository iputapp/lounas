import Link from "next/link";

// import { LoadingLayer } from "@/components/layouts/Loading";

export default function Home() {
  return (
    <main className="h-screen w-full overflow-clip">
      <div className="flex h-screen flex-col items-center justify-center">
        <Link href={"/signup"}>
          <span className="text-lg">Sign up</span>
        </Link>
      </div>
      {/* <LoadingLayer position="left" /> */}
    </main>
  );
}
