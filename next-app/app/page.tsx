import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50">
      <main className="space-y-6 text-center">
        <h1 className="text-3xl font-semibold">Produtos</h1>
        <Link href="/produtos" className="rounded bg-foreground px-4 py-2 text-background">
          Ver lista de produtos
        </Link>
      </main>
    </div>
  )
}
