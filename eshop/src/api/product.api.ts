import axios from "axios"

const baseUrl = process.env.REACT_APP_BASE_URL

export const getProducts = async (filterText: string) => {
  try {
    const response = await axios.get(`${baseUrl}/product/?filter=${filterText}`)
    return response.data
  } catch (err) {
    throw err
  }
}
