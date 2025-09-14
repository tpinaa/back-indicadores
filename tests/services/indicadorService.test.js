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
    nome: '',
    valor: null,
    sigla: '',
    descricao: '',
    parametros: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const criarData = (overrides = {}) => ({
    ...baseData,
    ...overrides,
  });

  it('O valor e parâmetro de um indicador sem fórmula devem vir 0 e []', async () => {
    const data = criarData({
      nome: 'Indicador IND',
      sigla: 'IND',
      descricao: 'PARAM1 / PARAM2',
    });

    const mockIndicadorCriado = {
      id: '123',
      nome: data.nome,
      sigla: data.sigla,
      valor: 0,
      descricao: data.descricao,
      parametros: [],
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

  it('O valor e parâmetro de um indicador com fórmula devem ser calculados corretamente', async () => {
    const data = criarData({
      nome: 'Indicador IGPUB',
      sigla: 'IGPUB',
      descricao: 'TNSE / NGPB',
    });

    const tnse = { id: 'p1', sigla: 'TNSE', valor: 2 };
    const ngpb = { id: 'p2', sigla: 'NGPB', valor: 10 };

    // Ordem importa!
    buscarParametroPorSigla
      .mockResolvedValueOnce(tnse)
      .mockResolvedValueOnce(ngpb);

    const mockIndicadorCriado = {
      id: '123',
      nome: data.nome,
      sigla: data.sigla,
      valor: 5,
      descricao: data.descricao,
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
      valor: 5,
      descricao: data.descricao,
      parametros: [ngpb, tnse],
    });

    expect(indicador).toEqual(mockIndicadorCriado);
  });

  it('deve lançar um erro ao tentar criar indicador com um dos parâmetros ausentes', async () => {
    const data = criarData({
      nome: 'Indicador IGPUB',
      sigla: 'IGPUB',
      descricao: 'TNSE / NGPB',
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
      'Parâmetros para cálculo do indicador não foram cadastrados ainda'
    );

    expect(Indicador.create).not.toHaveBeenCalled();
  });
});
