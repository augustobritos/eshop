export function Card({ children, className }) {
  return <div className={`bg-white rounded-md ${className}`}>{children}</div>;
}
