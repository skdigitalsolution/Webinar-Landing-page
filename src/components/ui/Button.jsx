import { Link } from 'react-router-dom'

export default function Button({ children, variant = 'primary', className = '', to, href, disabled = false, type = 'button', ...props }) {
  const classes = `button button--${variant} ${className}`.trim()
  if (to || href) {
    if (disabled) return <span className={classes} role="link" aria-disabled="true">{children}</span>
    return to
      ? <Link className={classes} to={to} {...props}>{children}</Link>
      : <a className={classes} href={href} {...props}>{children}</a>
  }
  return <button className={classes} type={type} disabled={disabled} {...props}>{children}</button>
}
