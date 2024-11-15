import { Publicacao } from "../model.js";

export async function criarPublicacao(
    titulo,
    projeto,
    situacao,
    dataRegistro,
    dataPublicacao,
    autor,
    tipo,
    classificacao) {
    const publicacao = await Publicacao.create({
        titulo,
        projeto,
        situacao,
        dataRegistro,
        dataPublicacao,
        autor,
        tipo,
        classificacao
    })
    return publicacao
}