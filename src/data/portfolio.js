import { FaJava, FaPython, FaJs, FaReact, FaNodeJs, FaGithub, FaAws, FaRobot } from "react-icons/fa";
import {
  SiMysql, SiMongodb, SiTailwindcss, SiNextdotjs, SiTypescript, SiAngular, SiRedux,
  SiExpress, SiSpringboot, SiJsonwebtokens, SiPostgresql, SiFirebase, SiDocker, SiNginx,
  SiLinux, SiVercel, SiGit, SiGooglegemini, SiStripe, SiClerk, SiDrizzle,
} from "react-icons/si";
import { DiCss3, DiHtml5 } from "react-icons/di";
import { VscAzureDevops, VscVscode } from "react-icons/vsc";
import { TbApi } from "react-icons/tb";

import merilipiSite from "../Assests/merilipi-site.png";
import merilipiAdmin from "../Assests/image.png";
import apexLearn from "../Assests/apexlearn.png";
import prepGeninImg from "../Assests/Screenshot (2).png";
import chatAppImg from "../Assests/Screenshot (3).png";
import neuroNestImg from "../Assests/Screenshot (8).png";
import tradescapeImg from "../Assests/tradescape.png";
import yogaImg from "../Assests/yoga.png";
import schemaImg from "../Assests/schema-builder.png";
import ticTacToeImg from "../Assests/tic-tac-toe.png";

export const profile = {
  name: "Deepak Maurya",
  title: "Full Stack Developer",
  role: "Full Stack Developer at MeriLipi",
  intro:
    "Full Stack Developer with 1 year of experience building scalable web apps with React, Next.js, Node.js, TypeScript and MongoDB. I focus on REST APIs, Redis-based performance tuning, real-time WebSocket systems and cloud deployments on AWS and Azure.",
  headline: "I build fast, scalable web apps.",
  focus: ["REST APIs", "Redis caching", "WebSockets", "Database design", "CI/CD", "AWS", "Azure"],
  resume: "https://drive.google.com/file/d/1U1Lmf4tGp2nvcL-xoJV2xoNm3HIHxIz9/view?usp=sharing",
  links: {
    github: "https://github.com/deepakmaurya1378",
    linkedin: "https://www.linkedin.com/in/deepak-maurya112/",
    leetcode: "https://leetcode.com/u/deepakmaurya1378/",
    linktree: "https://linktr.ee/deepak_maurya112",
  },
};

export const jobs = [
  {
    role: "Full Stack Developer",
    company: "PUN LEARN (MeriLipi)",
    type: "Full-time",
    period: "Jan 2026 – Present",
    points: [
      "Build and maintain scalable MERN stack applications (MongoDB, Express.js, React.js, Node.js) for an EdTech platform.",
      "Developed and optimized REST APIs with Redis caching and query optimization, cutting API response times from ~800ms to ~480ms (40% faster).",
      "Implemented JWT authentication and role-based authorization for the Lipi app backend.",
      "Built real-time features with WebSockets and MongoDB: live classes, payments, learner progress tracking and user management.",
      "Designed database schemas and migrations across MySQL and MongoDB for new product features.",
      "Contributed to Azure DevOps CI/CD pipelines and Azure App Service deployments, supporting 99.9% uptime.",
    ],
    skills: ["Next.js", "Node.js", "Express.js", "REST APIs", "MySQL", "MongoDB", "Redis", "AWS", "Docker", "Azure DevOps"],
    work: [
      { title: "MeriLipi", link: "https://merilipi.com/", image: merilipiSite },
      { title: "Apex Learning Centre", link: "https://apexlearncenter.com/", image: apexLearn },
      { title: "MeriLipi Admin Panel", image: merilipiAdmin },
    ],
  },
  {
    role: "Web Developer Intern",
    company: "INOX Software Solutions Pvt. Ltd.",
    type: "Internship · On-site",
    period: "Oct 2025 – Jan 2026",
    location: "Lucknow, Uttar Pradesh",
    points: [
      "Developed secure REST APIs for a role-based food delivery platform using Spring Boot, Spring Security (JWT) and MySQL.",
      "Implemented login, OTP verification, refresh tokens, multi-device sessions and role-based access control.",
      "Built vendor onboarding, menu management, order processing, wallet transactions and admin moderation modules.",
    ],
    skills: ["Java", "Spring Boot", "Spring Security (JWT)", "Spring Data JPA", "Hibernate", "MySQL", "REST APIs", "Postman", "React.js"],
  },
];

