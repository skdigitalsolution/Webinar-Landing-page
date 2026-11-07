import { useId } from 'react'

export default function InputField({ label, id, error, hint, className = '', 'aria-describedby': describedBy, ...props }) {
  const generatedId = useId()
  const inputId = id || generatedId
  const description = [describedBy, hint && `${inputId}-hint`, error && `${inputId}-error`].filter(Boolean).join(' ') || undefined
  return (
    <div className={`input-field ${className}`.trim()}>
      <label htmlFor={inputId}>{label}{props.required && <span className="required-marker"> (required)</span>}</label>
      <input {...props} id={inputId} className="input-control" aria-invalid={error ? true : undefined} aria-describedby={description} />
      {hint && <p className="field-hint" id={`${inputId}-hint`}>{hint}</p>}
      {error && <p className="field-error" id={`${inputId}-error`} role="alert">{error}</p>}
    </div>
  )
}
