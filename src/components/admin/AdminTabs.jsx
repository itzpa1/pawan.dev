"use client";
import { useState } from "react";
import MediaTab from "./MediaTab";
import ProjectsTab from "./ProjectsTab";
import TestimonialsTab from "./TestimonialsTab";

export default function AdminTabs() {
  const [activeTab, setActiveTab] = useState("media");

  const tabs = [
    { id: "media", label: "Media Library" },
    { id: "projects", label: "Projects" },
    { id: "testimonials", label: "Testimonials" },
  ];

  return (
    <div>
      <div className="flex space-x-4 border-b border-white/10 mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 font-medium text-sm transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? "text-emerald-400 border-b-2 border-emerald-400"
                : "text-white/60 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="min-h-[400px]">
        {activeTab === "media" && <MediaTab />}
        {activeTab === "projects" && <ProjectsTab />}
        {activeTab === "testimonials" && <TestimonialsTab />}
      </div>
    </div>
  );
}
