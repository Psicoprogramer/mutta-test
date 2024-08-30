import { getDataApi } from './poke_api';

global.fetch = jest.fn();

describe('getDataApi', () => {

  beforeEach(() => {
    fetch.mockClear();
  });

  it('debería devolver datos correctamente cuando la respuesta es exitosa', async () => {
    const mockData = { name: 'Pikachu' };
    
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData
    });

    const result = await getDataApi('https://pokeapi.co/api/v2/pokemon/1');
    expect(result).toEqual(mockData);
  });

  it('debería lanzar un error cuando la respuesta no es exitosa', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found'
    });

    await expect(getDataApi('https://pokeapi.co/api/v2/pokemon/invalid'))
      .rejects
      .toThrow('Error 404: Not Found');
  });

  it('debería lanzar un error cuando la respuesta JSON no es válida', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => { throw new Error('Invalid JSON'); }
    });

    await expect(getDataApi('https://pokeapi.co/api/v2/pokemon/1'))
      .rejects
      .toThrow('Error al parsear la respuesta en formato JSON');
  });

  it('debería manejar errores de red correctamente', async () => {
    fetch.mockRejectedValueOnce(new Error('Network Error'));

    await expect(getDataApi('https://pokeapi.co/api/v2/pokemon/1'))
      .rejects
      .toThrow('Network Error');
  });
});
