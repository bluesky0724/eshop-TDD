import React from "react"
import { Product } from "../utils/Type"

type PropType = {
  product: Product
  onAddToCart: () => void
}

const ProductItem = (props: PropType) => {
  return (
    <div className='flex flex-col items-center bg-amber-50 w-80 p-4 m-4'>
      <div className='flex flex-col items-center mb-2 grow'>
        <img src={props.product.image} alt={props.product.title} className='w-48 my-1' />
        <div className='text-lg font-semibold my-1'>{props.product.title}</div>
        <div className='text-sm text-gray-500 my-1'>{props.product.description}</div>
        <div className='my-1'>$ {props.product.price}</div>
      </div>
      <div className='flex flex-row'>
        <button className='px-4 py-2 mx-2 bg-primary text-white font-semibold rounded-full'>
          Buy now
        </button>
        <button
          className='px-4 py-2 mx-2 bg-secondary text-white font-semibold rounded-full'
          onClick={props.onAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductItem
