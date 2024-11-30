import { Publicacao } from '../model.js';

export async function criarPublicacao(titulo, dataPublicacao, autor, tipo) {
  const publicacao = await Publicacao.create({
    titulo,
    dataPublicacao,
    autor,
    tipo,
  });
  return publicacao;
}

export async function buscarPublicacoes() {
  const lista = await Publicacao.find();
  return lista;
}

export async function buscarPublicacaoPorId(idPublicacao) {
    const publicacao = await Publicacao.findById(idPublicacao)
    return publicacao
}

export async function atualizarPublicacaoPorId(idPublicacao, dadosAtualizados) {
    const publicacaoAtualizada = await Publicacao.findByIdAndUpdate(
        idPublicacao,
        dadosAtualizados,
        { new: true }
    )
    return publicacaoAtualizada
}

export async function deletarPublicacaoPorId(idPublicacao) {
    const publicacao = await Publicacao.findByIdAndDelete(idPublicacao)
    return publicacao
}