import { useState } from 'react'

/** Copy text to the clipboard with a graceful fallback and a transient "copied" flag. */
export function useClipboard(resetMs = 2000) {
  const [copied, setCopied] = useState(false)

  async function copy(text: string): Promise<boolean> {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text)
      } else {
        // Fallback for non-secure contexts (e.g. plain http).
        const textArea = document.createElement('textarea')
        textArea.value = text
        textArea.style.position = 'absolute'
        textArea.style.opacity = '0'
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
      }
      setCopied(true)
      setTimeout(() => setCopied(false), resetMs)
      return true
    } catch (err) {
      console.error('Failed to copy text:', err)
      return false
    }
  }

  return { copy, copied }
}
