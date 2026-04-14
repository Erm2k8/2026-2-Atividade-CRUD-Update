import type { Product } from "../../types/product"
import Link from "next/link"

type Props = { product: Product }

export default function ProductCard({ product }: Props) {
  return (
    <article className="flex flex-col gap-3 rounded-lg border p-4 shadow-sm">
      <div className="h-40 w-full overflow-hidden rounded-md bg-zinc-100">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col">
        <h3 className="text-lg font-medium">{product.title}</h3>
        <p className="text-sm text-zinc-600 line-clamp-2">{product.description}</p>
        <div className="mt-2 flex items-center justify-between">
          <div className="text-sm text-zinc-800">R$ {product.price}</div>
          <Link
            href={`/produtos/${product.id}`}
            className="rounded bg-foreground px-3 py-1 text-background"
          >
            Editar
          </Link>
        </div>
      </div>
    </article>
  )
}
