"use client";
import AdminLogin from "@/components/Login";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (success) => {
    if (success) {
      router.push("/admin");
      router.refresh();
    }
  };

  return <AdminLogin onLogin={handleLogin} />;
}
