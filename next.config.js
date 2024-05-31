const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hwasurrimages.s3.ap-northeast-2.amazonaws.com',
      },
    ],
  },
  async redirects() {
    return [
      // 이전 버전 블로그 콘텐츠 영구 리디렉션 처리
      {
        source: '/api/graphql-example',
        destination: '/blog/api/graphql-example',
        permanent: true,
      },
      {
        source: '/api/rest-graphql-differences',
        destination: '/blog/api/rest-graphql-differences',
        permanent: true,
      },
      {
        source: '/AWS/architecting-on-aws',
        destination: '/blog/AWS/architecting-on-aws',
        permanent: true,
      },
      {
        source: '/AWS/infrastructure-as-code',
        destination: '/blog/AWS/infrastructure-as-code',
        permanent: true,
      },
      {
        source: '/AWS/microservice-with-ecs',
        destination: '/blog/AWS/microservice-with-ecs',
        permanent: true,
      },
      {
        source: '/git-github/git-manage',
        destination: '/blog/git-github/git-manage',
        permanent: true,
      },
      {
        source: '/git-github/github-actions',
        destination: '/blog/git-github/github-actions',
        permanent: true,
      },
      {
        source: '/nesetjs/caching',
        destination: '/blog/nesetjs/caching',
        permanent: true,
      },
      {
        source: '/redis/cluster',
        destination: '/blog/redis/cluster',
        permanent: true,
      },
      {
        source: '/resume',
        destination: 'https://hwasurr.notion.site/5df50182387a49b4bfec406d644a9d13?pvs=4',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