export const education = [
  {
    title: "High School",
    degree: "Class 10th",
    period: "Jun 2016 – Jul 2017",
    placeLabel: "School",
    place: "L.S.M Inter College, Lucknow",
    year: "2017",
    scoreLabel: "Percentage",
    score: "72.67%",
  },
  {
    title: "Intermediate",
    degree: "Class 12th",
    period: "Jun 2018 – Jul 2019",
    placeLabel: "School",
    place: "Indian Public Inter College, Lucknow",
    year: "2019",
    scoreLabel: "Percentage",
    score: "72.20%",
  },
  {
    title: "College",
    degree: "B.Tech, Computer Science (Data Science)",
    period: "Nov 2020 – Aug 2024",
    placeLabel: "College",
    place: "Noida Institute of Engineering & Technology, Greater Noida",
    year: "2024",
    scoreLabel: "CGPA",
    score: "7.01",
  },
];

export const skillGroups = [
  {
    title: "Languages",
    skills: [[FaJava, "Java"], [FaJs, "JavaScript"], [SiTypescript, "TypeScript"], [FaPython, "Python"], [SiMysql, "SQL"]],
  },
  {
    title: "Frontend",
    skills: [
      [FaReact, "React.js"], [SiNextdotjs, "Next.js"], [SiAngular, "Angular"], [SiRedux, "Redux Toolkit"],
      [DiHtml5, "HTML5"], [DiCss3, "CSS3"], [SiTailwindcss, "Tailwind CSS"],
    ],
  },
  {
    title: "Backend",
    skills: [
      [SiSpringboot, "Spring Boot"], [FaNodeJs, "Node.js"], [SiExpress, "Express.js"],
      [TbApi, "REST APIs"], [SiJsonwebtokens, "JWT Authentication"],
    ],
  },
  {
    title: "Databases",
    skills: [[SiMongodb, "MongoDB"], [SiPostgresql, "PostgreSQL"], [SiMysql, "MySQL"], [SiFirebase, "Firebase"]],
  },
  {
    title: "Cloud & DevOps",
    skills: [
      [FaAws, "AWS (S3, ECS)"], [SiDocker, "Docker"], [SiNginx, "Nginx"], [SiLinux, "Linux / Bash"],
      [VscAzureDevops, "Azure DevOps"], [SiVercel, "Vercel"],
    ],
  },
  {
    title: "AI & Tools",
    skills: [
      [SiGooglegemini, "Gemini API"], [FaRobot, "Groq API"], [SiGit, "Git"], [FaGithub, "GitHub"],
      [VscVscode, "VS Code"], [SiPostgresql, "Neon PostgreSQL"],
    ],
  },
  {
    title: "APIs & Libraries",
    skills: [[SiStripe, "Stripe API"], [SiClerk, "Clerk"], [SiDrizzle, "Drizzle ORM"]],
  },
];

