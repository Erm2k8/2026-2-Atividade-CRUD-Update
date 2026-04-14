import type { Product } from "../../types/product"
import ProductCard from "./ProductCard"

type Props = { products: Product[] }

export default function ProductList({ products }: Props) {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </section>
  )
}
