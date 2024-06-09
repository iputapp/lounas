/** @see {@link https://github.com/LottieFiles/lottie-react/issues/149} */
import dynamic from "next/dynamic";

const LottieError = dynamic(() => import("./Error").then((mod) => mod.ErrorPlayer), {
  ssr: false,
});
const LottieNavigation = dynamic(() => import("./Navigation").then((mod) => mod.NavigationPlayer), {
  ssr: false,
});
const LottiePrivacy = dynamic(() => import("./Privacy").then((mod) => mod.PrivacyPlayer), {
  ssr: false,
});

export { LottieError, LottieNavigation, LottiePrivacy };
