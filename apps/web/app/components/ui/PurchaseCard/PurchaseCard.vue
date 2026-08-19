<!-- eslint-disable no-console -->
<template>
  <form
    class="md:rounded-md"
    :class="{ 'md:shadow-lg': configuration?.dropShadow, 'md:border md:border-neutral-100': configuration?.borders }"
    :style="inlineStyle"
    data-testid="purchase-card"
    @submit.prevent="handleAddToCart()"
  >
    <div class="relative">
      <div class="drift-zoom-image">
        <section class="p-4 xl:p-6">
          <template v-for="key in configuration?.fieldsOrder" :key="key">
            <template v-if="key === 'itemName' && configuration?.fields.itemName">
              <h1 class="font-bold typography-headline-4 break-word" data-testid="product-name">
                {{ productGetters.getName(product) }}
              </h1>
            </template>
            <template v-if="key === 'price' && configuration?.fields.price">
              <div class="flex space-x-2">
                <Price :price="displayPriceWithProperties" :crossed-price="displayCrossedPrice" />
                <div
                  v-if="(productBundleGetters?.getBundleDiscount(product) ?? 0) > 0 && showBundleComponents"
                  class="m-auto"
                >
                  <UiTag :size="'sm'" :variant="'secondary'">{{
                    t('product.bundleSavings', { percent: productBundleGetters.getBundleDiscount(product) })
                  }}</UiTag>
                </div>
              </div>
              <p
                v-if="showSecondaryNetPrice"
                class="typography-text-sm text-neutral-600 -mt-1"
                data-testid="product-net-price"
              >
                <span class="font-medium">{{ formattedSecondaryNetPrice }}</span>
                <span class="ml-1 text-neutral-500">({{ t('common.labels.netPrice') }})</span>
              </p>
              <LowestPrice :product="product" />
              <BasePrice
                v-if="productGetters.showPricePerUnit(product)"
                :base-price="basePriceSingleValue"
                :unit-content="productGetters.getUnitContent(product)"
                :unit-name="productGetters.getUnitName(product)"
              />
              <div class="mt-6 pt-4 border-t border-neutral-200 text-sm">
                <div class="flex justify-between items-center py-1">
                  <span class="text-neutral-500 font-medium">Artikelnummer</span>
                  <span class="text-neutral-900 font-bold">{{ productGetters.getItemId(product) }}</span>
                </div>

                <div class="flex justify-between items-center py-1">
                  <span class="text-neutral-500 font-medium">Varianten ID</span>
                  <span class="text-neutral-900 font-bold">{{ productGetters.getId(product) }}</span>
                </div>

                <div class="flex justify-between items-center py-1">
                  <span class="text-neutral-500 font-medium">Zustand</span>
                  <span class="text-neutral-900 font-bold">
  {{
    (product as any)?.item?.conditionApi?.names?.name
    ?? (product as any)?.item?.condition?.names?.name
    ?? 'Neu'
  }}
</span>
                </div>

                <div class="flex justify-between items-center py-1">
                  <span class="text-neutral-500 font-medium">Inhalt</span>
                  <span class="text-neutral-900 font-bold">{{ productGetters.getUnitContent(product) }}</span>
                </div>

                <div class="flex justify-between items-center py-1">
                  <span class="text-neutral-500 font-medium">Hersteller </span>
                  <span class="text-neutral-900 font-bold">{{ manufacturerName || '—' }}</span>
                </div>

                <div class="flex justify-between items-center py-1">
  <span class="text-neutral-500 font-medium">Verfügbare Menge</span>

  <span
    v-if="(product as any)?.variation?.availability?.names?.name"
    class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
           bg-green-100 text-green-700"
  >
    {{ (product as any).variation.availability.names.name }}
  </span>

  <span
    v-else
    class="text-neutral-400 font-medium"
  >
    —
  </span>
