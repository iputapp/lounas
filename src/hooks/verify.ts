// "use client";

// import { getEmailFromCookie } from "@/lib/cookies";
// import { supabase } from "@/utils/supabase";

// /**
//  * Verify otp of email
//  * @param {string} digits 6 digits of otp
//  * @returns {Object}
//  * data: {
//     user: User | null;
//     session: Session | null;
//   }
//  */
// export async function callVerify(digits: string) {
//   getEmailFromCookie()
//     .then(async (email) => {
//       const { data, error } = await supabase.auth.verifyOtp({
//         email: email,
//         token: digits,
//         type: "email",
//       });
//       if (error) throw new Error(`${error.name}\n${error.message}`);
//       return data;
//     })
//     .catch((e) => {
//       throw new Error(e);
//     });
// }
