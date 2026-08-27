<template>
  <div
    v-if="parent || (categoryTreeItem && categoryTreeGetters.getItems(categoryTreeItem)?.length)"
    class="category-tree w-full"
  >
    <div
      class="py-2 px-4 mb-4 bg-primary-50/50 typography-headline-6 font-bold text-neutral-900 uppercase tracking-widest rounded-none select-none"
      data-testid="category-tree"
    >
      {{ t('common.labels.category') }}
    </div>
    <template v-if="parent">
      <CategoryTreeItem
        :name="categoryTreeGetters.getName(parent)"
        :href="localePath(buildCategoryMenuLink(parent, categoryTree))"
        :count="categoryTreeGetters.getCount(parent)"
        class="w-full block"
      >
        <SfIconArrowBack size="sm" class="text-neutral-500 mr-2" />
      </CategoryTreeItem>
    </template>

    <ul v-if="categoryTreeItem" class="mb-4 md:mt-2 w-full block" data-testid="categories">
      <template v-for="(categoryItem, index) in categoryTreeGetters.getItems(categoryTreeItem)" :key="index">
        <li class="w-full block list-none">
          <div class="flex items-center w-full">
            <CategoryTreeItem
              :name="categoryTreeGetters.getName(categoryItem)"
              :href="localePath(buildCategoryMenuLink(categoryItem, categoryTree))"
              :count="categoryTreeGetters.getCount(categoryItem)"
              class="w-full block flex-1"
            />
            <button
              v-if="categoryTreeGetters.getItems(categoryItem)?.length"
              type="button"
              class="shrink-0 p-1 text-neutral-500 hover:text-neutral-800"
              :aria-expanded="isExpanded(index)"
              :aria-label="isExpanded(index) ? t('common.actions.showLess') : t('common.actions.showMore')"
              @click="toggleExpanded(index)"
            >
              <SfIconChevronLeft :class="['transition-transform', isExpanded(index) ? 'rotate-90' : '-rotate-90']" />
            </button>
          </div>

          <!-- Nested children stay out of the initial HTML until expanded. -->
          <ul
            v-if="isExpanded(index) && categoryTreeGetters.getItems(categoryItem)?.length"
            class="w-full pl-4 border-l-2 border-neutral-200 ml-4 mb-3 block clear-both"
          >
            <CategoryTreeItem
              v-for="(childItem, childIndex) in categoryTreeGetters.getItems(categoryItem)"
              :key="childIndex"
              :name="categoryTreeGetters.getName(childItem)"
              :href="localePath(buildCategoryMenuLink(childItem, categoryTree))"
              :count="categoryTreeGetters.getCount(childItem)"
              class="!text-sm opacity-80 w-full block"
            />
          </ul>
        </li>
      </template>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { categoryGetters, categoryTreeGetters } from '@plentymarkets/shop-api';
import { SfIconArrowBack, SfIconChevronLeft } from '@storefront-ui/vue';
import type { CategoryTreeProps } from '~/components/CategoryTree/types';

const props = defineProps<CategoryTreeProps>();

const { data: categoryTree } = useCategoryTree();
const { buildCategoryMenuLink } = useLocalization();
const { t } = useI18n();

const localePath = useLocalePath();
const categoryTreeItem = computed(() =>
  categoryTreeGetters.findCategoryById(categoryTree.value, categoryGetters.getId(props.category)),
);
const parent = computed(() =>
  categoryTreeGetters.findCategoryById(categoryTree.value, categoryGetters.getParentId(props.category)),
);

const expandedIndexes = ref<Set<number>>(new Set());

const isExpanded = (index: number) => expandedIndexes.value.has(index);

const toggleExpanded = (index: number) => {
  const next = new Set(expandedIndexes.value);
  if (next.has(index)) {
    next.delete(index);
  } else {
    next.add(index);
  }
  expandedIndexes.value = next;
};
</script>
