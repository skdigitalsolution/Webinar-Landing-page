import { useId } from 'react'

export default function LotusMark({ className = '' }) {
  const id = useId()
  return <svg className={className} viewBox="0 0 80 60" fill="none" aria-hidden="true"><defs><linearGradient id={id} x1="0" y1="0" x2="70" y2="60"><stop stopColor="#fff5a4"/><stop offset="1" stopColor="#f4ac23"/></linearGradient></defs><g stroke={`url(#${id})`} strokeWidth="2.2" strokeLinejoin="round"><path d="M40 54C21 43 26 23 40 7c14 16 19 36 0 47Z"/><path d="M40 54C18 53 12 37 15 17c16 3 27 16 25 37ZM40 54c22-1 28-17 25-37-16 3-27 16-25 37Z"/><path d="M40 54C18 60 6 46 3 32c17-2 31 5 37 22ZM40 54c22 6 34-8 37-22-17-2-31 5-37 22Z"/></g></svg>
}
