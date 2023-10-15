import { CldImg } from "@/components/image/CldImg";

export default function Page() {
  return (
    <div className="grid h-full w-full grid-cols-1 gap-6">
      <div className="relative aspect-square w-full overflow-clip rounded-lg bg-neutral-300">
        <CldImg
          className="absolute object-cover"
          src={"/samples/tadashi.webp"}
          alt={"tadashi"}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
          fill
          priority
        />
      </div>
      <div className="relative aspect-square w-full overflow-clip rounded-lg bg-neutral-300">
        <CldImg
          className="absolute object-cover"
          src={"/samples/tadashi.webp"}
          alt={"tadashi"}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
          fill
          priority
        />
      </div>
      <div className="relative aspect-square w-full overflow-clip rounded-lg bg-neutral-300">
        <CldImg
          className="absolute object-cover"
          src={"/samples/tadashi.webp"}
          alt={"tadashi"}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
          fill
          priority
        />
      </div>
      <div className="relative aspect-square w-full overflow-clip rounded-lg bg-neutral-300">
        <CldImg
          className="absolute object-cover"
          src={"/samples/tadashi.webp"}
          alt={"tadashi"}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
          fill
          priority
        />
      </div>
    </div>
  );
}
