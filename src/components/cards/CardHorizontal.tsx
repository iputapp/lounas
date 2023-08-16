import Image from "next/image";

export function CardHorizontal() {
  return (
    <div className="flex w-full h-32 rounded-2xl">
      <div className="relative w-40">
        <Image
          className="absolute h-full object-cover rounded-2xl"
          src="/test/oilnoodle.jpg"
          width={256}
          height={256}
          sizes="100vw"
          alt="都庁ラーメン"
        />
      </div>
      <div className="p-2 flex flex-col space-y-4">
        <h3 className="">東京都庁職員食堂</h3>
        <div className="">
          <p>詳細</p>
        </div>
      </div>
      <div className="px-1 flex items-center justify-center bg-blue-600">
        <div className="text-2xl font-bold text-white">1</div>
      </div>
    </div>
  );
}
