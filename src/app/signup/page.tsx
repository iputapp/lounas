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
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { STUDENT_ID_LENGTH, STUDENT_ID_REGEX } from "@/constants";
import { onSignup } from "@/hooks/auth/Signup";

export default function Signup() {
  const router = useRouter();

  /** @summary Student */
  const [student, setStudent] = useState<string>("");
  const [studentError, setStudentError] = useState<boolean>(false);
  const studentChange = (text: string) => {
    setStudent(text);
    const error = STUDENT_ID_REGEX.test(text) ? false : true;
    setStudentError(error);
  };

  /** @summary Agreement */
  const [agreed, setAgreed] = useState<boolean>(false);
  const [agreedError, setAgreedError] = useState<boolean>(false);
  const agreedChange = (checked: boolean) => {
    setAgreed(checked);
    const error = checked ? false : true;
    setAgreedError(error);
  };

  /** @summary Signup */
  const [error, setError] = useState<boolean>(true);
  const [success, setSuccess] = useState<boolean>(false);
  useEffect(() => {
    if (!STUDENT_ID_REGEX.test(student) || !agreed) {
      setError(true);
    } else {
      setError(false);
    }
  }, [student, agreed]);
  const signup = () => {
    if (error) {
      setSuccess(false);
      return;
    } else {
      const data = onSignup(student);
      data
        .then((data) => {
          setSuccess(true);
        })
        .catch((e) => {
          setSuccess(false);
          console.error(e);
        });
    }
  };

  return (
    <AnimatePresence>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="bg">
          <span className="circle blue"></span>
          <span className="circle cyan"></span>
          <span className="circle green"></span>
          <span className={`triangle blue ${success ? "success" : ""}`}></span>
          <span className={`triangle cyan ${success ? "success" : ""}`}></span>
          <span className={`triangle green ${success ? "success" : ""}`}></span>
          {/* <div className="w-[200%] overflow-clip">
          <Image className="object-cover" src={"/blob.svg"} alt="blob" fill />
        </div> */}
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
              id="student-id"
              label="学籍番号"
              helperText="220123"
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
              <button onClick={signup}>
                <span>Sign up</span>
              </button>
              <p className={error ? "opacity-100 visible" : "opacity-0 invisible"}>
                <span>必須項目*を入力してください</span>
              </p>
            </div>
          </Box>
        </div>
      </motion.main>
    </AnimatePresence>
  );
}
