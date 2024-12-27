import isAuthenticatedGuard from '@/modules/auth/guards/is-authenticated.guard';
import type { RouteLocationNormalized, RouteLocationNormalizedGeneric } from 'vue-router';

describe('isAuthenticatedGuard', () => {
  const to: RouteLocationNormalized = {
    name: undefined,
    params: {},
    matched: [],
    fullPath: '',
    query: {},
    hash: '',
    redirectedFrom: undefined,
    path: '/home-screen',
    meta: {},
  };

  const from: RouteLocationNormalized = {} as RouteLocationNormalized;

  const nextFn = vi.fn();

  beforeEach(() => {
    localStorage.clear();
    vi.resetAllMocks();
  });

  test('should block if not authenticated', async () => {
    await isAuthenticatedGuard(to, from, nextFn);

    expect(nextFn).toHaveBeenCalledWith({ name: 'login' });
  });

  test('should call localStorage.setItem with lastPath', async () => {
    await isAuthenticatedGuard(to, from, nextFn);

    const lastPath = localStorage.getItem('lastPath');

    expect(lastPath).toBe(to.path);
  });

  test('should block if authenticated with spies', async () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

    await isAuthenticatedGuard(to, from, nextFn);

    expect(setItemSpy).toHaveBeenCalledWith('lastPath', to.path);
  });

  test('should pass if authenticated', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('abc-123');

    await isAuthenticatedGuard(to, from, nextFn);

    expect(nextFn).toHaveBeenCalledWith();
  });
});
