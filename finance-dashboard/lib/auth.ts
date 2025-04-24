// Authentication functions to interact with the backend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

export  interface User{
    id: string
    fullName: string
    email: string
    token: string
}


// Error handling helper
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || "API request failed")
  }
  return response.json()
}

// Sign in user
export const signIn = async ({ email, password }: { email: string; password: string }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    const data:User = await handleResponse(response)
    console.log(data);
    // Store token in localStorage
    if (data.token) {
      localStorage.setItem("authToken", JSON.stringify(data.token))
      localStorage.setItem("user", JSON.stringify(data))
    }

    return data
  } catch (error) {
    console.error("Error signing in:", error)
   // throw error
  }
}

// Sign up user
export const signUp = async ({ fullName, email, password }: { fullName: string; email: string; password: string }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fullName, email, password }),
    })

    return handleResponse(response)
  } catch (error) {
    console.error("Error signing up:", error)
   // throw error
  }
}

// Sign out user
export const signOut = () => {
  localStorage.removeItem("authToken")
  localStorage.removeItem("user")
  window.location.href = "/signin"
}

// Get current user
export const getCurrentUser = () => {
  if (typeof window === "undefined") return null

  const userStr = localStorage.getItem("user")
  if (!userStr) return null

  try {
    return JSON.parse(userStr)
  } catch (error) {
    console.error("Error parsing user data:", error)
    return null
  }
}

// Check if user is authenticated
export const isAuthenticated = () => {
  if (typeof window === "undefined") return false
  return !!localStorage.getItem("authToken")
}

// Get auth token
export const getAuthToken = () => {
  if (typeof window === "undefined") return null
  return localStorage.getItem("authToken")
}

// Update API client to include auth token
export const getAuthHeaders = () => {
  const token = getAuthToken()
  return token ? { Authorization: `Bearer ${token}` } : null
}
