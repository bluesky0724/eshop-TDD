import React from "react"
import { render, screen } from "@testing-library/react"
import ProductItem from "../../components/ProductItem"
import { Product } from "../../utils/Type"

test("Product Item test", () => {
  const product: Product = {
    id: "1",
    title: "Orange",
    image: "https://html.design/demo/floram/images/p1.png",
    description:
      "Fresh, juicy oranges now available at our shop - perfect for a healthy snack or addition to your daily diet.",
    price: 10,
  }

  render(<ProductItem product={product} onAddToCart={() => {}} />)
  const linkElements = screen.queryAllByText(/Orange/i)
  const priceElements = screen.queryAllByText(/10/i)
  const descriptionElements = screen.queryAllByText(/Fresh, juicy/i)
  
  expect(linkElements.length).toBeGreaterThan(0)
  expect(priceElements.length).toBeGreaterThan(0)
  expect(descriptionElements.length).toBeGreaterThan(0)
})
