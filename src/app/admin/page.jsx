"use client";
import AdminTabs from "@/components/admin/AdminTabs";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AdminPanel() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
      toast.success("Logged out");
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Logout failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="w-full mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/10 bg-gray-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex justify-between items-center py-4">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-sky-500 text-transparent bg-clip-text">
              Admin Dashboard
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <AdminTabs />
      </main>
    </div>
  );
}
