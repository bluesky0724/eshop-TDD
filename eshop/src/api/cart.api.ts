import axios from "axios"
import { CartItem } from "../utils/Type"

const baseUrl = process.env.REACT_APP_BASE_URL

export const getCartItems = async () => {
  try {
    const response = await axios.get(`${baseUrl}/cart`)

    return response.data
  } catch (err) {
    throw err
  }
}

export const addToCart = async (productId: string) => {
  try {
    const response = await axios.post(`${baseUrl}/cart`, { productId })
    return response.data
  } catch (err) {
    throw err
  }
}

export const clearCart = async () => {
  try {
    await axios.delete(`${baseUrl}/cart/all`)
  } catch (err) {
    throw err
  }
}
