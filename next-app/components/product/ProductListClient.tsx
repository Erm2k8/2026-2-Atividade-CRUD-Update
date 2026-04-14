"use client"
import React, { useEffect, useState } from "react"
import type { Product } from "../../types/product"
import ProductList from "./ProductList"

type Props = { initialProducts: Product[] }

export default function ProductListClient({ initialProducts }: Props) {
  const [products, setProducts] = useState<Product[]>(initialProducts)

  useEffect(() => {
    try {
      const raw = localStorage.getItem("product_overrides")
      if (!raw) return
      const overrides: Record<number, Product> = JSON.parse(raw)
      const merged = initialProducts.map((p) =>
        overrides[p.id] ? { ...p, ...overrides[p.id] } : p
      )
      const extra = Object.values(overrides).filter(
        (o) => !initialProducts.some((p) => p.id === o.id)
      )
      setProducts([...merged, ...extra])
    } catch (e) {
      // Ignora erros
    }
  }, [initialProducts])

  return <ProductList products={products} />
}
