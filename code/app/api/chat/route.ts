import { type NextRequest, NextResponse } from "next/server"

interface ChatRequest {
  message: string
  conversationHistory: Array<{
    role: "user" | "assistant"
    content: string
  }>
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json()
    const { message, conversationHistory } = body

    const PYTHON_API_URL = process.env.PYTHON_API_URL || "http://localhost:5000/api/chat"

    const response = await fetch(PYTHON_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        conversation_history: conversationHistory,
      }),
    })

    if (!response.ok) {
      throw new Error(`Python API error: ${response.statusText}`)
    }

    const data = await response.json()

    return NextResponse.json({
      response: data.response || data.message || "Sorry, I could not process your request.",
    })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json(
      {
        error: "Failed to process chat request",
        response: "Sorry, I encountered an error. Please try again later.",
      },
      { status: 500 },
    )
  }
}
