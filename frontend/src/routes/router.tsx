import { createBrowserRouter } from "react-router-dom"
import { LandingPage } from "./screens/landing-page"

export const router = createBrowserRouter([
  {
    path: "*",
    element: <LandingPage />
  }
])
