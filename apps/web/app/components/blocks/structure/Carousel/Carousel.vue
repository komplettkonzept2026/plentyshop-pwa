<template>
  <NuxtErrorBoundary>
    <div class="kk-hero relative w-full group">

     <div class="absolute inset-0 z-[20] flex flex-col items-center justify-center pointer-events-none h-full w-full">
        <div 
          class="pointer-events-auto bg-[#eadd87] bg-opacity-90 p-4 md:p-6 rounded shadow-lg max-w-[95%] md:max-w-[600px] text-center border-2 border-white relative"
          :style="{ backgroundColor: overlayConfig.bgColor }"
        >
          
          <div class="flex flex-row md:flex-row items-center justify-center mb-2 md:mb-3">
            <div class="bg-black text-white font-bold px-2 py-0.5 md:px-3 md:py-1 rounded-full mr-2 md:mr-3 text-sm md:text-lg flex-shrink-0">
              {{ overlayConfig.badgeText }}
            </div>
            <span class="text-black font-medium text-sm md:text-xl text-left leading-snug md:leading-tight" v-html="overlayConfig.description" />
          </div>

          <div class="relative w-full mt-2 md:mt-0">
            <form class="flex w-full bg-white border border-gray-400 rounded relative z-[30]" @submit.prevent="handleSearch">
              <input 
                v-model="searchQuery"   
                type="text" 
                :placeholder="overlayConfig.placeholder" 
                class="flex-1 px-3 py-2 md:px-4 md:py-3 outline-none text-black rounded-l text-sm md:text-base"
                autocomplete="off"
                @input="onSearchInput"
              />
              <button 
                type="submit" 
                class="px-3 py-1 md:px-6 md:py-2 font-bold text-black border-l border-gray-300 hover:bg-gray-50 transition-colors text-sm md:text-base"
              >
                {{ overlayConfig.searchBtnText }}
              </button>
            </form>
<div 
  v-if="showResults && searchResults.length > 0" 
  class="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-b-lg shadow-xl z-[40] overflow-hidden text-left"
>
              <ul>
<li 
      v-for="product in searchResults" 
      :key="product.id"
      class="flex items-center p-3 border-b border-gray-100 hover:bg-gray-100 cursor-pointer transition-colors"
      @click="goToProduct(product)"
    >
                  <div class="w-12 h-12 flex-shrink-0 mr-4 border border-gray-200 rounded overflow-hidden bg-white">
                    <img 
                      :src="product.image || 'https://cdn02.plentymarkets.com/v5vzmmmcb10k/frontend/PWA/placeholder-image.png'" 
                      :alt="product.name" 
                      class="w-full h-full object-contain"
                    />
                  </div>
                  <div class="flex-1">
                    <p class="text-black text-sm font-medium leading-tight line-clamp-2">
                      {{ product.name }}
                    </p>
                  </div>
                  <div class="ml-2 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Swiper
        :id="`carousel-${index}`"
        :key="content.length"
        :modules="enableModules ? [Pagination, Navigation, Autoplay] : []"
        :slides-per-view="1"
        :touch-release-on-edges="true" 
        v-bind="carouselProps"
        :aria-roledescription="t('homepage.banner.ariaRoleDescriptionCarousel')"
        :aria-label="t('homepage.banner.ariaRoleDescriptionCarousel')"
        :loop="true"
        :autoplay="enableModules ? {
          delay: 4000, 
          disableOnInteraction: false, 
          pauseOnMouseEnter: true 
        } : false"
        :pagination="paginationConfig"
        :navigation="navigationConfig"
        class="!z-0 !w-full !max-h-[85vh] touch-pan-y" 
        @swiper="onSwiperInit"
        @slide-change="onSlideChange"
      >
        <SwiperSlide
          v-for="(banner, slideIndex) in content"
          :key="slideIndex"
          :aria-labelledby="content.length > 1 ? `carousel_item-${slideIndex}_heading` : null"
          :aria-label="
            content.length > 1
              ? t('homepage.banner.ariaLabelSlidePosition', { current: slideIndex + 1, total: content.length })
              : null
          "
          v-bind="carouselProps"
          :aria-roledescription="t('homepage.banner.ariaRoleDescriptionSlide')"
        >
          <slot
            name="content"
            :content-block="banner"
            :index="getSlideAdjustedIndex(slideIndex)"
            :slide-index="slideIndex"
            :lazy-loading="slideIndex > 0 ? 'lazy' : 'eager'"
          />
        </SwiperSlide>
        <div
          v-if="enableModules"
          :class="`swiper-pagination swiper-pagination-${index} swiper-pagination-bullets swiper-pagination-horizontal`"
        />
      </Swiper>

      <button
        v-if="enableModules && handleArrows()"
        :key="`prev-${index}`"
        type="button"
        :class="`swiper-button-prev swiper-button-prev-${index}`"
        :aria-controls="`carousel-${index}`"
        :aria-label="t('homepage.banner.ariaLabelPreviousSlide')"
        :style="{ color: configuration.controls.color + ' !important' }"
      />
      <button
        v-if="enableModules && handleArrows()"
        :key="`next-${index}`"
        type="button"
        :class="`swiper-button-next swiper-button-next-${index}`"
        :aria-controls="`carousel-${index}`"
        :aria-label="t('homepage.banner.ariaLabelNextSlide')"
        :style="{ color: configuration.controls.color + ' !important' }"
      />
    </div>
  </NuxtErrorBoundary>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

