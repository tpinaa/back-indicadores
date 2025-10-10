import { criarIndicador } from '../../src/services/indicadorService.js';
import { buscarParametroPorSigla } from '../../src/services/parametroService.js';
import { Indicador } from '../../src/model.js';

jest.mock('../../src/model.js', () => ({
  Indicador: {
    create: jest.fn(),
  },
}));

jest.mock('../../src/services/parametroService.js', () => ({
  buscarParametroPorSigla: jest.fn(),
}));

describe('criarIndicador', () => {
  const baseData = {
    nome: 'Indicador de Teste',
    sigla: 'TESTE',
    descricao: 'Valor 1 / Valor 2',
  };

  //Função helper para criar dados de teste.
  const criarData = (overrides = {}) => ({
    ...baseData,
    valor: overrides.valor || null,
    parametros: overrides.parametros || null,
    ...overrides,
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  //Teste 1: Indicador sem cálculo (Valor 0 e Parâmetros [])
  it('deve retornar valor 0 e parâmetros vazios para um indicador sem fórmula', async () => {
    const data = criarData({ descricao: '' });

    const mockIndicadorCriado = {
      id: '123',
      valor: 0,
      parametros: [],
      ...data
    };

    Indicador.create.mockResolvedValueOnce(mockIndicadorCriado);

    const indicador = await criarIndicador(
      data.nome,
      data.sigla,
      data.valor,
      data.descricao,
      data.parametros
    );

    expect(Indicador.create).toHaveBeenCalledWith({
      nome: data.nome,
      sigla: data.sigla,
      valor: 0,
      descricao: data.descricao,
      parametros: [],
    });

    expect(indicador).toEqual(mockIndicadorCriado);
  });

  //Teste 2: Indicador com cálculo correto.
  it('deve calcular o valor e coletar parâmetros corretamente para um indicador com fórmula', async () => {
    const data = criarData({
      nome: 'Indicador IGPUB',
      sigla: 'IGPUB',
      descricao: 'TNSE / NGPB',
    });

    const tnse = { id: 'p1', sigla: 'TNSE', valor: 2 };
    const ngpb = { id: 'p2', sigla: 'NGPB', valor: 10 };
    const resultadoCalculado = tnse.valor / ngpb.valor;

    buscarParametroPorSigla
      .mockResolvedValueOnce(tnse)
      .mockResolvedValueOnce(ngpb);

    const mockIndicadorCriado = {
      id: '123',
      ...data,
      valor: resultadoCalculado,
      parametros: [ngpb, tnse],
    };

    Indicador.create.mockResolvedValueOnce(mockIndicadorCriado);

    const indicador = await criarIndicador(
      data.nome,
      data.sigla,
      data.valor,
      data.descricao,
      data.parametros
    );

    expect(buscarParametroPorSigla).toHaveBeenCalledTimes(2);
    expect(buscarParametroPorSigla).toHaveBeenCalledWith('TNSE');
    expect(buscarParametroPorSigla).toHaveBeenCalledWith('NGPB');

    expect(Indicador.create).toHaveBeenCalledWith({
      nome: data.nome,
      sigla: data.sigla,
      valor: resultadoCalculado,
      descricao: data.descricao,
      parametros: [tnse, ngpb],
    });

    expect(indicador).toEqual(mockIndicadorCriado);
  });

  //Tsete 3: Lançamento de Erro.
  it('deve lançar um erro se um dos parâmetros da fórmula estiver ausente', async () => {
    const data = criarData({
      nome: 'Indicador IGPUB',
      sigla: 'IGPUB',
      descricao: 'PARAM_AUSENTE / OUTRO',
    });

    buscarParametroPorSigla.mockResolvedValue(null);

    const promise = criarIndicador(
      data.nome,
      data.sigla,
      data.valor,
      data.descricao,
      data.parametros
    );

    await expect(promise).rejects.toThrow(
      'Parâmetros para cálculo do indicador ainda não foram cadastrados.'
    );

    expect(Indicador.create).not.toHaveBeenCalled();
  });
});