</div>

                <div class="flex justify-between items-center py-1">
  <span class="text-neutral-500 font-medium">Lagerbestand</span>
  <span
    v-if="(product as any)?.stock?.net !== undefined && (product as any)?.stock?.net !== null"
    class="text-neutral-900 font-bold"
  >
    {{ (product as any).stock.net }}
  </span>
  <span
    v-else
    class="text-neutral-400 font-medium"
  >
    —
  </span>
</div>

              </div>
            </template>
            <template v-if="key === 'tags' && configuration?.fields.tags">
              <UiBadges class="mb-2" :product="product" :use-availability="false" :use-tags="true" />
            </template>
            <!-- <template v-if="key === 'availability' && configuration?.fields.availability">
              <UiBadges class="mb-2" :product="product" :use-availability="true" :use-tags="false" />
            </template> -->
            <template v-if="key === 'variationProperties' && configuration?.fields.variationProperties">
              <div class="mb-2 variation-properties">
                <VariationProperties :product="product" />
              </div>
            </template>
            <!-- <template v-if="key === 'starRating' && configuration?.fields.starRating">
              <div class="inline-flex items-center mb-2">
                <SfRating
                  size="xs"
                  :half-increment="true"
                  :value="reviewGetters.getAverageRating(reviewAverage, 'half')"
                  :max="5"
                />
                <SfCounter class="ml-1" size="xs">{{ reviewGetters.getTotalReviews(reviewAverage) }}</SfCounter>
                <UiButton
                  variant="tertiary"
                  class="ml-2 text-xs text-neutral-500 cursor-pointer"
                  data-testid="show-reviews"
                  @click="scrollToReviews"
                >
                  {{ t('product.showAllReviews') }}
                </UiButton>
              </div>
            </template> -->
            <template v-if="key === 'previewText' && configuration?.fields.previewText">
              <div
                v-if="productGetters.getShortDescription(product).length > 0"
                class="mb-2 font-normal typography-text-sm whitespace-pre-line break-words"
                data-testid="product-description"
                v-html="productGetters.getShortDescription(product)"
              />
            </template>

            <template v-if="key === 'addToWishlist' && configuration?.fields.addToWishlist">
              <div
                class="flex items-center mt-2"
                :class="{ 'justify-center': configuration?.wishlistSize === 'large' }"
              >
                <WishlistButton
                  :variant="configuration?.wishlistSize === 'small' ? 'tertiary' : 'secondary'"
                  :product="product"
                  :quantity="quantitySelectorValue"
                  :square="viewport.isLessThan('lg')"
                  class="!m-0 !mb-2"
                  :class="{
                    'mr-2 mb-2 bg-white': viewport.isLessThan('lg'),
                    'w-full': configuration?.wishlistSize === 'large',
                    '!p-0 hover:bg-transparent active:bg-transparent': configuration?.wishlistSize === 'small',
                  }"
                >
                  <div>
                    {{
                      !isWishlistItem(productGetters.getVariationId(product))
                        ? t('common.actions.addToWishlist')
                        : t('common.actions.removeFromWishlist')
                    }}
                  </div>
                </WishlistButton>
              </div>
            </template>

            <template v-if="key === 'attributes' && configuration?.fields.attributes">
              <ProductAttributes :product="product" />
            </template>

            <template v-if="key === 'itemBundle'">
              <BundleOrderItems v-if="product.bundleComponents && showBundleComponents" :product="product" />
            </template>
            <template v-if="key === 'orderProperties' && configuration?.fields.orderProperties">
              <OrderProperties :product="product" />
            </template>
            <template v-if="key === 'graduatedPrices' && configuration?.fields.graduatedPrices">
              <GraduatedPriceList :product="product" :count="quantitySelectorValue" />
            </template>

            <template v-if="key === 'quantityAndAddToCart' && configuration?.fields.quantityAndAddToCart">
              <UnitContentSelect
                v-if="product && productGetters.possibleUnitCombination(product).length > 1"
                :product="product"
              />
              <div class="mt-4">
                <div class="flex flex-col md:flex-row flex-wrap gap-4">
                  <UiQuantitySelector
                    :min-value="productGetters.getMinimumOrderQuantity(product)"
                    :value="quantitySelectorValue"
                    class="min-w-[145px] flex-grow-0 flex-shrink-0 basis-0"
                    @change-quantity="changeQuantity"
                  />
                  <SfTooltip
                    show-arrow
                    placement="top"
                    :label="isNotValidVariation || isSalableText"
                    class="flex-grow-[2] flex-shrink basis-auto whitespace-nowrap"
                  >
                    <UiButton
                      type="submit"
                      data-testid="add-to-cart"
                      size="lg"
                      class="w-full h-full"
                      :disabled="loading || !productGetters.isSalable(product)"
                    >
                      <template #prefix>
                        <div v-if="!loading" class="flex row items-center">
                          <SfIconShoppingCart size="sm" />
                          {{ t('common.actions.addToCart') }}
                        </div>
                        <div v-else>
                          <SfLoaderCircular size="sm" />
                        </div>
                      </template>
                    </UiButton>
                  </SfTooltip>
                </div>

                <div class="mt-4 typography-text-xs flex gap-1">
                  <span>{{ t('common.labels.asterisk') }}</span>
                  <span>{{ vatFootnoteLabel }}</span>
                  <i18n-t keypath="shipping.excludedLabel" scope="global">
                    <template #shipping>
                      <SfLink
                        :href="localePath(paths.shipping)"
                        target="_blank"
                        class="focus:outline focus:outline-offset-2 focus:outline-2 outline-secondary-600 rounded"
                      >
                        {{ t('common.labels.delivery') }}
                      </SfLink>
                    </template>
                  </i18n-t>
                </div>
                <template v-if="showPayPalButtons">
                  <button
                    v-if="!hasRequestedPayPal"
                    type="button"
                    class="mt-4 inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-3 rounded font-bold text-sm transition-colors hover:opacity-90"
                    style="background: #0070ba; color: #ffffff;"
                    data-testid="paypal-load"
                    @click="requestPayPal"
                  >
                    <span class="sr-only">{{ t('product.paypal.loadOptions') }}</span>
                    <span class="inline-flex items-center justify-center gap-2">
                      <span
                        aria-hidden="true"
                        class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/95 text-[#003087] font-black leading-none"
                      >
                        P
                      </span>
                      <span>PayPal</span>
                    </span>
                  </button>
                  <template v-else>
                    <PayPalExpressButton
                      type="SingleItem"
                      location="itemPage"
                      class="mt-4"
                      @validation-callback="paypalHandleAddToCart"
                    />
                    <PayPalPayLaterBanner
                      placement="product"
                      location="itemPage"
                      :amount="displayPriceWithProperties * quantitySelectorValue"
                    />
                  </template>
                </template>
              </div>

              <div class="mt-6 mb-4 flex justify-center w-full min-w-0">
                <UiOptimizedStaticImage
                  base-src="/_nuxt-plenty/images/wider_version_opt"
                  fallback-ext="jpg"
                  alt="Komplett Konzept"
                  img-class="max-w-full w-auto h-auto object-contain rounded shadow-sm"
                  :width="400"
                  :height="251"
                  loading="lazy"
                />
              </div>
              
              <!-- Internationale Anfrage CTA -->
              <div class="mt-4 flex items-center justify-between flex-wrap gap-3 min-w-0">
                <p class="text-sm m-0 flex-1 min-w-0 text-red-600 font-semibold break-words">
                  Sie kommen aus dem Ausland und möchten trotzdem leasen oder finanzieren?
                </p>
                <NuxtLink
                  to="/leasing-finanzierung"
                  class="inline-flex items-center gap-2 px-5 py-3 rounded font-bold text-sm whitespace-nowrap transition-colors hover:opacity-90 no-underline shrink-0"
                  style="background: #F5C00A; color: #152440;"
                >
                  Europaweit anfragen
                  <span>→</span>
                </NuxtLink>
              </div>

              <!-- Leasingo: load third-party calculator only after explicit user action -->
              <div v-if="isLeasingEligible" class="mt-4 min-w-0">
                <button
                  v-if="!isWidgetReady"
                  type="button"
                  class="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-3 rounded font-bold text-sm transition-colors hover:opacity-90"
                  style="background: #152440; color: #ffffff;"
                  data-testid="leasingo-load"
                  :disabled="isLeasingoLoading"
                  @click="requestLeasingo"
                >
                  {{ isLeasingoLoading ? t('product.leasingo.loading') : t('product.leasingo.loadCalculator') }}
                </button>
                <div
                  v-else
                  :key="productGetters.getId(product)"
                  class="leasingo-calculator min-w-0 max-w-full overflow-x-auto"
                  :data-object-price-netto="leasingNetPrice"
                  data-maturity="48"
                  data-finance-product="1"
                  data-object-condition="1"
                  :data-category="widgetMainCategory"
                  :data-subcategory="widgetSubCategory"
                />
              </div>
            </template>

            <template v-if="key === 'itemText' && configuration?.fields.itemText">
              <div
                v-if="productGetters.getDescription(product)"
                class="mb-4 font-normal typography-text-sm whitespace-pre-line break-words no-preflight"
                data-testid="product-description"
                v-html="productGetters.getDescription(product)"
              />
            </template>
            <template v-if="key === 'technicalData' && configuration?.fields.technicalData">
              <div
                v-if="productGetters.getTechnicalData(product)"
                class="mb-4 font-normal typography-text-sm whitespace-pre-line break-words no-preflight"
                data-testid="product-description"
                v-html="productGetters.getTechnicalData(product)"
              />
            </template>
          </template>
        </section>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
// import { productGetters, reviewGetters, productBundleGetters } from '@plentymarkets/shop-api';
import { productGetters, productBundleGetters } from '@plentymarkets/shop-api';

// import { SfCounter, SfRating, SfIconShoppingCart, SfLoaderCircular, SfTooltip, SfLink } from '@storefront-ui/vue';
import { SfIconShoppingCart, SfLoaderCircular, SfTooltip, SfLink } from '@storefront-ui/vue';

import type { PriceCardPadding, PurchaseCardProps } from '~/components/ui/PurchaseCard/types';
import type { PayPalAddToCartCallback } from '~/components/PayPal/types';
import { paths } from '~/utils/paths';
import {
  getProductUnitPriceGross,
  getProductUnitPriceNet,
  shouldShowProductNetPrice,
} from '~/utils/product/getProductNetPrice';
import {
  getLeasingoCategoryDataAttrs,
  installLeasingoLocaleInterceptor,
} from '~/utils/leasingo/locale';
import { nextTick } from 'vue';

const props = withDefaults(defineProps<PurchaseCardProps>(), {
  configuration: () => ({
    fields: {
      itemName: true,
      price: true,
      tags: true,
      availability: true,
      starRating: true,
      orderProperties: true,
      variationProperties: true,
      previewText: true,
      attributes: true,
      itemBundle: false,
      graduatedPrices: true,
      addToWishlist: true,
      quantityAndAddToCart: true,
      itemText: false,
      technicalData: false,
    },
    fieldsOrder: [
      'itemName',
      'price',
      'tags',
      'availability',
      'starRating',
      'variationProperties',
      'orderProperties',
      'previewText',
      'attributes',
      'itemBundle',
      'graduatedPrices',
      'addToWishlist',
      'quantityAndAddToCart',
      'itemText',
      'technicalData',
    ],
    fieldsDisabled: ['quantityAndAddToCart', 'price', 'itemBundle', 'attributes'],
    wishlistSize: 'small',

    dropShadow: true,
    borders: true,
    borderColor: '#EFF4F1',
    layout: {
      paddingTop: 0,
      paddingBottom: 0,
      paddingRight: 0,
      paddingLeft: 0,
      fullWidth: false,
    },
  }),
});

// const { currentProduct } = useProducts();

// const { data: productReviews } = useProductReviews(Number(productGetters.getItemId(currentProduct.value)));
// const reviewAverage = computed(() => reviewGetters.getReviewCounts(productReviews.value));

const { getSetting } = useSiteSettings('dontSplitItemBundle');
const showBundleComponents = computed(() => {
  return getSetting() !== '1';
});

const { showNetPrices } = useCart();
const viewport = useViewport();
const { getCombination } = useProductAttributes();
const { getPropertiesForCart, getPropertiesPrice } = useProductOrderProperties();
const { format } = usePriceFormatter();
const { validateAllFields, invalidFields, resetInvalidFields } = useValidatorAggregator('properties');
const {
  validateAllFields: validateAllFieldsAttributes,
  invalidFields: invalidAttributeFields,
  resetInvalidFields: resetAttributeFields,
} = useValidatorAggregator('attributes');
const { clear, send } = useNotification();
const { addToCart, loading } = useCart();
const quantitySelectorValue = ref(productGetters.getMinimumOrderQuantity(props?.product));
const { isWishlistItem } = useWishlist();
const { openQuickCheckout } = useQuickCheckout();
const { crossedPrice } = useProductPrice(props?.product);
// const { reviewArea } = useProductReviews(Number(productGetters.getId(props?.product)));
const localePath = useLocalePath();
const { locale, t } = useI18n();

const inlineStyle = computed(() => {
  const layout = props?.configuration?.layout || ({} as PriceCardPadding);

  return {
    paddingTop: layout.paddingTop ? `${layout.paddingTop}px` : 0,
    paddingBottom: layout.paddingBottom ? `${layout.paddingBottom}px` : 0,
    paddingLeft: layout.paddingLeft ? `${layout.paddingLeft}px` : 0,
    paddingRight: layout.paddingRight ? `${layout.paddingRight}px` : 0,
    borderColor: props?.configuration?.borderColor || 'transparent',
  };
});

onMounted(() => {
  resetInvalidFields();
  resetAttributeFields();
});

onBeforeRouteLeave(() => {
  if (invalidFields.value.length > 0 || invalidAttributeFields.value.length > 0) clear();
  resetInvalidFields();
  resetAttributeFields();
});

const priceWithProperties = computed(
  () =>
    (productGetters.getSpecialOffer(props?.product) ||
      productGetters.getGraduatedPriceByQuantity(props?.product, quantitySelectorValue.value)?.unitPrice.value ||
      productGetters.getPrice(props?.product) ||
      0) + getPropertiesPrice(props?.product),
);

const netPriceWithProperties = computed(() => {
  const unitPriceNet = getProductUnitPriceNet(props.product, quantitySelectorValue.value);
  if (unitPriceNet === null) {
    return null;
  }

  return unitPriceNet + getPropertiesPrice(props.product);
});

const showSecondaryNetPrice = computed(
  () => shouldShowProductNetPrice(props.product, quantitySelectorValue.value) && netPriceWithProperties.value !== null,
);

const formattedSecondaryNetPrice = computed(() => {
  const netPrice = netPriceWithProperties.value;
  return netPrice === null ? '' : format(netPrice);
});

const vatFootnoteLabel = computed(() => {
  if (showSecondaryNetPrice.value) {
    return t('product.priceInclVAT');
  }

  return showNetPrices.value ? t('product.priceExclVAT') : t('product.priceInclVAT');
});

const displayPriceWithProperties = computed(() => {
  if (!showSecondaryNetPrice.value) {
    return priceWithProperties.value;
  }

  const unitPriceGross = getProductUnitPriceGross(props.product, quantitySelectorValue.value);
  if (unitPriceGross === null) {
    return priceWithProperties.value;
  }

  return unitPriceGross + getPropertiesPrice(props.product);
});

const displayCrossedPrice = computed(() => {
  if (!showSecondaryNetPrice.value) {
    return crossedPrice.value;
  }

  const rrpGross = props.product.prices?.rrp?.data?.unitPrice;
  if (typeof rrpGross === 'number' && Number.isFinite(rrpGross)) {
    return rrpGross;
  }

  return crossedPrice.value;
});

const basePriceSingleValue = computed(
  () =>
    productGetters.getGraduatedPriceByQuantity(props?.product, quantitySelectorValue.value)?.basePrice ??
    productGetters.getDefaultBasePrice(props?.product),
);

const handleValidationErrors = (): boolean => {
  send({
    message: [
      t('error.missingOrWrongProperties'),
      '',
      ...invalidAttributeFields.value.map((field) => field.name),
      ...invalidFields.value.map((field) => field.name),
      '',
      t('error.pleaseFillOutAllFields'),
    ],
    type: 'negative',
  });

  return false;
};

const handleAddToCart = async (quickCheckout = true) => {
  await validateAllFieldsAttributes();
  await validateAllFields();

  if (invalidFields.value.length > 0 || invalidAttributeFields.value.length > 0) {
    return handleValidationErrors();
  }

  if (!getCombination()) {
    send({ message: t('product.attributes.notValidVariation'), type: 'negative' });
    return false;
  }

  const addedToCart = await addToCart({
    productId: Number(productGetters.getId(props?.product)),
    quantity: Number(quantitySelectorValue.value),
    basketItemOrderParams: getPropertiesForCart(),
  });

  if (addedToCart) {
    quickCheckout
      ? openQuickCheckout(props?.product, quantitySelectorValue.value)
      : send({ message: t('cart.itemAdded'), type: 'positive' });

    if (getSetting() === '0') {
      send({ message: t('error.notificationsItemBundleSplitted'), type: 'warning' });
    }
  }

  return addedToCart;
};

const paypalHandleAddToCart = async (callback: PayPalAddToCartCallback) => {
  const added = await handleAddToCart(false);

  callback(added);
};

const changeQuantity = (quantity: string) => {
  quantitySelectorValue.value = Number(quantity);
};

// const isReviewsAccordionOpen = () => {
//   const customerReviewsAccordionDetailsElement = document.querySelector('#customerReviewsAccordion')
//     ?.firstChild as HTMLDetailsElement;

//   return customerReviewsAccordionDetailsElement.open;
// };

// const openReviewsAccordion = () => {
//   const customerReviewsClickElement = document.querySelector('#customerReviewsClick') as HTMLElement;
//   customerReviewsClickElement?.click();
// };

const isSalableText = computed(() => (productGetters.isSalable(props?.product) ? '' : t('product.notAvailable')));
const isNotValidVariation = computed(() => (getCombination() ? '' : t('product.attributes.notValidVariation')));
const showPayPalButtons = computed(() => Boolean(getCombination()) && productGetters.isSalable(props?.product));
/**
 * Avoid initial-load PayPal/Google Pay SDK cost on PDPs; render payment widgets only after explicit intent.
 */
const hasRequestedPayPal = ref(false);
const manufacturerName = computed(() => {
  const manufacturer = productGetters.getManufacturer(props.product);
  return manufacturer?.name || '';
});

const requestPayPal = () => {
  hasRequestedPayPal.value = true;
};

// const scrollToReviews = () => {
//   if (!isReviewsAccordionOpen()) {
//     openReviewsAccordion();
//   }

//   if (reviewArea.value) {
//     reviewArea.value.scrollIntoView({ behavior: 'smooth' });
//   }
// };

// --- LEASINGO INTEGRATION START ---
interface LeasingoWindow extends Window {
  lgoCalculatorCallbacks?: Array<() => void>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  purchaseCardCalculator?: any;
}

const LEASINGO_CALCULATOR_SRC = 'https://komplett-konzept.leasingo.cloud/integration/calculator';
const LEASINGO_MIN_NET_PRICE = 2500;

const widgetMainCategory = ref('');
const widgetSubCategory = ref('');
const isWidgetReady = ref(false);
const isLeasingoLoading = ref(false);
/** User opted in — keep calculator across product/locale updates until they leave eligibility. */
const hasRequestedLeasingo = ref(false);

const leasingNetPrice = computed(() => {
  const apiNetPrice = netPriceWithProperties.value;
  if (apiNetPrice !== null) {
    return apiNetPrice.toFixed(2);
  }

  const grossPrice = priceWithProperties.value;
  const vatRate = props.product?.prices?.default?.vat?.value || 19;
  return (grossPrice / (1 + vatRate / 100)).toFixed(2);
});

const isLeasingEligible = computed(() => Number(leasingNetPrice.value) > LEASINGO_MIN_NET_PRICE);

const unloadLeasingoScripts = () => {
  if (typeof window === 'undefined') return;
  document.querySelectorAll('script[src*="leasingo"]').forEach((el) => el.remove());
  const win = window as LeasingoWindow;
  delete win.purchaseCardCalculator;
  delete win.lgoCalculatorCallbacks;
};

const mountLeasingoCalculator = async () => {
  if (typeof window === 'undefined' || !isLeasingEligible.value) return;

  isWidgetReady.value = false;
  unloadLeasingoScripts();
  isLeasingoLoading.value = true;

  await nextTick();

  installLeasingoLocaleInterceptor(locale.value);
  const { category, subcategory } = getLeasingoCategoryDataAttrs(locale.value);
  widgetMainCategory.value = category;
  widgetSubCategory.value = subcategory;

  isWidgetReady.value = true;

  await nextTick();
  const script = document.createElement('script');
  script.src = LEASINGO_CALCULATOR_SRC;
  script.async = true;
  script.onload = () => {
    isLeasingoLoading.value = false;
  };
  script.onerror = () => {
    isLeasingoLoading.value = false;
    isWidgetReady.value = false;
  };
  document.body.appendChild(script);
};

const requestLeasingo = () => {
  hasRequestedLeasingo.value = true;
  void mountLeasingoCalculator();
};

watch(
  () => [productGetters.getId(props.product), leasingNetPrice.value, locale.value] as const,
  () => {
    if (typeof window === 'undefined') return;

    isWidgetReady.value = false;
    unloadLeasingoScripts();

    if (!isLeasingEligible.value) {
      hasRequestedLeasingo.value = false;
      isLeasingoLoading.value = false;
      return;
    }

    // Never auto-load on first paint — only remount after an explicit user request.
    if (hasRequestedLeasingo.value) {
      void mountLeasingoCalculator();
    }
  },
  { immediate: true },
);
// --- LEASINGO INTEGRATION END ---
// --- DEBUGGING STOCK ---
watch(
  () => props.product,
  (p) => {
    // eslint-disable-next-line no-console
    // console.log('🔍 STOCK CHECK 🔍');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rawStock = (p as any)?.stock;
    // eslint-disable-next-line no-console
    console.log('Raw Stock Object:', rawStock);

    if (!rawStock) {
      // eslint-disable-next-line no-console
      console.warn('⚠️ API is NOT sending stock data. Backend setting is OFF.');
    } else if (rawStock.net === undefined) {
      // eslint-disable-next-line no-console
      console.warn('⚠️ API sent stock object, but "net" is missing/hidden.');
    } else {
      // eslint-disable-next-line no-console
      console.log('✅ SUCCESS! Net Stock is:', rawStock.net);
    }
  },
  { immediate: true, deep: true },
);
</script>
