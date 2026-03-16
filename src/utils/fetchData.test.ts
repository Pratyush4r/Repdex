import { fetchData } from './fetchData';

describe('fetchData', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = jest.fn() as unknown as typeof fetch;
  });

  afterEach(() => {
    global.fetch = originalFetch;
    jest.restoreAllMocks();
  });

  it('returns parsed JSON for successful responses', async () => {
    const payload = { ok: true, items: [1, 2, 3] };
    const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue(payload),
    } as unknown as Response);

    const result = await fetchData('https://example.com/success', {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'test-key',
      },
    });

    expect(fetchMock).toHaveBeenCalledWith('https://example.com/success', {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'test-key',
      },
    });
    expect(result).toEqual(payload);
  });

  it('throws enriched error for non-2xx responses', async () => {
    const payload = { message: 'not found' };
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      status: 404,
      json: jest.fn().mockResolvedValue(payload),
    } as unknown as Response);

    await expect(
      fetchData('https://example.com/failure', {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'test-key',
        },
      }),
    ).rejects.toMatchObject({
      message: 'Request failed with status 404',
      status: 404,
      data: payload,
    });
  });
});
