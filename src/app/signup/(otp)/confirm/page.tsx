"use client";

import "./otp.scss";

import Box from "@mui/material/Box";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import Link from "next/link";
// import { useRouter } from "next/router";
import { useState } from "react";

import { EMAIL_DOMAIN, VERIFY_DIGITS_LENGTH, VERIFY_DIGITS_REGEX } from "@/constants";
// import { getEmailFromCookie } from "@/utils/auth";
// import { callVerify } from "@/hooks/verify";

export default function Otp() {
  // const router = useRouter();
  /** @summary digits */
  const [digits, setDigits] = useState<string>("");
  const [digitsError, setDigitsError] = useState<boolean>(false);
  const digitsChange = (char: string) => {
    setDigits(char);
    const error = VERIFY_DIGITS_REGEX.test(char) ? false : true;
    setDigitsError(error);
  };

  /** @summary verify */
  const [working, setWorking] = useState<boolean>(false);
  /** Fire verify */
  const verify = async () => {
    //   if (digitsError) return;
    //   setWorking(true);
    // const emailAddress = getEmailFromCookie();
    // await fetch("/api/auth/otp/verification", {
    //   method: "POST",
    //   body: JSON.stringify({ email: emailAddress, digits: digits }),
    // })
    //   .then(async (response) => {
    //     await router.push("/webapp/");
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   })
    //   .finally(() => {
    //     setWorking(false);
    //   });
    // callVerify(digits)
    //   .then((data) => {
    //     console.log(data);
    //     setWorking(false);
    //   })
    //   .catch((e) => {
    //     console.error(e);
    //     setWorking(false);
    //   });
  };

  return (
    <>
      <div className="flex-col-center space-y-8">
        <div className="flex-col-center space-y-4">
          <h1>確認コードの入力</h1>
          <div className="flex-col-center max-w-[22rem]">
            <p>
              <span className="blue">{`@${EMAIL_DOMAIN} `}</span>
              <span>宛の認証メールに送付されている</span>
            </p>
            <p>
              <span className="cyan">{` ${VERIFY_DIGITS_LENGTH} `}</span>
              <span>桁のコードを入力してください</span>
            </p>
          </div>
        </div>
        <Box
          className="flex-col-center space-y-4"
          component={"div"}
          sx={{
            "& .MuiTextField-root": { width: "24ch" },
          }}
        >
          <TextField
            name="digits"
            label="確認コード"
            helperText="012345"
            variant="outlined"
            value={digits}
            onChange={(e) => digitsChange(e.target.value)}
            inputProps={{
              inputMode: "numeric",
              pattern: VERIFY_DIGITS_REGEX,
              maxLength: VERIFY_DIGITS_LENGTH,
            }}
            error={digitsError}
            autoComplete="off"
            required
          />
          <FormHelperText>
            <Link href={"/help"} target="_blank" rel="noopener noreferrer">
              <span>確認コードが届きません</span>
            </Link>
          </FormHelperText>
          <div className="button-submit">
            <button onClick={verify} disabled={working}>
              <span className={digitsError ? "" : "animate-pulse"}>次へ</span>
            </button>
          </div>
        </Box>
      </div>
    </>
  );
}
