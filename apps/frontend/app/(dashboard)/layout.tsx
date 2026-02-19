"use client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // This is a very basic client-side check.
    // In a real app, you'd check the token validity with the backend or use middleware.
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
    } else {
      setLoading(false)
    }
  }, [router])

  if (loading) return <div>Loading...</div>

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm p-4">
        <div className="container mx-auto">
          <h1 className="text-xl font-bold">Premium Food Platform</h1>
        </div>
      </nav>
      <main className="container mx-auto p-4">{children}</main>
    </div>
  )
}
