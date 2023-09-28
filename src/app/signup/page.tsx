"use client";

import "./signup.scss";

import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { LoadingLayer } from "@/components/layouts/LoadingLayer";
import { STUDENT_ID_LENGTH, STUDENT_ID_REGEX } from "@/constants";
import { callOtpSignin } from "@/hooks/callOtpSignin";
// import { callSignup } from "@/hooks/signup";

export default function Signup() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  /** @summary student */
  const [student, setStudent] = useState<string>("");
  const [studentError, setStudentError] = useState<boolean>(false);
  const studentChange = (text: string) => {
    setStudent(text);
    const error = STUDENT_ID_REGEX.test(text) ? false : true;
    setStudentError(error);
  };

  /** @summary agreement */
  const [agreed, setAgreed] = useState<boolean>(false);
  const [agreedError, setAgreedError] = useState<boolean>(false);
  const agreedChange = (checked: boolean) => {
    setAgreed(checked);
    const error = checked ? false : true;
    setAgreedError(error);
  };

  /** @summary sign up */
  const [error, setError] = useState<boolean>(true);
  const [working, setWorking] = useState<boolean>(false);
  useEffect(() => {
    if (!STUDENT_ID_REGEX.test(student) || !agreed) {
      setError(true);
    } else {
      setError(false);
    }
  }, [student, agreed]);
  /** Fire sign up */
  const signup = async () => {
    if (error) return;
    setWorking(true);

    await callOtpSignin(student)
      .then(() => {
        router.push(`/signup/otp?${process.env.NEXT_PUBLIC_QUERY_SIGN_UP ?? "pending"}`);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setWorking(false);
      });
  };

  return (
    <>
      <div className="bg">
        <span className="circle blue"></span>
        <span className="circle cyan"></span>
        <span className="circle green"></span>
      </div>
      <div className="flex-col-center space-y-8">
        <h1>ようこそ</h1>
        <Box
          className="flex-col-center space-y-4"
          component={"div"}
          sx={{
            "& .MuiTextField-root": { width: "24ch" },
          }}
        >
          <TextField
            name="student"
            label="学籍番号"
            helperText="例: 220123"
            variant="standard"
            value={student}
            onChange={(e) => studentChange(e.target.value)}
            inputProps={{
              inputMode: "numeric",
              pattern: STUDENT_ID_REGEX,
              maxLength: STUDENT_ID_LENGTH,
            }}
            error={studentError}
            autoComplete="off"
            required
          />
          <FormControl
            variant="standard"
            sx={{
              "& .MuiFormHelperText-root": {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
            }}
            error={agreedError}
            required
          >
            <FormGroup>
              <FormControlLabel
                label={<FormLabel required>利用規約に同意します</FormLabel>}
                control={
                  <Checkbox
                    name="agreed"
                    checked={agreed}
                    onChange={(e) => agreedChange(e.target.checked)}
                  />
                }
              />
            </FormGroup>
            <FormHelperText>
              <Link href={"/terms"} target="_blank" rel="noopener noreferrer">
                <span>利用規約はこちら</span>
              </Link>
            </FormHelperText>
          </FormControl>
          <div className="button-submit">
            <button onClick={signup} disabled={working}>
              <span className={error ? "" : "animate-pulse"}>Sign up</span>
            </button>
            <p className={error ? "visible opacity-100" : "invisible opacity-0"}>
              <span>必須項目*を入力してください</span>
            </p>
          </div>
        </Box>
      </div>
      <LoadingLayer working={working} />
    </>
  );
}
