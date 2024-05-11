import { User } from "./model.js";

export async function criarUsuario(nome, senha, perfil){
    const usuario = await User.create({nome, senha, perfil})
    return usuario
}