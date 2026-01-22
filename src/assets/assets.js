import { BiLogoVisualStudio } from "react-icons/bi";
import { FaAws } from "react-icons/fa";
import {
  SiGithub,
  SiPostman,
  SiZoho,
  SiWix,
  SiCanva,
  SiAdobephotoshop,
  SiDavinciresolve,
  SiAdobepremierepro,
  SiExpo,
  SiJavascript,
  SiPython,
  SiHtml5,
  SiCss3,
  SiCplusplus,
  SiLatex,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiTailwindcss,
  SiDjango,
  SiMongodb,
  SiFirebase,
  SiGooglecloud,
  SiMaterialdesign,
  SiBurpsuite,
  SiKalilinux,
} from "react-icons/si";

export const techStack = [
  // Languages
  { title: "JavaScript", icon: SiJavascript },
  { title: "Python", icon: SiPython },
  { title: "HTML5", icon: SiHtml5 },
  { title: "CSS3", icon: SiCss3 },
  { title: "C++", icon: SiCplusplus },
  { title: "LaTeX", icon: SiLatex },

  // Frameworks & Libraries
  { title: "React", icon: SiReact },
  { title: "Next.js", icon: SiNextdotjs },
  { title: "Node.js", icon: SiNodedotjs },
  { title: "React Native", icon: TbBrandReactNative },
  { title: "Tailwind CSS", icon: SiTailwindcss },
  { title: "Django", icon: SiDjango },
  { title: "Material UI", icon: SiMaterialdesign },

  // Cloud & Databases
  { title: "MongoDB", icon: SiMongodb },
  { title: "Firebase", icon: SiFirebase },
  { title: "AWS", icon: FaAws },
  { title: "Google Cloud", icon: SiGooglecloud },
  { title: "Convex", icon: BsDatabaseFillCheck },
];

export const toolboxItems = [
  { title: "VS Code", icon: BiLogoVisualStudio, left: "15%", top: "10%" },
  { title: "GitHub", icon: SiGithub, left: "35%", top: "15%" },
  { title: "Postman", icon: SiPostman, left: "65%", top: "20%" },
  { title: "Zoho CRM", icon: SiZoho, left: "15%", top: "40%" },
  { title: "Wix", icon: SiWix, left: "50%", top: "40%" },
  { title: "Canva", icon: SiCanva, left: "75%", top: "45%" },
  { title: "Photoshop", icon: SiAdobephotoshop, left: "10%", top: "65%" },
  { title: "DaVinci Resolve", icon: SiDavinciresolve, left: "40%", top: "70%" },
  { title: "Premiere", icon: SiAdobepremierepro, left: "70%", top: "70%" },
  { title: "Expo Go", icon: SiExpo, left: "60%", top: "85%" },
  { title: "BurpSuite", icon: SiBurpsuite, left: "80%", top: "80%" },
  { title: "Kali Linux", icon: SiKalilinux, left: "10%", top: "90%" },
];

import darpanLandingPage from "@/assets/images/darpan.png";
import todoNativeApp from "@/assets/images/todo.png";
import getFameLandingPage from "@/assets/images/getfame.png";
import vpnGateLandingPage from "@/assets/images/vpngate.png";
import { BsDatabaseFillCheck } from "react-icons/bs";
import { TbBrandReactNative } from "react-icons/tb";

export const Projects = [
  {
    company: "SIH",
    year: "2025",
    title: "Darpan",
    results: [
      { title: "Real-time camera based pose detection" },
      { title: "Bharatnatyam AI Model" },
      { title: "Runs entirely on browser" },
    ],
    link: "https://darpan-apk.vercel.app/",
    repo: "https://github.com/itzpa1/darpan-apk-landing-page",
    image: darpanLandingPage,
    isDummy: true,
  },
  {
    company: "Expo GO",
    year: "2025",
    title: "Todo React Native App",
    results: [
      { title: "Live Progress Bar at the top" },
      { title: "Auto-sync toggle" },
      { title: "All Updates reflect instantly" },
    ],
    link: "https://github.com/itzpa1/ToDo-ReactNative",
    repo: "https://github.com/itzpa1/ToDo-ReactNative",
    image: todoNativeApp,
    isDummy: true,
  },
  {
    company: "Secure Connection",
    year: "2025",
    title: "VPNGate : Secure Connection (for windows)",
    results: [
      { title: "Real Growth, Real Fast" },
      { title: "100% Safe & Secure" },
      { title: "No Hidden Fees, No Login, No Hassle" },
    ],
    link: "https://github.com/itzpa1/VPNWidget/",
    repo: "https://github.com/itzpa1/VPNWidget/",
    image: vpnGateLandingPage,
    isDummy: true,
  },
  {
    company: "Social Media",
    year: "2025",
    title: "GetFame : Ultimate Social Media Booster",
    results: [
      { title: "Real Growth, Real Fast" },
      { title: "100% Safe & Secure" },
      { title: "No Hidden Fees, No Login, No Hassle" },
    ],
    link: "https://getfame-free.vercel.app/",
    repo: "https://github.com/itzpa1/GetFame-Website",
    image: getFameLandingPage,
    isDummy: true,
  },
];
