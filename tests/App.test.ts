import { shallowMount } from '@vue/test-utils';
import App from '@/App.vue';
import router from '@/router';

describe('<App />', () => {
  test('should be render correctly', () => {
    // shallowMount permite montar el componente de manera superficial,
    // es decir, solo renderiza el componente y no sus componentes hijos,
    // lo que mejora el rendimiento de las pruebas al evitar renderizar
    // toda la estructura interna del componente.

    const wrapper = shallowMount(App, {
      global: {
        plugins: [router],
      },
    });

    const routerView = wrapper.findComponent({ name: 'RouterView' });
    expect(routerView.exists()).toBeTruthy();
  });
});
