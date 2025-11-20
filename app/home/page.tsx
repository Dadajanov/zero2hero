"use client"

import HomeView from "@/views/HomeView/HomeView"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (isAuthenticated !== "true") {
      router.push("/")
    }
  }, [router])

  return <HomeView />
}
