"use client";
import { useState } from "react";
import AdminLogin from "@/components/Login";
import FileUpload from "@/components/FileUpload";

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <AdminLogin onLogin={setIsAuthenticated} />;
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="w-full mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/15 bg-gray-950/50 z-10">
        <div className="flex justify-between items-center py-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
            <p className="text-white/80 hidden md:inline-flex">
              Upload files to Cloudinary folders
            </p>
          </div>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="bg-white hover:bg-white/70 text-gray-900 px-4 py-2 rounded-md font-medium"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-full mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <FileUpload />
        </div>
      </main>
    </div>
  );
}
