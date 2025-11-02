"use client"

import ChatWidget from "@/components/ChatWidget"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Your website content goes here */}
      <div className="p-8">
        <h1 className="text-4xl font-bold text-gray-900">Welcome to NIET</h1>
        <p className="text-gray-600 mt-4">The chatbot will appear in the bottom right corner</p>
      </div>

      <ChatWidget />
    </div>
  )
}
