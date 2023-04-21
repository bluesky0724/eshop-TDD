import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { addToCart } from "../api/cart.api"
import { getProducts } from "../api/product.api"
import ProductItem from "../components/ProductItem"
import { CartItem, Product } from "../utils/Type"

type PropType = {
  cartItems: Array<CartItem>
  setCartItems: Dispatch<SetStateAction<Array<CartItem>>>
  products: Array<Product>
  setProducts: Dispatch<SetStateAction<Array<Product>>>
}

const ProductListPage = (props: PropType) => {
  const { cartItems, setCartItems, products, setProducts } = props

  useEffect(() => {
    ;(async () => {
      try {
        const data = await getProducts("")
        setProducts(data)
      } catch (err) {
        alert(err)
      }
    })()
  }, [])

  const handleAddToCart = (product: Product) => {
    const newCartItems = [...cartItems]
    let flag = false
    newCartItems.map((item) => {
      if (item.product.id === product.id) {
        item.count++
        flag = true
      }
      return item
    })

    addToCart(product.id).then((data) => setCartItems(data))

    if (!flag) newCartItems.push({ product, count: 1 })

    setCartItems(newCartItems)
  }

  return (
    <div className='flex flex-wrap justify-center'>
      {products.length > 0 ? (
        products.map((product, index) => (
          <ProductItem product={product} key={index} onAddToCart={() => handleAddToCart(product)} />
        ))
      ) : (
        <div className='text-xl text-gray-400 font-bold mt-4'>No products found!</div>
      )}
    </div>
  )
}

export default ProductListPage
