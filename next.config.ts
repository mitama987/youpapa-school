import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // 旧 GitHub Pages の .html パスから新パスへ
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/community.html", destination: "/community", permanent: true },
      { source: "/privacy.html", destination: "/privacy", permanent: true },
      { source: "/articles/index.html", destination: "/articles", permanent: true },
      { source: "/articles/", destination: "/articles", permanent: true },
      {
        source: "/articles/fukugyo-ai-start.html",
        destination: "/articles/fukugyo-ai-start",
        permanent: true,
      },
      {
        source: "/courses/fukugyo-ai.html",
        destination: "/courses/fukugyo-ai",
        permanent: true,
      },
      { source: "/lessons/step1.html", destination: "/lessons/step1", permanent: true },
      { source: "/lessons/step2.html", destination: "/lessons/step2", permanent: true },
      { source: "/lessons/step3.html", destination: "/lessons/step3", permanent: true },
      { source: "/lessons/step4.html", destination: "/lessons/step4", permanent: true },
      { source: "/lessons/pitfalls.html", destination: "/lessons/pitfalls", permanent: true },
    ];
  },
};

export default nextConfig;
