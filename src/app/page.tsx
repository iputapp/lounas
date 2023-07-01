import Link from "next/link";

// import { LoadingLayer } from "@/components/layouts/Loading";

export default function Home() {
  return (
    <main className="w-full h-screen overflow-clip">
      <div className="h-screen flex flex-col items-center justify-center">
        <Link href={"/signup"}>
          <span className="text-lg">Sign up</span>
        </Link>
      </div>
      {/* <LoadingLayer position="left" /> */}
    </main>
  );
}
