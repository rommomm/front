module.exports = {
  async redirects() {
    return [
      {
        source: "/settings",
        destination: "/",
        permanent: false,
      },
    ];
  },
};
