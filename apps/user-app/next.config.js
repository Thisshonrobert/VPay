/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ["ui"],
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
};
