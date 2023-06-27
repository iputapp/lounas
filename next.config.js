/**
 * @summary
 * https://nextjs.org/docs/app/building-your-application/styling/sass
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /** @summary https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions#convention */
  experimental: {
    serverActions: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "src/styles")],
  },
};

module.exports = nextConfig;