import './styles/navigation.min.css';
import './styles/pagination.min.css';
import './styles/swiper.min.css';

import type { CarouselStructureProps } from './types';
import type { Swiper as SwiperType } from 'swiper';
import { ref, computed, watch, nextTick } from 'vue';
import { productGetters } from '@plentymarkets/shop-api';

// --- 1. Import useSearch (if not auto-imported) ---
// import { useSearch } from '~/composables/useSearch';

const { activeSlideIndex, setIndex } = useCarousel();
const { content, index, configuration, meta } = defineProps<CarouselStructureProps>();
const isInternalChange = ref(false);

// --- DYNAMIC SEARCH CONFIGURATION ---
const overlayConfig = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const custom = (configuration as any).overlay || {};
  return {
    badgeText: custom.badgeText || 'Finden',
    description: custom.description || 'was Du suchst! Einfach Typnummer,<br />Modell, oder Hersteller eingeben',
    placeholder: custom.placeholder || 'Suchbegriff...',
    searchBtnText: custom.searchBtnText || 'und los!',
    bgColor: custom.bgColor || '#eadd87',
    showBottomBtn: custom.showBottomBtn !== false,
    bottomBtnText: custom.bottomBtnText || 'LAGERTECHNIK >',
    bottomBtnLink: custom.bottomBtnLink || '/lagertechnik'
  };
});

// ------------------------------------
// --- LIVE AJAX SEARCH LOGIC ---
// ------------------------------------
const router = useRouter();
const localePath = useLocalePath();
const searchQuery = ref('');
const showResults = ref(false);
let debounceTimeout: NodeJS.Timeout | null = null;

// FIX: Destructure the CORRECT names found in your useSearch.ts file
// - getSearch: The function to call the API
// - data: The reactive object containing results
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const { getSearch, data } = useSearch() as any;

const searchResults = computed(() => {
  const products = data.value?.products || [];
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return products.slice(0, 6).map((p: any) => {
    // 1. Extract BOTH IDs (Item ID and Variation ID)
    const itemId = p.item?.id || p.variation?.itemId;
    const variationId = p.variation?.id || productGetters.getId(p);
    
    // 2. Grab Name and Image
    const productName = productGetters.getName(p) || 'Unknown Product';
    const productImage = productGetters.getCoverImage(p) || 'https://cdn02.plentymarkets.com/v5vzmmmcb10k/frontend/PWA/placeholder-image.png';
    
    // 3. Extract the base URL path
    const rawUrlPath = p.texts?.urlPath || `product/${itemId}`;
    const formattedUrl = rawUrlPath.startsWith('/') ? rawUrlPath : `/${rawUrlPath}`;
    
    // 4. Construct the perfect URL! (_ItemId_VariationId)
    const finalUrl = `${formattedUrl}_${itemId}_${variationId}`;

    return {
      id: variationId || itemId, // Keep variationId here for the Vue :key loop
      name: productName,
      image: productImage,
      url: finalUrl
    };
  });
});

