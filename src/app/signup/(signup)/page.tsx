"use client";

// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import { useRouter } from "next/navigation";
import NavArrowLeft from "@icons/nav-arrow-left.svg";
import NavArrowRight from "@icons/nav-arrow-right.svg";
import Link from "next/link";

import { CirclesTopLeft } from "@/components/backgrounds/CirclesTopLeft";
import { SignupForm } from "@/components/forms/SignupForm";

// import { LoadingLayer } from "@/components/layouts/LoadingLayer";
// import { callSignup } from "@/hooks/signup";
import styles from "./page.module.scss";

export default function Page() {
  // const router = useRouter();
  // const supabase = createClientComponentClient();

  // /** Fire sign up */
  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   if (error) return;
  //   setWorking(true);

  //   // await callOtpSignin(student)
  //   //   .then(() => {
  //   //     router.push(`/signup/otp?${process.env.NEXT_PUBLIC_QUERY_SIGN_UP ?? "pending"}`);
  //   //   })
  //   //   .catch((error) => {
  //   //     console.error(error);
  //   //   })
  //   //   .finally(() => {
  //   //     setWorking(false);
  //   //   });
  // };

  return (
    <>
      <CirclesTopLeft />
      <div className={styles.container}>
        <h1 className={styles.title}>ようこそ</h1>
        <SignupForm className={styles.form} />
        <div className={styles.additional}>
          <span>登録せずに試す&#40;ランキング機能のみ&#41;</span>
        </div>
        <div className={styles.tos}>
          <Link href={"/tos"} target="_blank" rel="noopener noreferrer">
            <span>
              <NavArrowRight />
            </span>
            <span>利用規約はこちら</span>
            <span>
              <NavArrowLeft />
            </span>
          </Link>
        </div>
      </div>
      {/* <LoadingLayer working={working} /> */}
    </>
  );
}
