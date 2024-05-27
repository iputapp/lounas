import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import("next").NextConfig} */
const nextConfig = {
  /** @see {@link https://nextjs.org/docs/app/building-your-application/styling/sass} */
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  webpack: (config) => {
    /** @see {@link https://github.com/vercel/next.js/issues/48177#issuecomment-1506251112} */
    config.module.rules.push({
      test: /\.svg$/i,
      use: [
        {
          loader: "@svgr/webpack",
          /** @see {@link https://react-svgr.com/docs/options/} */
          options: {
            icon: "1.5em", // default size of icon
            typescript: true,
            svgo: false,
            replaceAttrValues: {
              "#000": "currentColor",
              "#000000": "currentColor",
              "#FFF": "currentColor",
              "#fff": "currentColor",
              "#FFFFFF": "currentColor",
              "#ffffff": "currentColor",
            },
          },
        },
      ],
    });
    /** @see {@link https://github.com/vercel/next.js/discussions/11267#discussioncomment-2352225} */
    config.module.rules
      .find(({ oneOf }) => !!oneOf)
      .oneOf.filter(({ use }) => JSON.stringify(use)?.includes("css-loader"))
      .reduce((acc, { use }) => acc.concat(use), [])
      .forEach(({ options }) => {
        if (options.modules) {
          options.modules.exportLocalsConvention = "camelCase";
        }
      });
    return config;
  },
};

export default nextConfig;
