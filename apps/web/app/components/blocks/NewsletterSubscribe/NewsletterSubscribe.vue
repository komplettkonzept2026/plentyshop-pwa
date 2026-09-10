<template>
  <div
    class="relative mt-5 p-4 sm:p-10 text-center"
    :style="{ backgroundColor: props.content.text?.bgColor ?? '#f5f5f5' }"
    data-testid="newsletter-block"
  >
    <h1
      v-if="props.index === 0"
      class="typography-display-3 md:typography-display-2 lg:typography-display-1 font-bold my-2 lg:leading-[4rem]"
      data-testid="newsletter-title"
      v-html="props.content.text?.title ?? t('newsletter.heading')"
    />
    <h2
      v-if="props.index !== 0"
      class="typography-headline-4 sm:typography-headline-3 font-bold mb-2"
      data-testid="newsletter-title"
      v-html="props.content.text?.title ?? t('newsletter.heading')"
    />
    <p
      class="typography-text-sm sm:typography-text-base my-2 mb-4"
      data-testid="newsletter-description"
      v-html="props.content.text?.htmlDescription ?? t('newsletter.info')"
    />

<form class="mx-auto max-w-[550px] pt-2" novalidate @submit.prevent="onSubmit">

  <!-- First + Last name -->
  <div
    v-if="props.content.input?.displayNameInput"
    class="grid grid-cols-1 sm:grid-cols-2"
  >
    <!-- first name -->
    <div class="sm:mr-4">
      <UiFormLabel>{{ t('newsletter.firstName') }}</UiFormLabel>
      <SfInput v-bind="firstNameAttributes" v-model="firstName" />
      <ErrorMessage name="firstName" class="text-negative-700 text-sm" />
    </div>

    <!-- last name -->
    <div class="sm:ml-4">
      <UiFormLabel>{{ t('newsletter.lastName') }}</UiFormLabel>
      <SfInput v-bind="lastNameAttributes" v-model="lastName" />
      <ErrorMessage name="lastName" class="text-negative-700 text-sm" />
    </div>
  </div>

  <!-- Email -->
  <div class="mt-4">
    <UiFormLabel>{{ t('newsletter.email') }}</UiFormLabel>
    <SfInput v-bind="emailAttributes" v-model="email" type="email" />
    <ErrorMessage name="email" class="text-negative-700 text-sm" />
  </div>

  <!-- Dynamic Fields -->
  <div
    v-for="field in props.content.fields"
    :key="field.key"
    class="mt-4"
  >
    <UiFormLabel>
      {{ field.label }} <span v-if="field.required">*</span>
    </UiFormLabel>

    <SfInput
      v-if="field.type === 'text'"
      v-model="dynamicFields[field.key]"
      type="text"
    />

    <SfTextarea
      v-else-if="field.type === 'textarea'"
      v-model="dynamicFields[field.key]"
    />
  </div>

  <!-- Checkbox options -->
  <div v-if="props.content.checkboxOptions?.length" class="mt-6 space-y-2">
    <div
      v-for="option in props.content.checkboxOptions"
      :key="option.key"
      class="flex items-center"
    >
      <SfCheckbox v-model="selectedOptions[option.key]" class="mr-2" />
      <span>{{ option.label }}</span>
    </div>
  </div>

  <!-- Privacy -->
  <div class="mt-6">
    <SfCheckbox v-bind="privacyPolicyAttributes" v-model="privacyPolicy" />
    <span class="ml-2">{{ t('newsletter.policy') }}</span>
    <ErrorMessage name="privacyPolicy" class="text-negative-700 text-sm" />
  </div>

  <!-- Submit -->
  <div class="mt-6 text-center">
    <UiButton type="submit" :disabled="loading">
      {{ props.content.button?.label ?? t('newsletter.subscribe') }}
    </UiButton>
  </div>

</form>


    <div class="text-left typography-text-xs mt-3">** {{ t('contact.form.asterixHint') }}</div>
  </div>
</template>

<script lang="ts" setup>
import { SfCheckbox, SfInput, SfTextarea } from '@storefront-ui/vue';
import { useForm, ErrorMessage } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import { object, string, boolean } from 'yup';
import { paths } from '~/utils/paths';
import type { NewsletterSubscribeProps } from './types';

const { subscribe, loading } = useNewsletter();
const { send } = useNotification();
const localePath = useLocalePath();
const props = defineProps<NewsletterSubscribeProps>();
// const { getSetting } = useSiteSettings('cloudflareTurnstileApiSiteKey');

const turnstileElement = ref();
const turnstileLoad = ref(false);
const wrapperClass = 'focus-within:outline focus-within:outline-offset';

const dynamicFields = reactive<Record<string, string>>({});
const selectedOptions = reactive<Record<string, boolean>>({});

const validationSchema = toTypedSchema(
  object({
    firstName: props.content.input?.nameIsRequired
      ? string().required(t('error.newsletter.firstNameRequired')).default('')
      : string().optional().default(''),
    lastName: props.content.input?.nameIsRequired
      ? string().required(t('error.newsletter.lastNameRequired')).default('')
      : string().optional().default(''),
    email: string().email(t('error.email.valid')).required(t('error.email.required')).default(''),
    privacyPolicy: boolean().oneOf([true], t('error.newsletter.termsRequired')).default(false),
  //   turnstile:
  //     turnstileSiteKey.length > 0
  //       ? string().required(t('error.newsletter.turnstileRequired')).default('')
  //       : string().optional().default(''),
  }),
);

const { errors, meta, defineField, handleSubmit, resetForm } = useForm({
  validationSchema: validationSchema,
});

const [firstName, firstNameAttributes] = defineField('firstName');
const [lastName, lastNameAttributes] = defineField('lastName');
const [email, emailAttributes] = defineField('email');
// const [turnstile, turnstileAttributes] = defineField('turnstile');
const [privacyPolicy, privacyPolicyAttributes] = defineField('privacyPolicy');

const lastNameLabel = useFormLabel(
  t('newsletter.lastName'),
  computed(() => !props.content.input?.nameIsRequired),
);
const firstNameLabel = useFormLabel(
  t('newsletter.firstName'),
  computed(() => !props.content.input?.nameIsRequired),
);

const subscribeNewsletter = async () => {
  // FIX: Remove the turnstile check
  if (!meta.value.valid) return;

  const response = await subscribe({
    firstName: firstName.value ?? '',
    lastName: lastName.value ?? '',
    email: email.value ?? '',
    emailFolder: props.content.settings.emailFolderId,
    extraFields: {
      ...dynamicFields,
      options: Object.keys(selectedOptions)
        .filter(k => selectedOptions[k])
        .join(','),
    },
  });

  if (response) {
    send({ type: 'positive', message: t('newsletter.success') });
    resetForm();
  }
};

const onSubmit = handleSubmit(() => subscribeNewsletter());

// if (turnstileSiteKey.length > 0) {
//   const turnstileWatcher = watch([firstName, lastName, email], (data) => {
//     if (data.some((field) => field && field.length > 0)) {
//       turnstileLoad.value = true;
//       turnstileWatcher();
//     }
//   });
// }
</script>
