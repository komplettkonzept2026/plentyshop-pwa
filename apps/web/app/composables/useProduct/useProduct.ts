import type { Block, Product, ProductParams } from '@plentymarkets/shop-api';
import { productGetters } from '@plentymarkets/shop-api';
import { toRefs } from '@vueuse/shared';
import type { UseProductReturn, UseProductState, FetchProduct } from '~/composables/useProduct/types';

import { generateBreadcrumbs } from '~/utils/productHelper';
import productTemplateData from '~/composables/useCategoryTemplate/productTemplateData.json';

const useProductTemplateData = () => productTemplateData as Block[];

/**
 * @description Composable managing product data
 * @param slug Product slug
 * @returns UseProductReturn
 * @example
 * ``` ts
 * const { data, loading, fetchProduct } = useProduct('product-slug');
 * ```
 */
export const useProduct: UseProductReturn = (slug) => {
  const properties = useProductOrderProperties();
  const state = useState<UseProductState>(`useProduct-${slug}`, () => ({
    data: {} as Product,
    fakeData: {} as Product,
    loading: false,
    breadcrumbs: [],
  }));

  const isGlobalProductDetailsTemplate = computed(() => {
    const route = useRoute();
    const slugParam = `${route.params.slug}_${route.params.itemId}`;
    const parts = Array.isArray(slugParam) ? slugParam : slugParam ? [slugParam] : [];
    return parts.join('/') === paths.globalItemDetails;
  });

  /** Function for fetching product data.
   * @param params { ProductParams }
   * @return FetchProduct
   * @example
   * ``` ts
   * fetchProduct({
   *   id: 1,
   *   variationId: 1
   * });
   * ```
   */

  const fetchProduct: FetchProduct = async (params: ProductParams) => {
    const route = useRoute();
    const { $i18n, $isPreview } = useNuxtApp();
    const {
      data: blockData,
      setupBlocks,
      getBlocksServer,
    } = useCategoryTemplate(
      route?.meta?.identifier as string,
      route.meta.type as string,
      useNuxtApp().$i18n.locale.value,
    );

    state.value.loading = true;

    if (isGlobalProductDetailsTemplate.value && $isPreview) {
      const fakeProduct = $i18n.locale.value === 'en' ? fakeProductEN : fakeProductDE;

      await getBlocksServer(route.meta.identifier as string, route.meta.type as string);
      const blocks = blockData.value ?? useProductTemplateData();

      state.value.data = {
        blocks: blocks,
        ...fakeProduct,
      };

      setupBlocks(blocks);

      handlePreviewProduct(state, $i18n.locale.value, false);

      state.value.loading = false;
      return state.value.data;
    }

    const { data, error } = await useAsyncData(
      `fetchProduct-${params.id}-${params.variationId}-${$i18n.locale.value}`,
      () => useSdk().plentysystems.getProduct(params),
    );

    const requestError = error.value;
    const errorWithStatus = requestError as { statusCode?: number; data?: { statusCode?: number } } | undefined;
    const statusCode = Number(errorWithStatus?.statusCode ?? errorWithStatus?.data?.statusCode ?? 0);

    if (requestError && statusCode !== 404) {
      useHandleError(requestError);
    }

    const fetchedBlocks = data.value?.data.blocks;
    setupBlocks(fetchedBlocks && fetchedBlocks.length > 0 ? fetchedBlocks : useProductTemplateData());

    properties.setProperties(data.value?.data.properties ?? []);
    state.value.data = data.value?.data ?? ({} as Product);
    handlePreviewProduct(state, $i18n.locale.value, true);
    state.value.loading = false;
    return state.value.data;
  };

  /**
   * @description Function for setting breadcrumbs
   * @example setBreadcrumbs()
   */
  const setBreadcrumbs = () => {
    const { data: categoryTree } = useCategoryTree();

    state.value.breadcrumbs = generateBreadcrumbs(categoryTree.value, state.value.data, t('common.labels.home'));
  };

  /**
   * @description Function for setting product title, description, keywords, and Open Graph meta.
   * Overrides site-wide homepage OG tags from app.vue on product pages.
   */
  const setProductMeta = () => {
    const { titleSuffix } = useAppConfig();
    const runtimeConfig = useRuntimeConfig();
    const localePath = useLocalePath();
    const route = useRoute();
    const { addModernImageExtension } = useModernImage();

    const product = state.value.data;
    const domain = String(runtimeConfig.public.domain || 'https://www.komplett-konzept.de').replace(/\/$/, '');

    const stripHtml = (value: string | undefined | null): string => {
      if (!value) return '';
      return value
        .replace(/<[^>]*>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    };

    const toAbsoluteUrl = (url: string): string => {
      if (!url) return '';
      if (/^https?:\/\//i.test(url)) return url;
      if (url.startsWith('//')) return `https:${url}`;
      return `${domain}${url.startsWith('/') ? '' : '/'}${url}`;
    };

    const productName = productGetters.getName(product) || '';
    const seoTitle = productGetters.getTitle(product)?.trim();
    const pageTitle = seoTitle || (productName ? `${productName} | ${titleSuffix}` : titleSuffix);
    const ogTitle = seoTitle || productName || pageTitle;

    const description =
      stripHtml(productGetters.getMetaDescription(product)) ||
      stripHtml(product.texts?.description) ||
      productName;

    const ogImage = toAbsoluteUrl(addModernImageExtension(productGetters.getCoverImage(product)));
    const ogUrl = toAbsoluteUrl(localePath(route.path));

    useHead({
      title: pageTitle,
      titleTemplate: '',
      meta: [
        {
          name: 'description',
          content: description || process.env.METADESC,
        },
        {
          name: 'keywords',
          content: productGetters.getMetaKeywords(product) || process.env.METAKEYWORDS,
        },
        { property: 'og:type', content: 'product' },
      ],
    });

    useSeoMeta({
      ogTitle,
      ogDescription: description,
      ogImage,
      ogUrl,
      twitterCard: 'summary_large_image',
      twitterTitle: ogTitle,
      twitterDescription: description,
      twitterImage: ogImage,
    });
  };
  const { disableActions } = useEditor();
  const { $isPreview } = useNuxtApp();

  const productForEditor = computed(() =>
    $isPreview && disableActions.value ? state.value.fakeData : state.value.data,
  );

  return {
    setProductMeta,
    setBreadcrumbs,
    fetchProduct,
    ...toRefs(state.value),
    properties,
    productForEditor,
  };
};
