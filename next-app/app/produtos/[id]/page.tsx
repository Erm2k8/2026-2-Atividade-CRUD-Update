import ProductEditForm from "../../../components/product/ProductEditForm"
import { fetchProductById } from "../../../lib/products"
import { notFound } from "next/navigation"

type Props = { params: any }

export const revalidate = 0

export default async function ProductEditPage({ params }: Props) {
  const { id: idParam } = await params
  const id = Number(idParam)
  if (Number.isNaN(id)) return notFound()

  let product
  try {
    product = await fetchProductById(id)
  } catch (err) {
    return notFound()
  }

  return (
    <div className="p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Editar produto</h1>
        <p className="text-sm text-zinc-600">Editar produto ID {product.id}</p>
      </header>
      <ProductEditForm product={product} />
    </div>
  )
}
