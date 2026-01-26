"use client";
import { Header } from "@/sections/Header";
import { useState } from "react";
import { Footer } from "@/sections/Footer";
import { Card } from "@/components/Card";
import { CardHeader } from "@/components/CardHeader";
import Image from "next/image";
import grainImage from "@/assets/images/grain.jpg";
import mapImage from "@/assets/images/map.png";
import smileEmoji from "@/assets/images/memoji-smile.png";
import { FaInstagram } from "react-icons/fa6";
import Link from "next/link";
import { FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import { LuArrowUpRight } from "react-icons/lu";

export const metadata = {
  title: "Contact",
  description:
    "Official portfolio of Pawan (itzpa1). A Full-stack Developer specializing in high-performance web applications using Next.js, TypeScript, and Convex.",
  keywords: [
    "Pawan.Dev",
    "itzpa1",
    "Full-stack Developer Portfolio",
    "Next.js Developer India",
    "TypeScript Engineer",
    "Convex Database Expert",
    "Software Engineer Portfolio 2026",
    "React Frontend Developer",
    "Web Scalability Specialist",
    "Tailwind CSS Expert",
    "Portfolio",
    "2026",
  ],
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans flex flex-col">
      <Header />

      <main className="flex-1 py-20 lg:py-28 relative overflow-hidden">
        {/* Background Grain */}
        <div
          className="absolute inset-0 opacity-5 -z-10"
          style={{ backgroundImage: `url(${grainImage.src})` }}
        ></div>

        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4 bg-gradient-to-r from-emerald-300 to-sky-400 text-transparent bg-clip-text">
              Let&apos;s Connect
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              Ready to start your next project or just want to say hello?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8  max-w-6xl lg:max-w-2xl mx-auto">
            {/* Left Column: Map & Socials */}
            <div className="flex flex-col gap-8">
              {/* Map Card */}
              <Card className="md:h-[320px] h-[240px] p-0 relative overflow-hidden group">
                <Image
                  src={mapImage}
                  alt="map"
                  className="h-full w-full object-cover object-left-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-20 rounded-full after:content-[''] after:absolute after:inset-0 after:outline after:outline-2 after:-outline-offset-2 after:rounded-full after:outline-gray-950/30">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400 -z-20 animate-ping [animation-duration:2s]"></div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400 -z-10"></div>
                  <Image
                    src={smileEmoji}
                    alt="smiling memoji"
                    className="size-20"
                  />
                </div>
                <div className="absolute bottom-4 left-4 bg-gray-950/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold border border-white/10 flex items-center gap-1">
                  Based in New Delhi, IN
                  <img
                    src={"https://flagcdn.com/in.svg"}
                    alt="India Flag"
                    className="size-4"
                  />
                </div>
              </Card>

              {/* Socials Card (Draggable) */}
              <Card className="p-4 overflow-hidden">
                <div className="flex items-center justify-evenly text-xl md:text-lg">
                  <Link
                    href={"mailto:pehlalevel@gmail.com"}
                    className="text-white hover:text-white/50 duration-200"
                  >
                    <MdMail />
                  </Link>
                  <Link
                    href={"https://linkedin.com/in/itzpa1"}
                    className="text-white hover:text-white/50 duration-200"
                  >
                    <FaLinkedinIn />
                  </Link>
                  <Link
                    href={"https://instagram.com/code.itzpa1"}
                    className="text-white hover:text-white/50 duration-200"
                  >
                    <FaInstagram />
                  </Link>
                  <Link
                    href={"https://youtube.com/@itz_pa1"}
                    className="text-white hover:text-white/50 duration-200"
                  >
                    <FaYoutube />
                  </Link>
                </div>
              </Card>
            </div>

            {/* Right Column: Contact Form */}
            <Card className="p-8 md:px-6 md:pb-4 md:pt-0 relative overflow-hidden flex flex-col min-h-[480px]">
              <div
                className="absolute inset-0 opacity-5 -z-10"
                style={{ backgroundImage: `url(${grainImage.src})` }}
              ></div>
              <CardHeader
                title={submitted ? "Message Received!" : "Send a Message"}
                description={
                  submitted
                    ? "I'll respond to your inquiry as soon as I can."
                    : "I'll get back to you as soon as possible."
                }
                className="p-0 mb-4 md:m-0"
              />

              {submitted && (
                <div className="flex-1 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500 py-12">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 rounded-full bg-emerald-300/20 animate-ping"></div>
                    <Image
                      src={smileEmoji}
                      alt="Success"
                      className="size-24 relative z-10"
                    />
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl text-emerald-300 mb-2">
                    Thank You!
                  </h3>
                  <p className="text-white/60 mb-8 max-w-xs">
                    Your message has been sent successfully. I usually respond
                    within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-emerald-300 font-semibold text-sm hover:underline cursor-pointer"
                  >
                    ← Send another message
                  </button>
                </div>
              )}

              <form
                className={`flex-1 flex flex-col gap-6 md:gap-4 z-50 ${submitted ? "hidden" : ""}`}
                action={process.env.NEXT_PUBLIC_CONTACT_FORM_ACTION}
                method="POST"
                target="hidden_iframe"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-semibold text-gray-400"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="entry.942523192"
                    placeholder="Enter your name"
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-300 transition-all text-white placeholder:text-gray-600 w-full"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-semibold text-gray-400"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="entry.842124992"
                    placeholder="Enter your email"
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-300 transition-all text-white placeholder:text-gray-600 w-full"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-semibold text-gray-400"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="6"
                    name="entry.1069102244"
                    placeholder="How can I help you?"
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-300 transition-all text-white placeholder:text-gray-600 resize-none w-full"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="mt-auto bg-gradient-to-r from-emerald-300 to-sky-400 text-gray-900 font-bold px-6 h-12 rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-emerald-500/20 uppercase text-sm cursor-pointer z-50"
                >
                  Send Message
                  <LuArrowUpRight className="size-5" />
                </button>
              </form>
              {/* Hidden Iframe to bypass redirect */}
              <iframe
                name="hidden_iframe"
                id="hidden_iframe"
                style={{ display: "none" }}
              ></iframe>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
