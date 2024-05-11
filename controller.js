import express from "express"
import { criarUsuario } from "./userService.js"
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
  router.post('/', async (req, res) => {
    const {nome, senha, perfil} = req.body
    const usuario = await criarUsuario(nome,senha, perfil)
    res.json(usuario)
  })
  
  router.delete('/', (req, res) => {
      res.send('Deletado')
  })
  
  router.put('/', (req, res) => {
      res.send('Atualizado')
  })

  export default router