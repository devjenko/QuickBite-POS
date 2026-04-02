module.exports = {
  apps: [
    {
      name: "bakong-proxy",
      script: "./proxy.js",
      env: {
        PORT: 3001,
        BAKONG_TOKEN: "PASTE_YOUR_BAKONG_TOKEN_HERE",
        PROXY_SECRET: "PASTE_YOUR_GENERATED_SECRET_HERE",
      },
    },
  ],
};
