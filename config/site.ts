export const siteConfig = {
  baseURL: process.env.NODE_ENV === 'production' ? 'http://localhost:3000' : 'http://localhost:3000',
  name: "Hwasurr's Devlog",
  profile: {
    name: 'hwasurr',
    avatarSrc: 'https://github.com/hwasurr.png',
    email: 'iamsupermazinga@gmail.com',
    description: 'Typescript, Web Fullstack, Aws, CI/CD, DevOps 등에 관심이 많습니다.🚴‍♀️',
  },
  links: {
    github: 'https://github.com/hwasurr',
  },
} as const;