export const projects = [
  {
    title: "Prep-Genin: AI Mock Interview",
    featured: true,
    period: "Nov – Dec 2024",
    image: prepGeninImg,
    demoLink: "https://prep-genin.vercel.app/",
    srcCode: "https://github.com/deepakmaurya1378/Prep-genin",
    main: "An AI mock-interview platform that generates tailored interview questions and evaluates your answers in real time using the Gemini LLM, with Clerk authentication and score history stored in PostgreSQL.",
    tags: ["Next.js", "Clerk", "Drizzle ORM", "PostgreSQL", "Gemini API"],
  },
  {
    title: "Raven: Real-time Chat App",
    featured: true,
    image: chatAppImg,
    demoLink: "https://fullstack-chatapp-w3ne.onrender.com/login",
    srcCode: "https://github.com/deepakmaurya1378/RAVEN-",
    main: "A full-stack chat app for meeting strangers in real time, built on the MERN stack with Socket.io for instant messaging, Redux for state and JWT for secure authentication.",
    tags: ["React", "Node.js", "Express.js", "MongoDB", "Socket.io", "Redux", "JWT"],
  },
  {
    title: "Neuro Nest: Online Therapy App",
    featured: true,
    period: "Jan 2024 – Feb 2025",
    image: neuroNestImg,
    demoLink: "https://neuro-nest-frontend.vercel.app/",
    srcCode: "https://github.com/deepakmaurya1378/Neuro-Nest-Frontend",
    main: "An online therapy platform where clients book sessions, pay securely with Stripe, chat with therapists in real time and track their emotions in a journal.",
    tags: ["React", "Node.js", "Express.js", "MongoDB", "Redux Toolkit", "Stripe"],
  },
  {
    title: "Trader Risk Dashboard",
    image: tradescapeImg,
    demoLink: "https://tradescape-beige.vercel.app/",
    srcCode: "https://github.com/deepakmaurya1378/Tradescape",
    main: "A dashboard for traders to track balance, performance and account-rule risk (drawdown and daily loss limits), with editable rules and a hand-built SVG equity chart.",
    tags: ["React", "TypeScript", "Vite"],
  },
  {
    title: "JSON Schema Builder",
    image: schemaImg,
    demoLink: "https://schema-builder-ten.vercel.app/",
    srcCode: "https://github.com/deepakmaurya1378/Schema-Builder",
    main: "Build JSON schemas visually with a live preview. Save, edit and delete schemas, stored in the browser with localStorage.",
    tags: ["React", "TypeScript", "shadcn/ui", "Tailwind"],
  },
  {
    title: "Yoga Landing Page",
    image: yogaImg,
    demoLink: "https://yoga-landing-page-zeta.vercel.app/",
    srcCode: "https://github.com/deepakmaurya1378/Yoga-Landing-Page",
    main: "A responsive landing page for a yoga studio with programs, pricing, instructors and a free-trial sign-up form.",
    tags: ["React", "Vite"],
  },
  {
    title: "Tic Tac Toe",
    image: ticTacToeImg,
    demoLink: "https://tic-tak-toe-dusky.vercel.app/",
    srcCode: "https://github.com/deepakmaurya1378/Tic-Tak",
    main: "The classic two-player Tic Tac Toe game in the browser, with a reset button to start a new round.",
    tags: ["JavaScript"],
  },
];

export const highlights = [
  {
    value: "1+ yr",
    title: "Full-stack experience",
    detail: "Production work at MeriLipi and INOX Software Solutions, from database schema to deployment.",
    kind: "experience",
  },
  {
    value: "Spring Boot",
    title: "Java backend",
    detail: "Secure REST APIs with Spring Security (JWT), Spring Data JPA, Hibernate and MySQL for a role-based food delivery platform.",
    kind: "springboot",
  },
  {
    value: "Node.js",
    title: "APIs and real-time",
    detail: "Express REST APIs and WebSockets for live classes, payments and learner progress, backed by MongoDB and MySQL.",
    kind: "nodejs",
  },
  {
    value: "40%",
    title: "Performance optimisation",
    detail: "Cut API response times from ~800ms to ~480ms with Redis caching and query optimization.",
    kind: "performance",
  },
  {
    value: "99.9%",
    title: "DevOps and cloud",
    detail: "Azure DevOps CI/CD pipelines, Azure App Service, Docker, AWS (S3, ECS) and Nginx behind 99.9% uptime.",
    kind: "devops",
  },
  {
    value: "1200",
    title: "Rated chess player",
    detail: "Chess keeps my thinking sharp: planning ahead, weighing trade-offs and staying calm under pressure.",
    kind: "chess",
  },
];
