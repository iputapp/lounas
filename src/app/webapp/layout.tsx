import { BottomNavigationBar } from "@/components/navigations/BottomNavigationBar";

export default function webapp({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      <BottomNavigationBar pathname="/webapp" />
    </div>
  );
}
