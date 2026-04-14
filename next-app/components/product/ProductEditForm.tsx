"use client"
import React, { useState } from "react"
import type { Product } from "../../types/product"
import { useRouter } from "next/navigation"

type FormState = {
  title: string
  description: string
  price: number
}

type Props = { product: Product }

export default function ProductEditForm({ product }: Props) {
  const router = useRouter()
  const [form, setForm] = useState<FormState>({
    title: product.title,
    description: product.description,
    price: product.price,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setForm((s) => ({ ...s, [name]: name === "price" ? Number(value) : value }))
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`https://dummyjson.com/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error(await res.text())
      const updated: Product = await res.json()

      try {
        const raw = localStorage.getItem("product_overrides")
        const overrides = raw ? JSON.parse(raw) : {}
        overrides[updated.id] = updated
        localStorage.setItem("product_overrides", JSON.stringify(overrides))
      } catch (e) {
        // Ignora erro de LocalStorage
      }

      setSuccess(true)
      setTimeout(() => router.push("/produtos"), 700)
    } catch (err: any) {
      setError(err?.message ?? "Erro ao atualizar")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-xl space-y-4">
      <div>
        <label className="block text-sm font-medium">Título</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="mt-1 w-full rounded border px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Descrição</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          className="mt-1 w-full rounded border px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Preço</label>
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          className="mt-1 w-40 rounded border px-3 py-2"
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded bg-foreground px-4 py-2 text-background disabled:opacity-60"
        >
          {loading ? "Salvando..." : "Salvar"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/produtos")}
          className="rounded border px-3 py-2"
        >
          Voltar
        </button>
        {success && <span className="text-sm text-green-600">Atualizado</span>}
        {error && <span className="text-sm text-red-600">{error}</span>}
      </div>
    </form>
  )
}
