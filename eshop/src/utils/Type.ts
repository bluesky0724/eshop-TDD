export type Product = {
  id: string
  image: string
  title: string
  description: string
  price: number
}

export type CartItem = {
  product: Product
  count: number
}
