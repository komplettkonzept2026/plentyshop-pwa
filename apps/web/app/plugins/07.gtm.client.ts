type GtmWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>
}

const GTM_ID = 'GTM-P2DD2N58'

/**
 * Load GTM only after marketing consent, and only when the browser is idle.
 * Keeps GTM/gtag/Clarity off the PDP critical path (Lighthouse reject-all protocol).
 */
export default defineNuxtPlugin(() => {
  const { cookieGroups } = useCookieBar()

  const marketingAccepted = computed(() =>
    Boolean(cookieGroups.value?.find((group) => group.name === 'CookieBar.marketing.label')?.accepted),
  )

  const injectGtm = () => {
    if (typeof document === 'undefined') return
    if (document.getElementById('gtm-script')) return

    const win = window as GtmWindow
    win.dataLayer = win.dataLayer || []
    win.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' })

    const script = document.createElement('script')
    script.id = 'gtm-script'
    script.async = true
    script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`
    document.head.appendChild(script)
  }

  const scheduleInject = () => {
    const idle = (window as Window & { requestIdleCallback?: typeof requestIdleCallback }).requestIdleCallback
    if (typeof idle === 'function') {
      idle(() => injectGtm(), { timeout: 4000 })
      return
    }
    window.setTimeout(injectGtm, 1500)
  }

  watch(
    marketingAccepted,
    (accepted) => {
      if (accepted) scheduleInject()
    },
    { immediate: true },
  )
})
