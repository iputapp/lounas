"use client";

import { EMAIL_DOMAIN } from "@/constants";
import { getEmail, onExpired, onSuccess } from "@/hooks/auth/signupServer";
import { supabase } from "@/utils/supabase";

/**
 * @function Supabase sign up with otp
 * @param {string} student student ID
 * @returns {Object}
 * data: {
    user: null;
    session: null;
    messageId?: string | null | undefined;
  }
 */
export async function onSignup(student: string) {
  /** @example tk220123@tks.iput.ac.jp */
  const email = `tk${student}@${EMAIL_DOMAIN}`;
  const { data, error } = await supabase.auth.signInWithOtp({
    email: email,
    options: {
      data: {
        name: student,
      },
    },
  });
  if (error) {
    onExpired();
    throw new Error(`Signup: ${error.name}\n${error.message}`);
  } else {
    onSuccess(email);
  }
  return data;
}

/**
 * @function Supabase verify email with otp
 * @param {string} email email entered on sign up
 * @param {string} digits 6 digits of otp
 * @returns {Object}
 * data: {
    user: User | null;
    session: Session | null;
  }
 */
export async function onVerify(digits: string) {
  const email = getEmail();
  email
    .then(async (email) => {
      const { data, error } = await supabase.auth.verifyOtp({
        email: email ?? "",
        token: digits,
        type: "email",
      });
      if (error) throw new Error(`Verify: ${error.name}\n${error.message}`);
      return data;
    })
    .catch((e) => {
      throw new Error(e);
    });
}
