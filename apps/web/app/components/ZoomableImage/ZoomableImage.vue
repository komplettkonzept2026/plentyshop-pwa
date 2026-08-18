<template>
  <div
    ref="containerReference"
    class="w-full h-full relative flex items-center justify-center snap-center snap-always basis-full shrink-0 grow gallery-image"
  >
    <div
      v-if="showZoomHint && isMobile"
      class="zoom-hint absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white px-4 py-2 rounded z-20"
    >
      {{ t('product.doubleTapZoom') }}
    </div>

    <template v-if="!isMobile && imagesLoaded[`gallery-img-${index}`]">
      <template v-if="disableZoom">
        <picture>
          <source v-if="avifSrcset" type="image/avif" :srcset="avifSrcset" :sizes="sizesAttr" />
          <source v-if="webpSrcset" type="image/webp" :srcset="webpSrcset" :sizes="sizesAttr" />
          <img v-bind="imgProps" :data-testid="`product-image-${index}`" @load="onImageLoad" />
        </picture>
      </template>

      <Drift v-else :key="route.fullPath" :index="index">
        <picture>
          <source v-if="avifSrcset" type="image/avif" :srcset="avifSrcset" :sizes="sizesAttr" />
          <source v-if="webpSrcset" type="image/webp" :srcset="webpSrcset" :sizes="sizesAttr" />
          <img v-bind="imgProps" :data-testid="`product-image-${index}`" @load="onImageLoad" />
        </picture>
      </Drift>
    </template>

    <picture v-else>
      <source v-if="avifSrcset" type="image/avif" :srcset="avifSrcset" :sizes="sizesAttr" />
      <source v-if="webpSrcset" type="image/webp" :srcset="webpSrcset" :sizes="sizesAttr" />
      <img
        v-bind="imgProps"
        :data-testid="`product-image-${index}`"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
        @load="onImageLoad"
      />
    </picture>

    <SfLoaderCircular v-if="!imagesLoaded[`gallery-img-${index}`]" class="absolute" size="sm" />
  </div>
</template>

<script setup lang="ts">
import { productImageGetters } from '@plentymarkets/shop-api';
import { SfLoaderCircular } from '@storefront-ui/vue';
import type { ZoomableImageProps } from '~/components/ZoomableImage/types';

const props = defineProps<ZoomableImageProps>();

const containerReference = useTemplateRef<null>('containerReference');
const imagesLoaded = ref([] as unknown as { [key: string]: boolean });

const { isZoomed, imageStyle, onTouchStart, onTouchMove, onTouchEnd } = useImageZoom(containerReference);
const viewport = useViewport();
const route = useRoute();
const { t } = useI18n();
const { getModernImageSources } = useModernImage();

const image = props.image;
const index = props.index;
const activeIndex = props.activeIndex;
const isFirstImage = props.isFirstImage;
const isMobile = computed(() => viewport.isLessThan('lg'));

const showZoomHint = ref(false);
const sizesAttr = '(max-width: 320px) 370px, (max-width: 640px) 720px, (max-width: 768px) 740px, 1400px';

const imageAlt = productImageGetters.getImageAlternate(image) || productImageGetters.getCleanImageName(image) || '';
const imageTitle = productImageGetters.getImageName(image) || productImageGetters.getCleanImageName(image) || '';

const mapUrl = (url: string, pick: 'original' | 'avif' | 'webp') => {
  const sources = getModernImageSources(url);
  return sources[pick] || sources.original;
};

const buildSrcset = (pick: 'original' | 'avif' | 'webp') => {
  const dpr = 1;
  const secondPreview = mapUrl(productImageGetters.getImageUrlSecondPreview(image), pick);
  const preview = mapUrl(productImageGetters.getImageUrlPreview(image), pick);
  const middle = mapUrl(productImageGetters.getImageUrlMiddle(image), pick);
  const full = mapUrl(productImageGetters.getImageUrl(image), pick);

  return `
    ${secondPreview} ${370 * dpr}w,
    ${preview} ${700 * dpr}w,
    ${middle} ${720 * dpr}w,
    ${full} ${1400 * dpr}w
  `;
};

const fullSources = computed(() => getModernImageSources(productImageGetters.getImageUrl(image)));
const imageUrl = computed(() => fullSources.value.original || productImageGetters.getImageUrl(image));
const preferredZoomUrl = computed(
  () => fullSources.value.avif || fullSources.value.webp || fullSources.value.original,
);

const avifSrcset = computed(() => (fullSources.value.avif ? buildSrcset('avif') : ''));
const webpSrcset = computed(() => (fullSources.value.webp ? buildSrcset('webp') : ''));
const originalSrcset = computed(() => buildSrcset('original'));

const computedWidth = computed(() => {
  const imageWidth = productImageGetters.getImageWidth(image) || 600;
  return imageUrl.value.includes(defaults.IMAGE_LINK_SUFIX) ? imageWidth : '';
});

const computedHeight = computed(() => {
  const imageHeight = productImageGetters.getImageHeight(image) || 600;
  return imageUrl.value.includes(defaults.IMAGE_LINK_SUFIX) ? imageHeight : '';
});

const imgProps = computed<Record<string, unknown>>(() => ({
  id: `gallery-img-${index}`,
  alt: imageAlt,
  title: imageTitle,
  'aria-hidden': activeIndex !== index,
  class: isMobile.value
    ? { 'object-contain h-full w-full': true, zoomed: isZoomed.value }
    : { 'object-contain h-full w-full': true, [`demo-trigger-${index}`]: true },
  'data-zoom': preferredZoomUrl.value,
  src: imageUrl.value,
  srcset: originalSrcset.value,
  sizes: sizesAttr,
  draggable: 'false',
  loading: isFirstImage ? 'eager' : 'lazy',
  fetchpriority: isFirstImage ? 'high' : 'auto',
  width: computedWidth.value,
  height: computedHeight.value,
  style: isMobile.value ? imageStyle.value : '',
}));

const onImageLoad = () => {
  updateImageStatusFor(`gallery-img-${index}`);
};

const updateImageStatusFor = (imageId: string) => {
  if (!imagesLoaded.value[imageId]) imagesLoaded.value[imageId] = true;
};

onMounted(() => {
  nextTick(() => {
    for (const [imgIndex] of props.images.entries()) {
      const myImg: HTMLImageElement | null = document.querySelector(`#gallery-img-${imgIndex}`);
      const imgId = String(myImg?.id);
      if (!imagesLoaded.value[imgId]) imagesLoaded.value[imgId] = Boolean(myImg?.complete);
    }
  });

  if (isMobile.value) {
    showZoomHint.value = true;
    setTimeout(() => {
      showZoomHint.value = false;
    }, 3000);
  }
});
</script>
