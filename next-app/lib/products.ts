import { apiFetch } from "./api"
import type { Product, ProductsListResponse } from "../types/product"

const API_BASE = "https://dummyjson.com"

export async function fetchProducts(limit = 30, skip = 0): Promise<ProductsListResponse> {
  const url = `${API_BASE}/products?limit=${limit}&skip=${skip}`
  return apiFetch<ProductsListResponse>(url)
}

export async function fetchProductById(id: number): Promise<Product> {
  const url = `${API_BASE}/products/${id}`
  return apiFetch<Product>(url)
}

export async function updateProduct(id: number, data: Partial<Product>): Promise<Product> {
  const url = `${API_BASE}/products/${id}`
  return apiFetch<Product>(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
}
