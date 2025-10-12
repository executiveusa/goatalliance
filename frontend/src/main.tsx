import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import "./styles/globals.css"
import { router } from "./routes/router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const container = document.getElementById("root")

if (!container) {
  throw new Error("Root container not found")
}

const queryClient = new QueryClient()

createRoot(container).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
)
