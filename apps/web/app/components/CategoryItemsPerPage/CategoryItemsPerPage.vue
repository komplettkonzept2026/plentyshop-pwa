<template>
  <div class="w-full" data-testid="category-items-per-page">
    <div
      v-if="!selectionModeCompact"
      class="bg-primary-50/50 mb-4 px-4 py-2 rounded-none uppercase typography-headline-6 font-bold tracking-widest select-none"
    >
      {{ t('common.labels.perPage') }}
    </div>
    <div class="px-4">
      <SfSelect
        id="perPage"
        v-model="selected"
        :aria-label="t('common.labels.perPage')"
        @change="updateItemsPerPage(Number(selected))"
      >
        <option v-if="selectionModeCompact" value="" disabled hidden>
          {{ t('common.labels.perPage') }}
        </option>
        <option v-for="{ value, label, disabled } in options" :key="value" :value="value" :disabled="disabled">
          {{ label }}
        </option>
      </SfSelect>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SfSelect } from '@storefront-ui/vue';
import type { CategoryItemsPerPageProps } from '~/components/CategoryItemsPerPage/types';
import { computed, ref, watch } from 'vue';
import { defaults } from '~/composables';

const props = defineProps<CategoryItemsPerPageProps & { selectionModeCompact?: boolean }>();

const { updateItemsPerPage: updateItemsPerPageFromComposable, getFacetsFromURL } = useCategoryFilter();
const selectionModeCompact = computed(() => props.selectionModeCompact ?? false);

// 1. Build the options cleanly from global defaults
const options = computed(() => {
  // Grab PER_PAGE_STEPS from defaults.ts (24 / 36 / 48)
  const baseOptions = defaults.PER_PAGE_STEPS.map((step) => ({
    label: step.toString(),
    value: step.toString(),
    disabled: false
  }));

  // Dynamically calculate and append "Alle" based on the current category's total products
  const allValue = props.totalProducts > 0 ? props.totalProducts.toString() : '9999';
  baseOptions.push({
    label: 'Alle',
    value: allValue,
    disabled: false
  });

  return baseOptions;
});

const facetsFromURL = getFacetsFromURL();

// 2. Use the global default (36) safely
const selectedValue = facetsFromURL.itemsPerPage?.toString() || defaults.DEFAULT_ITEMS_PER_PAGE.toString();
const selected = ref(selectedValue);

watch(
  selectionModeCompact,
  (on) => {
    if (on) {
      selected.value = '';
    } else if (!selected.value) {
      selected.value = defaults.DEFAULT_ITEMS_PER_PAGE.toString();
    }
  },
  { immediate: true }
);

const updateItemsPerPage = (itemsPerPage: number): void => {
  if (!itemsPerPage) return;
  updateItemsPerPageFromComposable(itemsPerPage);
};
</script>