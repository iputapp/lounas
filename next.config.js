/** @see {@link https://nextjs.org/docs/app/building-your-application/styling/sass} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /** @see {@link https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions#convention} */
  experimental: {
    serverActions: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "src/styles")],
  },
  /** @see {@link https://github.com/vercel/next.js/issues/48177#issuecomment-1506251112} */
  webpack: (config) => {
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
              "#000": "{props.color}",
              "#000000": "{props.color}",
              "#FFF": "{props.color}",
              "#fff": "{props.color}",
              "#FFFFFF": "{props.color}",
              "#ffffff": "{props.color}",
            },
          },
        },
      ],
    });
    return config;
  },
};

module.exports = nextConfig;
