import React, { useEffect, useMemo, useState } from "react"
import { ShoppingCart } from "react-feather"
import { CartItem } from "../utils/Type"

type Props = {
  cartItems: CartItem[]
  onCheckout: () => void
}

const ShoppingCartDropdown: React.FC<Props> = ({ cartItems, onCheckout }) => {
  const [isOpen, setIsOpen] = useState(false)

  // Calculate the total price and total count of all items in the cart
  const [totalPrice, totalCount] = useMemo(() => {
    const totalPrice = cartItems.reduce((acc, item) => acc + item.product.price * item.count, 0)
    const totalCount = cartItems.reduce((acc, item) => acc + item.count, 0)
    return [totalPrice, totalCount]
  }, [cartItems])

  // Add Window event handler for clicking outside of dropdown component
  const handleWindowClick = (e: MouseEvent) => {
    if (isOpen && e.target instanceof Element && !e.target.closest(".shopping-cart-dropdown")) {
      setIsOpen(false)
    }
  }
  window.addEventListener("click", handleWindowClick)

  return (
    <div className='relative shopping-cart-dropdown'>
      <button
        className='relative bg-gray-200 text-gray-800 p-3 rounded-full'
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className='flex flex-row'>
          <ShoppingCart size={20} />
        </div>

        <span className='absolute top-0 right-0 bg-red-500 text-white rounded-full px-1 text-xs'>
          {totalCount}
        </span>
      </button>
      {isOpen && (
        <div className='absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5'>
          <div className='p-4'>
            {cartItems.length === 0 ? (
              <p className='text-gray-500'>Your cart is empty.</p>
            ) : (
              cartItems.map((item) => (
                <div key={item.product.id} className='flex items-center gap-2 py-2'>
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className='w-10 h-10 object-cover rounded-md'
                  />
                  <div>
                    <p className='font-medium'>{item.product.title}</p>
                    <p className='text-gray-500'>
                      {item.product.price} x {item.count} = ${item.product.price * item.count}
                    </p>
                  </div>
                </div>
              ))
            )}
            {cartItems.length > 0 && (
              <div className='mt-4'>
                <p className='text-lg font-medium'>Total: ${totalPrice.toFixed(2)}</p>
              </div>
            )}
            <div className='flex justify-center pt-2'>
              <button
                onClick={() => {
                  setIsOpen(false)
                  onCheckout()
                }}
                className='px-4 py-2 text-sm font-medium text-white bg-secondary rounded-full hover:bg-gray-500'
              >
                Checkout
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className='px-4 py-2 text-sm font-medium text-white bg-primary rounded-full ml-2 hover:bg-gray-500'
              >
                Keep Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShoppingCartDropdown
