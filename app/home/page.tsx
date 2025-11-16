"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import HomePage from "@/components/home-page"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (isAuthenticated !== "true") {
      router.push("/")
    }
  }, [router])

  return <HomePage />
}
