import { EMAIL_DOMAIN } from "@/constants";
import { setEmailToCookie } from "@/utils/auth";

export async function callOtpSignin(student: string) {
  const studentIdPayload = student.toLowerCase().startsWith("tk")
    ? student.toLowerCase()
    : `tk${student}`;

  const emailAddress = `${studentIdPayload}@${EMAIL_DOMAIN}`;

  await fetch("/api/auth/otp/", {
    method: "POST",
    body: JSON.stringify({ email: emailAddress }),
  })
    .then((response) => {
      setEmailToCookie(emailAddress);
      return response;
    })
    .catch((error) => {
      throw error;
    });
}
