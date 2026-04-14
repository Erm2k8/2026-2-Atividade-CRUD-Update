import { fetchProducts } from "../../lib/products"
import ProductListClient from "../../components/product/ProductListClient"

export const revalidate = 0

export default async function ProdutosPage() {
  const data = await fetchProducts(30, 0)

  return (
    <div className="p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Produtos</h1>
        <p className="text-sm text-zinc-600">Lista de produtos (consumido de dummyjson)</p>
      </header>
      <ProductListClient initialProducts={data.products} />
    </div>
  )
}
