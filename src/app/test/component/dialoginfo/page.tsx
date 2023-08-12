import { DialogInfo } from "@/components/dialogs/DialogInfo";

export default function Test() {
  return (
    <div>
      <div className="w-full h-screen flex items-center justify-center">
        <DialogInfo header="確認コードが届きません。">
          <p>X</p>
          <p>Y</p>
        </DialogInfo>
      </div>
    </div>
  );
}
