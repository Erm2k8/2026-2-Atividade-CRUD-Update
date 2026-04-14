export async function apiFetch<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const res = await fetch(input, init)
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`HTTP ${res.status} - ${text}`)
  }
  return (await res.json()) as T
}
