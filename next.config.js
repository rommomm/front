module.exports = {
  async redirects() {
    return [
      {
        source: "/settings",
        permanent: false,
        destination: "/",
      },
    ];
  },
};
