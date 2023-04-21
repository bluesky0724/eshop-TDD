import React, { useEffect, useState } from "react"
import logo from "./logo.svg"
import "./App.css"
import Header from "./components/Header"
import ProductListPage from "./pages/ProductList.page"
import { CartItem, Product } from "./utils/Type"
import { getCartItems } from "./api/cart.api"

function App() {
  // ** TODO: Move cart items to global state using Redux or RTK
  const [cartItems, setCartItems] = useState<Array<CartItem>>([])
  const [products, setProducts] = useState<Array<Product>>([])

  useEffect(() => {
    ;(async () => {
      const data = await getCartItems()
      setCartItems(data)
    })()
  }, [])

  return (
    <div className='App sm:max-w-[500px] md:max-w-[1000px] xl:max-w-[1200px]'>
      <Header
        cartItems={cartItems}
        setCartItems={setCartItems}
        products={products}
        setProducts={setProducts}
      />
      <ProductListPage
        cartItems={cartItems}
        setCartItems={setCartItems}
        products={products}
        setProducts={setProducts}
      />
    </div>
  )
}

export default App
