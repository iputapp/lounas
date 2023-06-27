"use client";

import "./otp.scss";

import Box from "@mui/material/Box";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

import { EMAIL_DOMAIN, VERIFY_DIGITS_LENGTH, VERIFY_DIGITS_REGEX } from "@/constants";
import { onVerify } from "@/hooks/auth/signupClient";

export default function Otp() {
  /** @summary Digits */
  const [digits, setDigits] = useState<string>("");
  const [digitsError, setDigitsError] = useState<boolean>(false);
  const digitsChange = (char: string) => {
    setDigits(char);
    const error = VERIFY_DIGITS_REGEX.test(char) ? false : true;
    setDigitsError(error);
  };

  /** @summary Verify */
  const [working, setWorking] = useState<boolean>(false);
  /** @function Fire verify */
  const verify = () => {
    if (digitsError) return;
    setWorking(true);
    const data = onVerify(digits);
    data
      .then((data) => {
        console.log(data);
        setWorking(false);
      })
      .catch((e) => {
        console.error(e);
        setWorking(false);
      });
  };

  return (
    <motion.div
      key={"signup-otp"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <div className="flex-col-center space-y-8">
        <div className="flex-col-center space-y-4">
          <h1>確認コードの入力</h1>
          <div className="flex-col-center max-w-[22rem]">
            <p>
              <span className="blue">{`@${EMAIL_DOMAIN} `}</span>
              宛の認証メールに送付されている
            </p>
            <p>
              <span className="cyan">{` ${VERIFY_DIGITS_LENGTH} `}</span>
              桁のコードを入力してください
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
            id="digits"
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
              <span
                className={`${working ? "animate-ping" : ""} ${digitsError ? "" : "animate-pulse"}`}
              >
                次へ
              </span>
            </button>
          </div>
        </Box>
      </div>
    </motion.div>
  );
}
