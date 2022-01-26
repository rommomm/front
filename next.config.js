module.exports = {
  async redirects() {
    return [
      {
        source: "/settings",
        has: [
          {
            type: "cookie",
            key: "token",
          },
        ],
        permanent: false,
        destination: "/",
      },
    ];
  },
};
