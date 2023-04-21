import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { CartItem, Product } from "../utils/Type"
import ShoppingCartDropdown from "./ShoppingCartDropDown"
import { Search } from "react-feather"
import { clearCart } from "../api/cart.api"
import { getProducts } from "../api/product.api"

type PropType = {
  cartItems: Array<CartItem>
  setCartItems: Dispatch<SetStateAction<CartItem[]>>
  products: Array<Product>
  setProducts: Dispatch<SetStateAction<Array<Product>>>
}

const Header = (props: PropType) => {
  // ** Prop Variable
  const { cartItems, setCartItems, products, setProducts } = props

  // ** State Variable
  const [searchText, setSearchText] = useState("")

  useEffect(() => {
    const timer = setTimeout(async () => {
      const data = await getProducts(searchText)
      setProducts(data)
    }, 500)
    ;(async () => {})()

    return () => clearTimeout(timer)
  }, [searchText])

  // ** Action Handlers
  const handleCheckout = () => {
    alert("checked out!")
    clearCart().then(() => props.setCartItems([]))
  }

  const handleSearchChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearchText(e.currentTarget.value)
  }

  return (
    <div className='flex flex-row justify-between items-center m-6'>
      <div className='flex flex-row items-center'>
        <div className='text-2xl font-bold'>E-Shop</div>
        <form className='flex items-center relative ml-2'>
          <input
            value={searchText}
            onChange={handleSearchChange}
            placeholder='Search product'
            className='px-4 py-2 pl-8 border border-gray-500 rounded-full w-full outline-gray-300'
          />
          <div className='absolute left-0 ml-3'>
            <Search size={14} />
          </div>
        </form>
      </div>
      <div>
        <ShoppingCartDropdown cartItems={props.cartItems} onCheckout={handleCheckout} />
      </div>
    </div>
  )
}

export default Header
