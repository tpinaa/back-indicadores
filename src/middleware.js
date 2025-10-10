import mongoose from "mongoose"
import jwt from 'jsonwebtoken'

//Middleware de erro centralizado do Express: captura qualquer exceção lançada pelas rotas ou outros middlewares, formata e envia uma resposta padronizada.

//Loga o erro no console do servidor para debugging, inicializa as variáveis de resposta. Status HTTP 500 (padrão).
export const tratamentoErros = (err, req, res, next) => {
    console.error('--- Erro capturado ---');
    console.error(err);
    console.error('----------------------');

    let statusCode = 500;
    let mensagemErro = 'Um erro inesperado ocorreu no servidor.';
    let detalhesErro = {};

    //Captura erros quando os dados de entrada falham na validação do Schema Mongoose. Status HTTP 400 (bad request).
    if (err instanceof mongoose.Error.ValidationError) {
        statusCode = 400;
        mensagemErro = 'Falha na validação dos dados.';

        detalhesErro = Object.entries(err.errors).reduce((acc, [key, error]) => {
            acc[key] = error.message;
            return acc;
        }, {});
    }

    //Captura erros quando o valor do campo não pode ser convertido para o tipo esperado. Status HTTP 400 (bad request).
    else if (err instanceof mongoose.Error.CastError) {
        statusCode = 400;
        mensagemErro = `Formato inválido para o campo ${err.path}`;
        detalhesErro = {
            tipo: err.kind,
            valor: err.value
        };
    }

    //Captura erros de chave duplicada do MongoDB. Extrai o nome do campo duplicado da mensagem de erro. Status HTTP 409 (conflict).
    else if (err.code === 11000) {
        statusCode = 409;
        mensagemErro = 'Dado duplicado. Esse item já existe.';

        const fieldMatch = err.message.match(/index: (.+)_1/);
        if (fieldMatch && fieldMatch[1]) {
            mensagemErro += ` (Campo: ${fieldMatch[1]})`;
        };
    }

    //Captura erros customizados lançados por outros middlewares (como autenticação).
    else if (err.status) {
        statusCode = err.status;
        mensagemErro = err.message;
    }

    //Fallback para qualquer outro erro que contenha uma mensagem. Status HTTP 500 (internal server error).
    else if (err.message) {
        mensagemErro = err.message;
    }

    //Envia resposta final para o cliente com a categoria do Status HTTP e formata o corpo da resposta em JSON com mensagem e dealhes do erro.
    res.status(statusCode).json({
        status: 'error',
        statusCode: statusCode,
        message: mensagemErro,
        details: Object.keys(detalhesErro).length > 0 ? detalhesErro : undefined,
    });
};

//Middleware de requisição que verifica a validade de um JSON Web Token (JWT).

//Extrai o cabeçalho Authorization da requisição e se não houver authHeader, lança o erro 401 e interrompe.
export const autenticacao = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if(!authHeader) {
        const erroAuth = new Error('Token de autenticação não providenciado.');
        erroAuth.status = 401;
        return next(erroAuth);
    }

    //Divide o authHeader para isolar o esquema e o token. Checa se o esquema é Bearer e se o token foi totalmente extraído. Se o formato for inválido, lança erro 401 e interrompe.
    const [scheme, token] = authHeader.split(' ');

    if (scheme !== 'Bearer' || !token) {
        const erroFormato = new Error('Formato de token inválido (esperado: Bearer <token>).');
        erroFormato.status = 401;
        return next(erroFormato);
    }

    //Tenta validar e decodificar o token usando a chave secreta para decodificar o payload. O userId é anexado ao objeto req e next() é chamado, permitindo que a requisição siga. Captura exceções lançando o erro 401 e interrompe.
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET || "chave_secreta");
        req.userId = payload.id;
        next();
    } catch (error) {
        const erroJWT = new Error('Token inválido ou expirado');
        erroJWT.status = 401;
        return next(erroJWT);
    };
}