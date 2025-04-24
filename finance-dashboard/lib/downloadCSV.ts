import { getAuthToken } from "./auth" // ou de onde vem seu token

export const downloadCSV = async () => {
  try {
    const token = getAuthToken()
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions/export`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error("Falha ao exportar CSV")
    }

    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "transactions.csv"
    document.body.appendChild(a)
    a.click()
    a.remove()
    window.URL.revokeObjectURL(url)
  } catch (err) {
    console.error("Erro ao baixar CSV:", err)
  }
}
