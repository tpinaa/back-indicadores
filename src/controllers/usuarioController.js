import express from "express"
import { 
  criarUsuario,
  autenticarUsuario,
  buscarUsuarios,
  buscarUsuarioPorId,
  deletarUsuarioPorId,
  atualizarUsuarioPorId } from "../services/usuarioService.js"
import { autenticacao } from "../middleware.js"
const router = express.Router()

router.get('/', autenticacao, async (req, res, next) => {
  try {
    const listaUsuarios = await buscarUsuarios()
    res.json(listaUsuarios)
  } catch(err) {
    next(err)
  }
})

router.get('/:id', autenticacao, async (req, res, next) => {
  const id = req.params.id
  try {
    const usuario = await buscarUsuarioPorId(id)
    res.json(usuario)
  } catch(err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { nome, senha, perfil } = req.body
    const usuario = await criarUsuario(nome, senha, perfil)
    res.json(usuario)
  } catch (err) {
    next(err)
  }
})

router.post('/autenticacao', async (req, res, next) => {
  try {
    const { nome, senha } = req.body
    const token = await autenticarUsuario(nome, senha)
    res.json(token)
  } catch(err) {
    next(err)
  }
})

router.delete('/:id', autenticacao, async (req, res, next) => {
  const id = req.params.id
  try {
    const usuario = await deletarUsuarioPorId(id)
    res.json(usuario)
  } catch(err) {
    next(err)
  }
})

router.put('/:id', autenticacao, async (req, res, next) => {
  const id = req.params.id
  const { nome, senha, perfil } = req.body
  try {
    const usuarioAtualizado = await atualizarUsuarioPorId(id, { nome, senha, perfil })
    res.json(usuarioAtualizado)
  } catch(err) {
    next(err)
  }
})

export default router