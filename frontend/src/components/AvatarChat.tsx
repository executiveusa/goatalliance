import React, { useState, useRef, useEffect } from "react";
import { createAvatarClient, AvatarChatResponse } from "../lib/medusa-avatar";

interface Message {
  id: string;
  type: "user" | "avatar";
  text: string;
  emotion?: string;
  timestamp: Date;
}

interface AvatarChatProps {
  medusaUrl?: string;
  avatarId?: string;
  regionId?: string;
  customerId?: string;
  customerEmail?: string;
  cartId?: string;
  onCartUpdate?: (cartId: string) => void;
  className?: string;
}

export function AvatarChat({
  medusaUrl,
  avatarId,
  regionId,
  customerId,
  customerEmail,
  cartId,
  onCartUpdate,
  className = "",
}: AvatarChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const avatarClientRef = useRef(
    createAvatarClient({
      medusaUrl,
      avatarId,
      regionId,
      onError: (error) => {
        console.error("Avatar error:", error);
        setErrorMessage(error.message || "An error occurred");
        // Clear error after 5 seconds
        setTimeout(() => setErrorMessage(null), 5000);
      },
    })
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      text: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response: AvatarChatResponse =
        await avatarClientRef.current.sendMessage(inputValue, {
          customerId,
          customerEmail,
          cartId,
        });

      const avatarMessage: Message = {
        id: response.conversation_id + "_" + Date.now(),
        type: "avatar",
        text: response.avatar_reply.reply_text,
        emotion: response.avatar_reply.emotion,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, avatarMessage]);

      // Handle cart updates
      if (
        response.cart_delta.action !== "none" &&
        response.cart_delta.cart_id
      ) {
        onCartUpdate?.(response.cart_delta.cart_id);
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      const errorMessage: Message = {
        id: "error_" + Date.now(),
        type: "avatar",
        text: "Sorry, I'm having trouble connecting right now. Please try again.",
        emotion: "apologetic",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen && messages.length === 0) {
      // Add welcome message
      const welcomeMessage: Message = {
        id: "welcome",
        type: "avatar",
        text: "Hi! I'm here to help you find exactly what you need. What are you looking for today?",
        emotion: "happy",
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      {/* Chat Widget */}
      {isOpen && (
        <div className="mb-4 w-96 h-[500px] bg-slate-900 border border-slate-700 rounded-lg shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#3C494E] to-[#00B39F] p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#EBC017] flex items-center justify-center text-[#3C494E] font-bold text-lg">
                  AI
                </div>
                <div>
                  <h3 className="font-semibold">Sales Assistant</h3>
                  <p className="text-xs opacity-90">Here to help you</p>
                </div>
              </div>
              <button
                onClick={toggleChat}
                className="text-white hover:text-slate-200 transition-colors"
                aria-label="Close chat"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950">
            {/* Error Banner */}
            {errorMessage && (
              <div className="bg-red-900/20 border border-red-700 rounded-lg px-4 py-3 text-red-400 text-sm">
                {errorMessage}
              </div>
            )}
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.type === "user"
                      ? "bg-[#00B39F] text-white"
                      : "bg-slate-800 text-slate-100 border border-slate-700"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-[#00B39F] rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-[#00B39F] rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                    <div
                      className="w-2 h-2 bg-[#00B39F] rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-slate-700 p-4 bg-slate-900">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00B39F] disabled:opacity-50"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="bg-[#00B39F] hover:bg-[#00997f] disabled:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={toggleChat}
        className="bg-gradient-to-r from-[#00B39F] to-[#3C494E] hover:from-[#00997f] hover:to-[#2d3a3e] text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center transition-all transform hover:scale-110"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        ) : (
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
