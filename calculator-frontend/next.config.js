module.exports = {
    webpack: (config) => {
      config.resolve.fallback = {
        // 这里可以添加其他需要的模块
        net: false,
        tls: false,
        http: false,
        https: false,
      };
      return config;
    },
    async rewrites() {
      return [
          {
              source: "/api/:path*",
              destination: "http://localhost:8080/:path*", // 代理到后端服务
          },
      ];
  },
  };