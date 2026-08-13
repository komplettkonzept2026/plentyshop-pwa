import { mount } from '@vue/test-utils';
import { UiBadges } from '#components';
import type { Product } from '@plentymarkets/shop-api';

const mountBadges = (product: Partial<Product>) =>
  mount(UiBadges, {
    props: {
      product: product as Product,
    },
    global: {
      mocks: {
        t: (key: string) => key,
      },
    },
  });

describe('<Badges />', () => {
  it('should render component', () => {
    const wrapper = mountBadges({
      tags: [{ id: 1, names: { name: 'Tag', lang: 'en' } }],
    });

    expect(wrapper.getByTestId('badges'));
  });

  it('should render the new product badge for recently created products', () => {
    const wrapper = mountBadges({
      variation: {
        createdAt: new Date().toISOString(),
      } as Product['variation'] & { createdAt: string },
    });

    expect(wrapper.getByTestId('new-product-badge').text()).toBe('product.newBadge');
  });

  it('should not render the new product badge for older products', () => {
    const wrapper = mountBadges({
      variation: {
        createdAt: '2020-01-01 00:00:00',
      } as Product['variation'] & { createdAt: string },
    });

    expect(wrapper.find('[data-testid="new-product-badge"]').exists()).toBe(false);
    expect(wrapper.find('[data-testid="badges"]').exists()).toBe(false);
  });
});
