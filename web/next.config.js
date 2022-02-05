const { i18n } = require("./next-i18next.config");

module.exports = {
  reactStrictMode: true,
  i18n,
  webpack: (config, { isServer }) => {
    if (isServer) {
      require("./scripts/sitemap-generator");
    }
    return config;
  },
};
