import React, { useEffect } from 'react'

const WIDGET_ID = 'pagefind-search'

export default function SearchWidget(): React.JSX.Element {
  useEffect(() => {
    if (document.querySelector('link[href="/pagefind/pagefind-ui.css"]') === null) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = '/pagefind/pagefind-ui.css'
      document.head.appendChild(link)
    }

    const initWidget = (): void => {
      if (window.PagefindUI !== undefined) {
        // eslint-disable-next-line no-new -- PagefindUI constructor renders the search UI as a side effect
        new window.PagefindUI({ element: `#${WIDGET_ID}`, showImages: false, autofocus: true })
      }
    }

    if (window.PagefindUI === undefined) {
      const script = document.createElement('script')
      script.src = '/pagefind/pagefind-ui.js'
      script.onload = initWidget
      document.body.appendChild(script)
    } else {
      initWidget()
    }
  }, [])

  return <div id={WIDGET_ID} />
}
