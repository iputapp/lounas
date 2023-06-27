"use server";

import { cookies } from "next/headers";

/**
 * @function Set `signInWithOtp` to success
 * @param {string} email email entered on sign up
 */
export async function onSuccess(email: string) {
  cookies().set({
    name: "signInWithOtp",
    value: "success",
    path: "/signup",
    httpOnly: true,
    // secure: true,
  });
  cookies().set({
    name: "signupEmail",
    value: email,
    path: "/",
    httpOnly: true,
    // secure: true,
  });
}

/**
 * @function Check `signInWithOtp` completed successfully
 * @returns {boolean}
 */
export async function isSuccess() {
  const cookieStore = cookies();
  const success = cookieStore.get("signInWithOtp")?.value;
  if (success === "success") {
    return true;
  } else {
    return false;
  }
}

/**
 * @function Delete `signInWithOtp` from cookie
 */
export async function onExpired() {
  cookies().set({
    name: "signInWithOtp",
    value: "",
    maxAge: 0,
    path: "/signup",
    httpOnly: true,
    // secure: true,
  });
}

/**
 * @function Get `signupEmail` from cookie
 * @returns {string}
 */
export async function getEmail() {
  const cookieStore = cookies();
  const email = cookieStore.get("signupEmail")?.value;
  if (!email) throw new Error("Email: not found.");
  return email;
}
