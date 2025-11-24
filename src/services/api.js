const BASE_URL = '/api' // rota da API

async function safeJson(res) {
    try { return await res.json() } catch { return null }
}


export async function listarCategorias(signal) {
    const res = await fetch(`${BASE_URL}/categoria`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        signal // opcional: para cancelamento
    })
    if (!res.ok) {
        const err = await safeJson(res)
        const msg = err?.error || err?.message || `HTTP ${res.status}`
        throw new Error(msg)
    }
    return res.json()
}

export async function criarProduto(dto) {
    const res = await fetch(`${BASE_URL}/produto`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(dto)
    })
    if (res.status === 201) return res.json()
    if (res.status === 400) {
        const err = await safeJson(res)
        throw new Error(err?.error || 'Dados inválidos')
    }
    throw new Error(`HTTP ${res.status}`)
}