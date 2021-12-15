module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/profile/:slug",
        destination: "/",
        permanent: true,
      },
    ];
  },
};
