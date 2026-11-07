export default function GlassCard({ as: Component = 'div', hover = false, className = '', children, ...props }) {
  return <Component className={`glass-card ${hover ? 'glass-card--hover' : ''} ${className}`.trim()} {...props}>{children}</Component>
}
