import { Cardfull } from "@/components/Cardfull";

export default function Home() {
  return (
    <main>
      <div className="grid auto-rows-fr grid-cols-1 gap-8">
        <Cardfull
          explanation="目の前にセブンイレブンがあります"
          supplement="今夜のみに行かないかい？"
          thumbnail=""
          icon=""
          explanationStyle={{
            transform: "translateY(50%)", // 下方向に50%移動して配置
          }}
          supplementStyle={{
            transform: "translateY(50%)", // 下方向に50%移動して配置
          }}
        />
      </div>
    </main>
  );
}
