import type { Course } from '../types/courses';

export const sampleCourses: Course[] = [
  {
    id: 1,
    title: "DeepLearning.AI TensorFlow developer",
    platform: "Coursera",
    institution: "DeepLearning.AI",
    description: "Learn to build AI apps with Tensorflow. Build, train, and optimize deep neural networks and dive deep into Computer Vision, Natural Language Processing, and Time Series Analysis, along with best practices and hands-on experience in one of the most in-demand deep learning frameworks.",
    level: "Intermediate",
    duration: "2 months",
    isSpecialization: true,
    coursesCount: 4,
    link: "https://coursera.org/share/9de539ed2f3dcba737d89cd8616e370a",
    tags: ["Deep Learning", "Neural Networks", "AI", "Python", "TensorFlow"]
  },
  {
    id: 2,
    title: "IBM AI Developer",
    platform: "Coursera",
    institution: "IBM",
    description: "Kickstart your career in artificial intelligence. Build job-ready skills in AI technologies, generative AI models, and programming and learn to build AI-powered chatbots and apps in just 6 months",
    level: "Beginner",
    duration: "6 months",
    isSpecialization: true,
    coursesCount:10,
    link: "https://coursera.org/share/37d2450940f524f020c2855fa9036b29",
    tags: ["AI", "Python Programming", "Generative AI"]
  },
    {
    id: 3,
    title: "Object Oriented Programming",
    platform: "Coursera",
    institution: "University of London",
    description: "Build a Crypto-Trading Platform with C++. Develop Object Oriented programming and data handling skills in C++ through an exciting worked example",
    level: "Intermediate",
    duration: "1 month",
    coursesCount:5,
    isSpecialization: true,
    link: "https://coursera.org/share/12c17cf2040f8d808c12585ca62e5af4",
    tags: ["C++", "Software Engineering", "Computer Programming"]
  },
    {
    id: 4,
    title: "Practical Guide to Trading",
    platform: "Coursera",
    institution: "Interactive Brokers",
    description: "Understand the interconnectedness of the global capital markets with a practical emphasis on trading. By the end of this specialization, the interweaving of several capital markets will be apparent to students keen to learn about its mechanics, as well as those investors whose strengths are limited to their existing trading knowledge.",
    level: "Beginner",
    duration: "1 month",
    coursesCount:4,
    isSpecialization: true,
    link: "https://coursera.org/share/e62480c9873853ae9151e010877aa75d",
    tags: ["Financial Markets", "Securities training", "Option strategies"]
  },
    {
    id: 5,
    title: "Blockchain",
    platform: "Coursera",
    institution: "University of Buffalo",
    description: "Innovate with the Next Frontier in Technology. Learn how the blockchain is leading to a paradigm shift in decentralized application programming",
    level: "Beginner",
    duration: "2 months",
    coursesCount:4,
    isSpecialization: true,
    link: "https://coursera.org/share/07f12782252483ddec3a1b2b764829ed",
    tags: ["Smart Contract", "Blockchains", "Solidity"]
  },
];