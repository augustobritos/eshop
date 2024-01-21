export function Label({ children, htmlFor, className }) {
  return (
    
      <label
        className={`text-zinc-950 text-lg font-bold ${className}`}
        htmlFor={htmlFor}
      >
        {children}
      </label>
    
  );
}
