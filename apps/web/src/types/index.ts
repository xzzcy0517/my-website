export interface Platform {
  id: string
  name: string
  label: string
  url: string
  icon: 'video' | 'music' | 'tv' | 'book'
  color: 'accent-cool' | 'accent-warm'
}

export interface WechatPublic {
  name: string
  label: string
  qrcodePath: string
  color: 'accent-warm'
}

export type TypewriterState = 'idle' | 'typing' | 'done'

export interface UseTypewriterOptions {
  texts: string[]
  speed?: number
  startDelay?: number
  enabled?: boolean
}

export interface UseTypewriterReturn {
  displayedTexts: string[]
  currentLineIndex: number
  currentCharIndex: number
  state: TypewriterState
  isCursorVisible: boolean
}

export interface UseScrollTriggerOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export interface UseScrollTriggerReturn {
  ref: React.RefCallback<HTMLElement>
  isInView: boolean
  hasTriggered: boolean
}
