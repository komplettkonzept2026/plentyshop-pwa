<template>
  <picture>
    <source v-if="avifSrc" type="image/avif" :srcset="avifSrc" />
    <source v-if="webpSrc" type="image/webp" :srcset="webpSrc" />
    <img
      :src="fallbackSrc"
      :alt="alt"
      :class="imgClass"
      :width="width"
      :height="height"
      :loading="loading"
      :decoding="decoding"
      :fetchpriority="fetchpriority"
    />
  </picture>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    /** Path without extension, e.g. `/_nuxt-plenty/images/logo-header` */
    baseSrc: string
    fallbackExt?: string
    alt: string
    imgClass?: string
    width?: number
    height?: number
    loading?: 'eager' | 'lazy'
    decoding?: 'async' | 'auto' | 'sync'
    fetchpriority?: 'high' | 'low' | 'auto'
  }>(),
  {
    fallbackExt: 'png',
    imgClass: '',
    loading: 'lazy',
    decoding: 'async',
    fetchpriority: 'low',
  },
)

const avifSrc = computed(() => `${props.baseSrc}.avif`)
const webpSrc = computed(() => `${props.baseSrc}.webp`)
const fallbackSrc = computed(() => `${props.baseSrc}.${props.fallbackExt}`)
</script>
