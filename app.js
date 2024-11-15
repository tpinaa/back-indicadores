import express from "express"
import usuarioRouter from "./controllers/usuarioController.js"
import indicadorRouter from "./controllers/indicadorController.js"
import publicacaoRouter from "./controllers/publicacaoController.js"
import { tratamentoErros } from "./middleware.js"

const app = express()

app.use('/', express.json())
app.use('/usuario', usuarioRouter)
app.use('/indicador', indicadorRouter)
app.use('/publicacao', publicacaoRouter)
app.use('/', tratamentoErros)

export default app