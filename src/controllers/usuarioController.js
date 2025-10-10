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

//GET todos os usuários (autenticado)
router.get('/', autenticacao, async (req, res, next) => {
  try {
    const listaUsuarios = await buscarUsuarios()
    res.status(200).json(listaUsuarios)
  } catch(err) {
    next(err)
  }
})

//GET usuário por ID (autenticado)
router.get('/:id', autenticacao, async (req, res, next) => {
  const id = req.params.id
  try {
    const usuario = await buscarUsuarioPorId(id)
    
    if (!usuario) {
      const notFoundError = new Error(`Usuário com ID ${id} não encontrado.`);
      notFoundError.status = 404;
      return next(notFoundError);
    }
    
    res.status(200).json(usuario)
  } catch(err) {
    next(err)
  }
})

//POST criar novo usuário (público)
router.post('/', async (req, res, next) => {
  try {
    const { nome, senha, perfil } = req.body
    const usuario = await criarUsuario(nome, senha, perfil)
    res.status(201).json(usuario)
  } catch (err) {
    next(err)
  }
})

//POST autenticação (login)
router.post('/autenticacao', async (req, res, next) => {
  try {
    const { nome, senha } = req.body
    const token = await autenticarUsuario(nome, senha)
    res.status(200).json(token)
  } catch(err) {
    next(err)
  }
})

//DELETE usuário por ID (autenticado)
router.delete('/:id', autenticacao, async (req, res, next) => {
  const id = req.params.id
  try {
    const usuario = await deletarUsuarioPorId(id)

    if (!usuario) {
      const notFoundError = new Error(`Usuário com ID ${id} não encontrado para exclusão.`);
      notFoundError.status = 404;
      return next(notFoundError);
    }

    res.status(204).end()
  } catch(err) {
    next(err)
  }
})

//PUT atualizar usuário por ID (autenticado)
router.put('/:id', autenticacao, async (req, res, next) => {
  const id = req.params.id
  const { nome, senha, perfil } = req.body
  try {
    const usuarioAtualizado = await atualizarUsuarioPorId(id, { nome, senha, perfil })
    
    if (!usuarioAtualizado) {
      const notFoundError = new Error(`Usuário com ID ${id} não encontrado para atualizacão.`);
      notFoundError.status = 404;
      return next(notFoundError);
    }

    res.status(200).json(usuarioAtualizado)
  } catch(err) {
    next(err)
  }
})

export default router