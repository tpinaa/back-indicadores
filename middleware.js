import mongoose from "mongoose"

export async function tratamentoErros(err, req, res, next) {
    if (err instanceof mongoose.Error) {
        const listaErros = Object.values(err.errors)
            .map(erro => erro.message)
            .join('; ')
        res.json({ erro: listaErros })
    } else {
        res.json({ erro: err.message })
    }
}

export async function autenticacao(req, res, next) {
    let autenticado = false
    if (autenticado) {
        console.log('Autenticado')
        next()
    } else {
        console.log('Falha na Autenticação')
        next(new Error('Não Autorizado'))
    }
}