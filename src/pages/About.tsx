import React from "react";
import { Button } from "../components/ui/button";
import {
  ExternalLink,
  Award,
  Users,
  Lightbulb,
  Scissors,
  CableCar,
  PackageOpen,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const familyPhoto = new URL("../assets/family-photo.png", import.meta.url).href;

export function About() {
  const values = [
    {
      icon: Users,
      title: "User-Centered",
      description:
        "Every decision starts with understanding the people for whom we're designing.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "Pushing boundaries while staying grounded in proven design principles.",
    },
    {
      icon: Award,
      title: "Excellence",
      description:
        "Sweating the details to create experiences that truly stand out.",
    },
  ];

  const motto = [
    {
      icon: Scissors,
      title: "Trim the Trivial",
      description:
        "Remove any detail that doesn't add to the experience.",
    },
    {
      icon: CableCar,
      title: "Elevate the Essential",
      description:
        "What does belong in the experience must be elevated to it's best version.",
    },
    {
      icon: PackageOpen,
      title: "Deliver the Delight",
      description:
        "Once it has everything it needs and nothing it doesn't, make sure it is delightful.",
    },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-gray-900 mb-6 text-[32px] font-medium">
                Hi, I'm Tyler. 
              </h1>
              <h2 className="text-gray-600 mb-6 text-[20px] font-medium">I'm a design leader, problem solver, husband, and dad.</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">For more than 13 years, I’ve led teams in creating products used by millions. My focus is on clarity, trust, and thoughtful collaboration, especially when the problems are complex and the stakes are high.</p>
              <p className="text-gray-600 mb-8 leading-relaxed">In my current role at Entrata, I help guide the UX vision for a large, interconnected platform that supports the daily work of property managers and residents. I care deeply about understanding real needs and shaping solutions that make life easier in meaningful, lasting ways.</p>
              <p className="text-gray-600 mb-8 leading-relaxed">My personal life is really important to me. I love my family, spending time with my wife and kids. I have multiple house projects ongoing at any given time and am working towards perfecting my homemade pizza.</p>
              <a href="https://www.linkedin.com/in/tyler-dean-mundy-54903465" target="_blank" >
                <Button className="bg-sky-600 hover:bg-sky-700">
                <ExternalLink className="h-4 w-4"/>
                  LinkedIn Profile
                </Button>
              </a>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <ImageWithFallback
                  src={familyPhoto}
                  alt="Professional portrait"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-gray-900 mb-4">A few principles that shape how I lead and design</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="p-8 bg-gray-50 rounded-xl shadow-sm"
              >
                <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mb-6 shadow-sm">
                  <value.icon className="w-6 h-6 text-sky-600" />
                </div>
                <h3 className="text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills & Expertise */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-gray-900 mb-4 font-semibold text-2xl">Expertise</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Over 13 years of honing my craft across various
              disciplines
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            <div className="flex flex-col items-start justify-start md:items-end md:justify-end">
              <h3 className="text-gray-900 mb-6 font-semibold">
                Design & Strategy
              </h3>
              <div className="space-y-4 items-end justify-end">
                {[
                  "User Research & Testing",
                  "Information Architecture",
                  "Interaction Design",
                  "Design Systems",
                  "Product Strategy",
                  "Workshop Facilitation",
                ].map((skill) => (
                  <div
                    key={skill}
                    className="flex items-end gap-3"
                  >
                    <div className="w-2 h-2 bg-sky-600 rounded-full" />
                    <span className="text-gray-700">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-gray-900 mb-6 font-semibold">
                Leadership & Tools
              </h3>
              <div className="space-y-4">
                {[
                  "Team Management",
                  "Mentoring and Coaching",
                  "Systems Building",
                  "Figma & Adobe Creative Suite",
                  "AI Enabled Product Building",
                  "Analytics & Metrics",
                ].map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center gap-3"
                  >
                    <div className="w-2 h-2 bg-sky-600 rounded-full" />
                    <span className="text-gray-700">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-gray-900 mb-4">My Motto</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The 3 focuses when deisgning or critiquing a
              design
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {motto.map((value) => (
              <div
                key={value.title}
                className="p-8 bg-sky-50 rounded-xl"
              >
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-6">
                  <value.icon className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-sky-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-sky-700">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section> */}
    </div>
  );
}