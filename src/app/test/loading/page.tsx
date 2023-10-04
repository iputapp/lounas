import { LoadingLayer } from "@/components/overlays/LoadingLayer";

export default function Test() {
  return (
    <>
      <div className="grid grid-cols-2 gap-6 p-6">
        <span>I&apos;M a MESS&rsquo;...</span>
        <span>I&apos;M a MESS&rsquo;...</span>
        <span>I&apos;M a MESS&rsquo;...</span>
      </div>
      <div className="mx-auto grid w-fit grid-cols-2 place-items-center gap-8 px-5">
        <span>I&apos;M a MESS&rsquo;...</span>
        <span>I&apos;M a MESS&rsquo;...</span>
        <span>I&apos;M a MESS&rsquo;...</span>
      </div>
      <LoadingLayer />
    </>
  );
}
