<template>
  <picture>
    <template v-if="imageExtension === 'svg'">
      <NuxtImg
        ref="logo"
        :src="headerLogo"
        :alt="`${storeName} logo`"
        class="h-[50px] lg:h-[62px] min-[1152px]:h-[72px] min-[1280px]:h-[96px] min-[1367px]:h-[126px] w-auto object-contain scale-[1.1] origin-left transition-all duration-300"
      />
    </template>
    <template v-else-if="useLocalOptimizedLogo">
      <source type="image/avif" srcset="/_nuxt-plenty/images/logo-header.avif" />
      <source type="image/webp" srcset="/_nuxt-plenty/images/logo-header.webp" />
      <img
        id="logo"
        ref="logo"
        src="/_nuxt-plenty/images/logo-header.jpg"
        :alt="`${storeName} logo`"
        class="h-[50px] lg:h-[62px] min-[1152px]:h-[72px] min-[1280px]:h-[96px] min-[1367px]:h-[126px] w-auto object-contain scale-[1.1] origin-left transition-all duration-300"
        width="800"
        height="391"
        decoding="async"
        fetchpriority="low"
      />
    </template>
    <template v-else>
      <img
        id="logo"
        ref="logo"
        :src="headerLogo"
        :alt="`${storeName} logo`"
        class="h-[50px] lg:h-[62px] min-[1152px]:h-[72px] min-[1280px]:h-[96px] min-[1367px]:h-[126px] w-auto object-contain scale-[1.1] origin-left transition-all duration-300"
        decoding="async"
        fetchpriority="low"
      />
    </template>
  </picture>
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const { getSetting: getHeaderLogo } = useSiteSettings('headerLogo');

const headerLogo = computed(() => getHeaderLogo());
const useLocalOptimizedLogo = computed(() => /Logo_ohne_GmbH\.jpe?g/i.test(headerLogo.value || ''));

const storeName = runtimeConfig.public.storename;

const imageExtension = computed(() => headerLogo.value.split('.').pop());
</script>
