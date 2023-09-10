"use client";
import "./style.scss";

import { BorderRoundButton } from "@/components/buttons/BorderRoundButton";
import { Thisapp } from "@/components/dummy/ThisApp";

export default function Test() {
  const onClick = () => {
    console.log("clicked");
  };

  return (
    <>
      <div className="bg">
        <span className="circle blue"></span>
        <span className="circle cyan"></span>
        <span className="circle green1"></span>
        <span className="circle green2"></span>
      </div>
      <div className="main">
        <div className="title">アカウント</div>
        <div className="go">
          <div className="text">IMAP会員へようこそ !</div>
          <div className="button">
            <BorderRoundButton title="&emsp;Sign IN&emsp;" fontSize="text-2xl" onClick={onClick} />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Thisapp>
            <p className="m-5">
              sだfksジャhddds堕hflksjdhファslkjdfはslkdjfはsldkjfはslkjfはslkdjfはsldkfjhさldkjfkだskファjhdlかsjfはlskjfhぁksjhファlksdjhfぁkfsdjfhlksじゃdfh亞lkdjfhさlkjdfhsl亞kdjfはslkdfjはslkふぁsjhfsヵjはsldkfjhさldkfjhさlfはfl亞skjdfはslkjfだ
            </p>
          </Thisapp>
        </div>
      </div>
    </>
  );
}
