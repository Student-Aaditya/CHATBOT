"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, X, MessageCircle, Minimize2 } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! 👋 Welcome to NIET. I'm here to answer your questions about admissions, programs, placements, and more. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
          conversationHistory: messages.map((m) => ({
            role: m.sender === "user" ? "user" : "assistant",
            content: m.text,
          })),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I encountered an error. Please try again.",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Chat Bubble Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen)
          if (!isOpen) setIsMinimized(false)
        }}
        className={`fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-2xl transition-all duration-300 z-40 flex items-center justify-center group ${
          isOpen
            ? "bg-linear-to-br from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
            : "bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 hover:scale-110"
        }`}
        aria-label="Chat with NIET"
      >
        {isOpen ? (
          <X className="w-7 h-7 text-white" />
        ) : (
          <div className="relative">
            <MessageCircle className="w-7 h-7 text-white" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-pulse" />
          </div>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`fixed bottom-24 right-6 w-96 bg-white rounded-2xl shadow-2xl flex flex-col transition-all duration-300 z-50 border border-slate-200 overflow-hidden ${
            isMinimized ? "h-16" : "h-[600px]"
          }`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-red-700 text-white p-5 flex justify-between items-center flex-shrink-0">
            <div>
              <h2 className="font-bold text-lg tracking-tight">NIET Assistant</h2>
              <p className="text-slate-300 text-xs font-medium">Powered by AI • Always here to help</p>
            </div>
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              aria-label="Minimize chat"
            >
              <Minimize2 className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Messages Container */}
          {!isMinimized && (
            <>
              <div className="flex-1 overflow-y-auto p-5 bg-slate-50 space-y-4 flex flex-col">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                  >
                    <div
                      className={`max-w-xs px-4 py-3 rounded-2xl transition-all ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-red-600 to-red-500 text-white rounded-br-none shadow-md hover:shadow-lg"
                          : "bg-white text-slate-900 border border-slate-200 rounded-bl-none shadow-sm hover:shadow-md"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <span
                        className={`text-xs mt-2 block opacity-70 font-medium ${message.sender === "user" ? "text-red-100" : "text-slate-500"}`}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="bg-white text-slate-900 border border-slate-200 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm">
                      <div className="flex space-x-2">
                        <div className="w-2.5 h-2.5 bg-gradient-to-r from-red-600 to-red-500 rounded-full animate-bounce"></div>
                        <div className="w-2.5 h-2.5 bg-gradient-to-r from-red-600 to-red-500 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2.5 h-2.5 bg-gradient-to-r from-red-600 to-red-500 rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-slate-200 p-4 bg-white flex-shrink-0">
                <form onSubmit={handleSendMessage} className="flex gap-3">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2.5 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent text-slate-900 bg-slate-50 placeholder-slate-400 transition-all text-sm"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 disabled:from-slate-400 disabled:to-slate-400 text-white px-5 py-2.5 rounded-full transition-all duration-300 flex items-center gap-2 font-medium shadow-md hover:shadow-lg disabled:shadow-none"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}
