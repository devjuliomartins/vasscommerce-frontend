import { useState } from 'react'
import { criarProduto } from '@/services/api'

export default function FormNovoProduto({ onCriado }) {
  const [nome, setNome] = useState('')
  const [valor, setValor] = useState('')
  const [categoriaId, setCategoriaId] = useState('')
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState(null)

  async function onSubmit(e) {
    e.preventDefault()
    setErro(null)

    try {
      setLoading(true)
      await criarProduto({
        nome,
        valor: Number(valor),
        categoriaId: Number(categoriaId)
      })

      setNome('')
      setValor('')
      setCategoriaId('')
      onCriado && onCriado()

    } catch (ex) {
      setErro(ex.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} style={{ display:'grid', gap:8, maxWidth:260 }}>
      <input placeholder="Nome" value={nome}
        onChange={e => setNome(e.target.value)} />

      <input placeholder="Valor" type="number" value={valor}
        onChange={e => setValor(e.target.value)} />

      <input placeholder="Categoria ID" type="number" value={categoriaId}
        onChange={e => setCategoriaId(e.target.value)} />

      <button disabled={loading} type="submit">
        {loading ? "Criando..." : "Criar"}
      </button>

      {erro && <p style={{ color:'crimson' }}>{erro}</p>}
    </form>
  )
}
