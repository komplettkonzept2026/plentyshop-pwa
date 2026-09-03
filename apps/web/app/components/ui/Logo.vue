<template>
  <img
    id="logo"
    ref="logo"
    :src="headerLogo"
    :alt="`${storeName} logo`"
    :class="logoClasses"
    fetchpriority="high"
  />
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const { getSetting: getHeaderLogo } = useSiteSettings('headerLogo');
const { getSetting: getHeaderBackgroundColor } = useSiteSettings('headerBackgroundColor');

const headerLogo = computed(() => getHeaderLogo());
const storeName = runtimeConfig.public.storename;

const isSvgLogo = computed(() => headerLogo.value.split('?')[0]?.toLowerCase().endsWith('.svg') ?? false);

const isLightBackground = (color: string): boolean => {
  if (!color) return true;

  const normalized = color.trim().toLowerCase();

  if (normalized === '#fff' || normalized === '#ffffff' || normalized === 'white') {
    return true;
  }

  if (normalized.startsWith('#')) {
    const hex = normalized.slice(1);
    const value =
      hex.length === 3
        ? hex
            .split('')
            .map((char) => char + char)
            .join('')
        : hex.slice(0, 6);
    const red = Number.parseInt(value.slice(0, 2), 16);
    const green = Number.parseInt(value.slice(2, 4), 16);
    const blue = Number.parseInt(value.slice(4, 6), 16);

    if ([red, green, blue].some(Number.isNaN)) return true;

    return red * 0.299 + green * 0.587 + blue * 0.114 > 186;
  }

  const rgbMatch = normalized.match(/(\d+)\D+(\d+)\D+(\d+)/);
  if (rgbMatch) {
    const [, red, green, blue] = rgbMatch.map(Number);
    return red * 0.299 + green * 0.587 + blue * 0.114 > 186;
  }

  return true;
};

const logoClasses = computed(() => [
  'h-[50px] lg:h-[62px] min-[1152px]:h-[72px] min-[1280px]:h-[96px] min-[1367px]:h-[126px] w-auto object-contain scale-[1.1] origin-left transition-all duration-300',
  isSvgLogo.value && isLightBackground(getHeaderBackgroundColor()) ? 'brightness-0' : '',
]);
</script>
