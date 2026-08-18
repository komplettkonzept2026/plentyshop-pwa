<template>
  <div class="google-translate-wrapper">
    <button
      v-if="!isActivated"
      type="button"
      class="translate-placeholder"
      :aria-label="t('common.navigation.loadTranslate')"
      data-testid="google-translate-load"
      @click="activate"
      @pointerdown="activate"
      @focus="activate"
    >
      {{ t('common.navigation.translatePlaceholder') }}
    </button>
    <div v-show="isActivated" :id="elementId" />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from '#imports';

type GoogleTranslateElementOptions = {
  pageLanguage: string;
  includedLanguages: string;
  autoDisplay: boolean;
};

type GoogleTranslateConstructor = new (
  options: GoogleTranslateElementOptions,
  elementId: string,
) => unknown;

type GoogleTranslateWindow = Window &
  typeof globalThis & {
    googleTranslateElementInit?: () => void;
    google?: typeof globalThis.google & {
      translate?: {
        TranslateElement: GoogleTranslateConstructor;
      };
    };
  };

const route = useRoute();
const { locale, t } = useI18n();
const elementId = `google_translate_element_${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
const isActivated = ref(false);
const isInitializing = ref(false);

const GOOGLE_TRANSLATE_LOCALE_MAP: Record<string, string> = {
  cn: 'zh-CN',
  nn: 'ar',
};

/** Languages shown in the Google Translate dropdown. */
const INCLUDED_LANGUAGE_CODES = [
  'de', // German
  'en', // English
  'es', // Spanish
  'pt', // Portuguese
  'ru', // Russian
  'nl', // Dutch
  'pl', // Polish
  'da', // Danish
  'fr', // French
  'it', // Italian
  'cs', // Czech
  'zh-CN', // Chinese
  'ar', // Arabic
] as const;

const INCLUDED_LANGUAGES = INCLUDED_LANGUAGE_CODES.join(',');

/**
 * Labels used when we have to re-insert a language Google stripped from the
 * dropdown. Google omits whatever matches `pageLanguage` (e.g. German when
 * the shop locale is `de`).
 */
const LANGUAGE_LABELS: Record<string, string> = {
  de: 'German',
  en: 'English',
  es: 'Spanish',
  pt: 'Portuguese',
  ru: 'Russian',
  nl: 'Dutch',
  pl: 'Polish',
  da: 'Danish',
  fr: 'French',
  it: 'Italian',
  cs: 'Czech',
  'zh-CN': 'Chinese (Simplified)',
  ar: 'Arabic',
};

const getGoogleTranslatePageLanguage = () => GOOGLE_TRANSLATE_LOCALE_MAP[locale.value] ?? locale.value;

/**
 * Google Translate removes the current `pageLanguage` from `.goog-te-combo`.
 * Re-insert any missing included languages (notably German on the DE shop).
 */
const ensureIncludedLanguagesInDropdown = () => {
  const root = document.getElementById(elementId);
  const select = root?.querySelector<HTMLSelectElement>('.goog-te-combo')
    ?? document.querySelector<HTMLSelectElement>('.goog-te-combo');
  if (!select) return;

  const existing = new Set(Array.from(select.options).map((option) => option.value));

  INCLUDED_LANGUAGE_CODES.forEach((lang, index) => {
    if (existing.has(lang)) return;

    const option = document.createElement('option');
    option.value = lang;
    option.textContent = LANGUAGE_LABELS[lang] ?? lang;
    // Keep list order: placeholder at 0, then included languages in declared order.
    select.add(option, select.options[index + 1] ?? null);
    existing.add(lang);
  });
};

const loadGoogleTranslateScript = (): Promise<void> => {
  const translateWindow = window as GoogleTranslateWindow;
  const existing = document.getElementById('google-translate-script') as HTMLScriptElement | null;

  if (translateWindow.google?.translate?.TranslateElement) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const prevInit = translateWindow.googleTranslateElementInit;
    translateWindow.googleTranslateElementInit = () => {
      prevInit?.();
      resolve();
    };

    if (existing) {
      existing.addEventListener('error', () => reject(new Error('Google Translate script failed')), { once: true });
      // Script tag exists but TranslateElement may still be loading.
      const check = window.setInterval(() => {
        if (translateWindow.google?.translate?.TranslateElement) {
          window.clearInterval(check);
          resolve();
        }
      }, 50);
      window.setTimeout(() => {
        window.clearInterval(check);
        if (!translateWindow.google?.translate?.TranslateElement) {
          reject(new Error('Google Translate script timed out'));
        }
      }, 15000);
      return;
    }

    const script = document.createElement('script');
    script.id = 'google-translate-script';
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    script.onerror = () => reject(new Error('Google Translate script failed to load'));
    document.body.appendChild(script);
  });
};

const mountTranslateWidget = async () => {
  if (typeof window === 'undefined' || isInitializing.value) return;

  isInitializing.value = true;
  try {
    await nextTick();

    const container = document.getElementById(elementId);
    if (container) {
      container.innerHTML = '';
    }

    await loadGoogleTranslateScript();

    const translateWindow = window as GoogleTranslateWindow;
    const TranslateElement = translateWindow.google?.translate?.TranslateElement;
    if (!TranslateElement) return;

    new TranslateElement(
      {
        pageLanguage: getGoogleTranslatePageLanguage(),
        includedLanguages: INCLUDED_LANGUAGES,
        autoDisplay: false,
      },
      elementId,
    );

    ensureIncludedLanguagesInDropdown();
    requestAnimationFrame(ensureIncludedLanguagesInDropdown);
  } finally {
    isInitializing.value = false;
  }
};

const activate = async () => {
  if (isActivated.value) return;
  isActivated.value = true;
  await mountTranslateWidget();
};

// Rebuild only after the user has opted in (SPA navigations / locale switches).
watch(
  () => route.path,
  () => {
    if (!isActivated.value) return;
    setTimeout(() => {
      void mountTranslateWidget();
    }, 200);
  },
);

watch(
  () => locale.value,
  () => {
    if (!isActivated.value) return;
    setTimeout(() => {
      void mountTranslateWidget();
    }, 200);
  },
);
</script>

<style>
/* 1. HIDE GOOGLE BRANDING & EXTRA TEXT */
.goog-logo-link,
.goog-te-gadget span,
.goog-te-gadget > div > a {
  display: none !important;
}

.goog-te-gadget {
  color: transparent !important;
  font-size: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
  line-height: 0 !important;
  white-space: nowrap !important;
}

/* 2. STYLE THE DROPDOWN MENU TO MATCH THE PREVIOUS UI */
.goog-te-gadget .goog-te-combo,
.translate-placeholder {
  appearance: none !important;
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
  width: 126px !important;
  max-width: 126px !important;
  height: 28px !important;
  color: #111827 !important;
  background-color: #ffffff !important;
  background-image:
    linear-gradient(45deg, transparent 50%, #6b7280 50%),
    linear-gradient(135deg, #6b7280 50%, transparent 50%),
    linear-gradient(to right, #d1d5db, #d1d5db) !important;
  background-position:
    calc(100% - 12px) calc(50% - 3px),
    calc(100% - 6px) calc(50% - 3px),
    calc(100% - 1.45rem) 50% !important;
  background-size: 5px 5px, 5px 5px, 1px 58% !important;
  background-repeat: no-repeat !important;
  border: 1px solid #d1d5db !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  font-size: 12px !important;
  font-weight: 500 !important;
  line-height: 1 !important;
  padding: 0 1.55rem 0 6px !important;
  margin: 0 !important;
  cursor: pointer !important;
  outline: none !important;
  vertical-align: middle !important;
  text-overflow: clip !important;
  text-align: left;
}

.goog-te-gadget .goog-te-combo:hover,
.goog-te-gadget .goog-te-combo:focus,
.translate-placeholder:hover,
.translate-placeholder:focus {
  border-color: #9ca3af !important;
}

/* 4. HIDE TOP BANNER & LAYOUT-BREAKING IFRAMES */
.goog-te-banner-frame,
iframe.goog-te-banner-frame,
body > .skiptranslate {
  display: none !important;
}

.goog-te-gadget img {
  display: none !important;
}

.google-translate-wrapper {
  max-width: 100%;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  line-height: 1;
}
</style>
