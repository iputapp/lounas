import { Circle } from "@/components/FourPoti/Circle";

export default function Test() {
  return (
    <div style={{ position: "relative", height: "900px", width: "900px" }}>
      <Circle
        size={300}
        position={{ x: 30, y: 0 }}
        color1="red"
        color2="blue"
        label="950円~"
        angle={90}
      />
      <Circle size={100} position={{ x: 320, y: 0 }} color1="blue" color2="red" label="750~950円" />
      <Circle size={400} position={{ x: 0, y: 320 }} color1="pink" color2="red" label="~750円" />
      <Circle size={50} position={{ x: 430, y: 350 }} color1="green" color2="blue" label="skip" />
    </div>
  );
}
