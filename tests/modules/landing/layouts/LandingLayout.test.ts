import { shallowMount } from '@vue/test-utils';
import LandingLayout from '@/modules/landing/layouts/LandingLayout.vue';
import router from '@/router';

describe('<LandingLayout />', () => {
  test('should be render correctly', () => {
    const wrapper = shallowMount(LandingLayout, {
      global: {
        plugins: [router],
      },
    });
    expect(wrapper.find('header').exists()).toBeTruthy();
    expect(wrapper.find('main').exists()).toBeTruthy();
    expect(wrapper.find('footer').exists()).toBeTruthy();
    expect(wrapper.find('footer').html()).toContain(
      ` © ${new Date().getFullYear()} Acme Corporation. Derechos reservados`,
    );

    const routerView = wrapper.findComponent({ name: 'RouterView' });
    expect(routerView.exists()).toBeTruthy();
  });
});
