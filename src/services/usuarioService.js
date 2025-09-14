import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { Usuario } from '../model.js';

export async function criarUsuario(nome, senha, perfil) {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(senha, salt);

  const usuario = await Usuario.create({ nome, senha: hash, perfil });
  return usuario;
}

export async function autenticarUsuario(nome, senha) {
  const usuario = await Usuario.findOne({ nome });

  if (!await bcrypt.compare(senha, usuario.senha)) {
    throw new Error('Credenciais inválidas');
  }

  const token = jwt.sign({ id: usuario.id }, 'chave_secreta', { expiresIn: '20s' });
  return { token };
}

export async function buscarUsuarios() {
  const listaUsuarios = await Usuario.find();
  return listaUsuarios;
}

export async function buscarUsuarioPorId(idUsuario) {
  //validacao de perfil
  const usuario = await Usuario.findById(idUsuario);
  //tratamento de erro
  return usuario;
}

export async function deletarUsuarioPorId(idUsuario) {
  const usuario = await Usuario.findByIdAndDelete(idUsuario);
  return usuario;
}

export async function atualizarUsuarioPorId(idUsuario, dadosAtualizados) {
  const usuarioAtualizado = await Usuario.findByIdAndUpdate(idUsuario, dadosAtualizados, {
    new: true,
  });
  return usuarioAtualizado;
}