/**
 * Load SalesViewer only after marketing consent, and only when the browser is idle.
 * Mirrors the GTM consent-gating pattern.
 */
export default defineNuxtPlugin(() => {
  const { cookieGroups } = useCookieBar()

  const marketingAccepted = computed(() =>
    Boolean(cookieGroups.value?.find((group) => group.name === 'CookieBar.marketing.label')?.accepted),
  )

  const injectSalesViewer = () => {
    if (typeof document === 'undefined') return
    if (document.getElementById('salesviewer-script')) return

    const script = document.createElement('script')
    script.id = 'salesviewer-script'
    script.async = true
    script.src = 'https://svrdntfctn.com/stm.js?id=y0N8o2F1D6d4'
    script.referrerPolicy = 'no-referrer-when-downgrade'
    document.head.appendChild(script)
  }

  const scheduleInject = () => {
    const idle = (window as Window & { requestIdleCallback?: typeof requestIdleCallback }).requestIdleCallback
    if (typeof idle === 'function') {
      idle(() => injectSalesViewer(), { timeout: 4000 })
      return
    }
    window.setTimeout(injectSalesViewer, 1500)
  }

  watch(
    marketingAccepted,
    (accepted) => {
      if (accepted) scheduleInject()
    },
    { immediate: true },
  )
})
