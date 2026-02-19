"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("token")
    router.push("/login")
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Welcome to your Dashboard</h2>
      <p className="mb-4">This is a protected route.</p>
      <Button onClick={handleLogout} variant="destructive">
        Logout
      </Button>
    </div>
  )
}
