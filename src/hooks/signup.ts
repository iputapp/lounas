// "use client";

// import { EMAIL_DOMAIN } from "@/constants";
// import { expireSignup, setEmailToCookie, setSignupToCookie } from "@/lib/cookies";
// import { supabase } from "@/utils/supabase";

// /**
//  * Sign up with Supabase otp
//  * @param {string} student student ID
//  * @returns {Object}
//  * data: {
//     user: null;
//     session: null;
//     messageId?: string | null | undefined;
//   }
//  */
// export async function callSignup(student: string) {
//   /** @example tk220123@tks.iput.ac.jp */
//   const email = `tk${student}@${EMAIL_DOMAIN}`;
//   const { data, error } = await supabase.auth.signInWithOtp({
//     email: email,
//     options: {
//       data: {
//         name: student,
//       },
//     },
//   });
//   if (error) {
//     expireSignup();
//     throw new Error(`${error.name}\n${error.message}`);
//   } else {
//     setSignupToCookie();
//     setEmailToCookie(email);
//   }
//   return data;
// }