const onSearchInput = () => {
  if (debounceTimeout) clearTimeout(debounceTimeout);
  
  if (searchQuery.value.trim().length < 3) {
    showResults.value = false;
    return;
  }

  debounceTimeout = setTimeout(async () => {
    try {
      // FIX: Call 'getSearch' instead of 'search'
      await getSearch({ term: searchQuery.value, itemsPerPage: 6 });
      
      // Only show if we actually got results
      if (searchResults.value.length > 0) {
        showResults.value = true;
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error("Search Failed:", e);
    }
  }, 300);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const goToProduct = (product: any) => {
  showResults.value = false;
  const url = product.url.startsWith('http') ? product.url : localePath(product.url);
  
  if (product.url.startsWith('http')) {
     window.location.href = url;
  } else {
     router.push(url);
  }
};

const handleSearch = () => {
  if (searchQuery.value.trim().length > 0) {
    showResults.value = false;
    window.location.href = `/search?term=${searchQuery.value}`;
  }
};
// ------------------------------------

const handleArrows = () => {
  const viewport = useViewport();
  return !viewport.isLessThan('md');
};

const enableModules = computed(() => content.length > 1);
let slider: SwiperType | null = null;

const paginationConfig = computed(() => {
  return enableModules.value && configuration.controls.color
    ? {
        el: `.swiper-pagination-${index}`,
        clickable: true,
        bulletActiveClass: 'swiper-pagination-bullet-active !bg-primary-500',
        renderBullet(index: number, className: string) {
          return `<span key="dot-${index}" class="${className}" style="background-color: ${configuration.controls.color}!important;"></span>`;
        },
      }
    : false;
});

const navigationConfig = computed(() => {
  return enableModules.value
    ? {
        nextEl: `.swiper-button-next-${index}`,
        prevEl: `.swiper-button-prev-${index}`,
      }
    : false;
});

const carouselProps = computed(() => {
  return content.length > 1 ? { role: 'group' } : {};
});

const onSwiperInit = async (swiper: SwiperType) => {
  slider = swiper;
  if (activeSlideIndex.value[meta.uuid] === null) {
    setIndex(meta.uuid, swiper.realIndex);
  }
};

const reinitializeSwiper = async () => {
  if (!slider || slider.destroyed) return;
  await nextTick();
  slider.update();
  if (slider.params.navigation && slider.navigation) {
    slider.navigation.destroy();
    slider.navigation.init();
    slider.navigation.update();
  }
  if (slider.params.pagination && slider.pagination) {
    slider.pagination.destroy();
    slider.pagination.init();
    slider.pagination.update();
  }
};

const onSlideChange = async (swiper: SwiperType) => {
  const realIndex = swiper.realIndex;
  if (isInternalChange.value) {
    isInternalChange.value = false;
    return;
  }
  if (realIndex !== activeSlideIndex.value[meta.uuid]) {
    setIndex(meta.uuid, realIndex);
  }
};

const getSlideAdjustedIndex = (slideIndex: number) => {
  return activeSlideIndex.value[meta.uuid] === slideIndex ? index : index + slideIndex;
};

watch(
  () => activeSlideIndex.value[meta.uuid],
  (newIndex) => {
    if (!slider || slider.destroyed) return;
    if (slider.realIndex !== newIndex) {
      isInternalChange.value = true;
      if (slider.params.loop) {
        slider.slideToLoop(newIndex ?? 0);
      } else {
        slider.slideTo(newIndex ?? 0);
      }
    }
  },
  { flush: 'post' },
);

watch(
  () => content.length,
  async (newLength, oldLength) => {
    if (oldLength <= 1 && newLength > 1) {
      await reinitializeSwiper();
    }
  },
);

watch(
  () => configuration.controls.color,
  (newColor, oldColor) => {
    if (slider && !slider.destroyed && newColor !== oldColor) {
      slider.pagination.render();
      slider.pagination.update();
    }
  },
);
</script>

<style scoped>
/* Feste Banner-Hoehe je Geraet */
.kk-hero {
  --kk-hero-h: 320px;
}

@media (min-width: 768px) {
  .kk-hero {
    --kk-hero-h: 360px;
  }
}

@media (min-width: 1024px) {
  .kk-hero {
    --kk-hero-h: 420px;
  }
}

@media (min-width: 1536px) {
  .kk-hero {
    --kk-hero-h: 460px;
  }
}

.kk-hero :deep(.swiper),
.kk-hero :deep(.swiper-slide) {
  height: var(--kk-hero-h) !important;
  max-height: none !important;
}

.kk-hero :deep(.swiper-slide) {
  overflow: hidden;
}

.kk-hero :deep(.swiper-slide > *),
.kk-hero :deep(.swiper-slide *:has(img)) {
  height: 100% !important;
  max-height: none !important;
  aspect-ratio: auto !important;
}

.kk-hero :deep(.swiper-slide picture),
.kk-hero :deep(.swiper-slide img) {
  display: block;
  width: 100% !important;
  height: 100% !important;
  max-height: none !important;
  object-fit: cover;
  object-position: center;
}
</style>
