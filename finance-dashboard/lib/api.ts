// API functions to interact with the backend
import { getAuthHeaders } from "./auth"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

// Error handling helper
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || "API request failed")
  }
  return response.json()
}

// Fetch dashboard summary (total balance, income, expenses)
export const fetchDashboardSummary = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/transactions/summary`, {
      headers: {
        ...getAuthHeaders(),
      },
    })
    return handleResponse(response)
  } catch (error) {
    console.error("Error fetching dashboard summary:", error)
    throw error
  }
}

// Fetch expenses by category for the pie chart
export const fetchExpensesByCategory = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/transactions/expenses-by-category`, {
      headers: {
        ...getAuthHeaders(),
      },
    })
    return handleResponse(response)
  } catch (error) {
    console.error("Error fetching expenses by category:", error)
    throw error
  }
}

// Fetch monthly comparison data for the bar chart
export const fetchMonthlyComparison = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/transactions/monthly-comparison`, {
      headers: {
        ...getAuthHeaders(),
      },
    })
    return handleResponse(response)
  } catch (error) {
    console.error("Error fetching monthly comparison:", error)
    throw error
  }
}

// Fetch all transactions
export const fetchTransactions = async () => {
    console.log(getAuthHeaders())
  try {
    const response = await fetch(`${API_BASE_URL}/transactions`, {
      headers: {
        ...getAuthHeaders(),
      },
    })
    return handleResponse(response)
  } catch (error) {
    console.error("Error fetching transactions:", error)
    throw error
  }
}

// Create a new transaction
export const createTransaction = async (transactionData: any) => {
  try {
    const response = await fetch(`${API_BASE_URL}/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify(transactionData),
    })
    return handleResponse(response)
  } catch (error) {
    console.error("Error creating transaction:", error)
    throw error
  }
}

// Update an existing transaction
export const updateTransaction = async (id: string, transactionData: any) => {
  try {
    const response = await fetch(`${API_BASE_URL}/transactions/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify(transactionData),
    })
    return handleResponse(response)
  } catch (error) {
    console.error("Error updating transaction:", error)
    throw error
  }
}

// Delete a transaction
export const deleteTransaction = async (id: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/transactions/${id}`, {
      method: "DELETE",
      headers: {
        ...getAuthHeaders(),
      },
    })
    return handleResponse(response)
  } catch (error) {
    console.error("Error deleting transaction:", error)
    throw error
  }
}
