"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import type { Restaurant } from "@/app/api/v-beta/restaurant/[id]";
import { VisitRegisterRequest } from "@/app/api/v-beta/user/visit/new";
import { RectButton } from "@/components/buttons/RectButton";
import { DialogAlert } from "@/components/dialogs/DialogAlert";
import { LoadingLayer } from "@/components/overlays/LoadingLayer";

export function ExitButton({ restaurant }: { restaurant: Restaurant }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  /** alert dialog yes */
  const handleYes = async () => {
    /** set state processing */
    setIsProcessing(true);

    /** get dish-id from query params */
    const dishId = searchParams.get("dish");

    if (!dishId) {
      console.error("dishId is not found.");
      console.log("restaurantId", restaurant.id);
    }

    const visitLogPayload = {
      dishId: dishId,
    } as VisitRegisterRequest;

    await fetch("/api/v-beta/user/visit/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(visitLogPayload),
    })
      .then((res) => {
        if (!res.ok) {
          console.error("Error!", res.status);
          // throw new Error(res.statusText);
          console.error(res.statusText);
        }
      })
      .catch((err) => {
        /**
         * @todo エラーが起きた場合どうするか？
         * 現在: エラーが起きても、とりあえず次のページに遷移する→履歴が登録されない
         * ゆくゆく: エラーが起きたら、「記録できませんでした」「もう一度試す」「記録せずナビを表示する」を表示する
         */
        console.error("Error!", err);
      })
      .finally(() => {
        setIsOpen(false);
        setIsProcessing(false);
        router.replace("/webapp/home");
      });
  };

  /** alert dialog no */
  const handleNo = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <RectButton color="red" onClick={() => setIsOpen(true)}>
        終了する
      </RectButton>
      <DialogAlert
        title="ルート案内を終了しますか？"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClickYes={handleYes}
        onClickNo={handleNo}
        isProcessing={isProcessing}
      >
        <div className="grid gap-1.5 text-center text-sm font-semibold">
          <p>ルート案内を終了すると日記に記録・後で履歴を見ることができます。</p>
          <p>
            ※<span className="underline">日記</span>は正式リリースにて導入予定です🙇
          </p>
        </div>
      </DialogAlert>
      <LoadingLayer working={isProcessing} />
    </>
  );
}
