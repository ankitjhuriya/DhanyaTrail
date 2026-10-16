import Link from 'next/link'
import { Fragment, ReactNode } from 'react'

// Renders the small inline syntax used in lib/blog.ts: **bold**, [text](/path) and [^n] citations.
const TOKEN = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|\[\^\d+\])/g

export function BlogText({ text }: { text: string }) {
  const parts = text.split(TOKEN).filter(Boolean)
  return (
    <>
      {parts.map((part, i) => <Fragment key={i}>{renderPart(part)}</Fragment>)}
    </>
  )
}

function renderPart(part: string): ReactNode {
  if (part.startsWith('**') && part.endsWith('**')) return <strong>{part.slice(2, -2)}</strong>

  const cite = part.match(/^\[\^(\d+)\]$/)
  if (cite) return <sup><a href={`#source-${cite[1]}`} aria-label={`Source ${cite[1]}`}>{cite[1]}</a></sup>

  const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
  if (link) {
    const [, label, href] = link
    return href.startsWith('/')
      ? <Link href={href}>{label}</Link>
      : <a href={href} target="_blank" rel="noopener noreferrer">{label}</a>
  }

  return part
}
