import { EMAIL_DOMAIN } from "@/constants";
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
  const { data, error } = await supabase.auth.signInWithOtp({
    /** @example tk220123@tks.iput.ac.jp */
    email: `tk${student}@${EMAIL_DOMAIN}`,
    options: {
      data: {
        name: student,
      },
    },
  });
  if (error) throw new Error(`Signup: ${error.name}\n${error.message}`);
  return data;
}
