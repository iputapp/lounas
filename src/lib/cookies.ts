// "use server";

// import { cookies } from "next/headers";

// /**
//  * Set `signup` completion to cookie
//  */
// export async function setSignupToCookie() {
//   cookies().set({
//     name: process.env.NEXT_PUBLIC_COOKIE_SIGN_UP_NAME ?? "sign-up",
//     value: process.env.NEXT_PUBLIC_COOKIE_SIGN_UP_VALUE ?? "sign-up-success",
//     maxAge: 30,
//     path: "/signup",
//     httpOnly: true,
//     // secure: true,
//   });
// }

// /**
//  * Check `signup` completed successfully
//  * @returns {boolean} Is signup succeed
//  */
// export async function isSignupSucceed() {
//   const cookieStore = cookies();
//   const value = cookieStore.get(process.env.NEXT_PUBLIC_COOKIE_SIGN_UP_NAME ?? "sign-up")?.value;
//   if (value === process.env.NEXT_PUBLIC_COOKIE_SIGN_UP_VALUE ?? "sign-up-success") {
//     return true;
//   } else {
//     return false;
//   }
// }

// /**
//  * Delete `signup` completion from cookie
//  */
// export async function expireSignup() {
//   const cookieStore = cookies();
//   cookieStore.delete(process.env.NEXT_PUBLIC_COOKIE_SIGN_UP_NAME ?? "sign-up");
// }

// /**
//  * Set `email` to cookie
//  * @param {string} email student email
//  */
// export async function setEmailToCookie(email: string) {
//   cookies().set({
//     name: process.env.NEXT_PUBLIC_COOKIE_EMAIL_NAME ?? "email",
//     value: email,
//     maxAge: 60 * 60,
//     path: "/",
//     httpOnly: true,
//     // secure: true,
//   });
// }

// /**
//  * Get `email` from cookie
//  * @returns {string}
//  */
// export async function getEmailFromCookie() {
//   const cookieStore = cookies();
//   const email = cookieStore.get(process.env.NEXT_PUBLIC_COOKIE_EMAIL_NAME ?? "email")?.value;
//   if (!email) throw new Error("email not found.");
//   return email;
// }
