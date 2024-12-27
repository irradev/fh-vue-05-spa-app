import { mount, RouterLinkStub } from '@vue/test-utils';
import PokemonPage from '@/modules/pokemons/pages/PokemonPage.vue';

describe('<PokemonPage />', () => {
  const pokemonId = 25;

  const wrapper = mount(PokemonPage, {
    props: {
      id: pokemonId,
    },
    global: {
      stubs: {
        // RouterLink: true,
        RouterLink: RouterLinkStub,
      },
    },
  });

  test('should be render correctly', () => {
    const pokemonUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`;

    expect(wrapper.find('h1').exists()).toBeTruthy();
    expect(wrapper.find('img').exists()).toBeTruthy();
    expect(wrapper.find('img').attributes('src')).toBe(pokemonUrl);

    const routerLink = wrapper.findComponent(RouterLinkStub);
    expect(routerLink.exists()).toBeTruthy();
  });

  test('should redirect to the next and previous pokemon', () => {
    const routerLink = wrapper.findAllComponents(RouterLinkStub);

    wrapper.setProps({ id: 25 });
    expect(routerLink.length).toBe(2);

    expect(routerLink[0].props('to')).toEqual({ name: 'pokemon', params: { id: pokemonId - 1 } });
    expect(routerLink[1].props('to')).toEqual({ name: 'pokemon', params: { id: pokemonId + 1 } });
  });

  test('should disable previous link if id is 1', () => {
    const wrapper = mount(PokemonPage, {
      props: {
        id: 1,
      },
      global: {
        stubs: {
          // RouterLink: true,
          RouterLink: RouterLinkStub,
        },
      },
    });

    const routerLink = wrapper.findAllComponents(RouterLinkStub);
    const disabledButton = wrapper.find('button[disabled]');

    expect(disabledButton.exists()).toBeTruthy();
    expect(routerLink.length).toBe(1);
    expect(routerLink[0].props('to')).toEqual({ name: 'pokemon', params: { id: 2 } });
  });
});
