import App from '@/App.vue';
import router from '@/router';
import { mount } from '@vue/test-utils';
import type { RouteLocationNormalized } from 'vue-router';

describe('router', () => {
  let wrapper = mount(App, {
    global: {
      plugins: [router],
    },
  });

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(console, 'log').mockImplementation(() => {});

    wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });
  });

  test('renders HomePage when visiting /', async () => {
    await router.replace('/');
    await router.isReady();

    expect(wrapper.html()).toContain('Bienvenido a nuestro sitio web');
  });

  test('renders Features when visiting /features', async () => {
    await router.replace('/features');
    await router.isReady();

    expect(wrapper.html()).toContain('Features');

    await router.replace('/');
    await router.push({ name: 'features' });
    expect(wrapper.html()).toContain('Features');
  });

  test('renders Pricing when visiting /pricing', async () => {
    await router.replace('/pricing');
    await router.isReady();

    expect(wrapper.html()).toContain('Pricing');
  });

  test('renders LoginPage when when visiting /pokemon/:id with no authentication', async () => {
    localStorage.clear();
    await router.replace('/pokemon/1');
    await router.isReady();

    expect(wrapper.html()).toContain('Login');
  });

  test('renders PokemonPage when visiting /pokemon/:id with authentication', async () => {
    localStorage.setItem('userId', '123456789');

    const pokemonId = 151;
    await router.replace('/pokemon/' + pokemonId);
    await router.isReady();

    expect(wrapper.html()).toContain('#' + pokemonId);
  });

  test('should convert the segment into number', async () => {
    const pokemonId = 151;
    const route: RouteLocationNormalized = {
      name: undefined,
      params: {
        id: pokemonId.toString(),
      },
      matched: [],
      fullPath: '',
      query: {},
      hash: '',
      redirectedFrom: undefined,
      meta: {},
      path: '/pokemon/' + pokemonId,
    };
    const pokemonRoute = router.getRoutes().find((route) => route.name === 'pokemon');
    expect(pokemonRoute).toBeTruthy();

    const props = (pokemonRoute?.props.default as (route: Object) => { id: number })(route);

    expect(typeof props.id).toBe('number');
    expect(props.id).toBe(pokemonId);
  });

  test('should return default value id if argument is not a number', async () => {
    const route: RouteLocationNormalized = {
      name: undefined,
      params: {
        id: 'not-a-number',
      },
      matched: [],
      fullPath: '',
      query: {},
      hash: '',
      redirectedFrom: undefined,
      meta: {},
      path: '/pokemon/not-a-number',
    };
    const pokemonRoute = router.getRoutes().find((route) => route.name === 'pokemon');
    const props = (pokemonRoute?.props.default as (route: Object) => { id: number })(route);

    expect(typeof props.id).toBe('number');
    expect(props.id).toBe(1);
  });
});
