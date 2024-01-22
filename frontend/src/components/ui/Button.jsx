export function Button({ children, className, ...props }) {
  return (
    <button
      className={`gap-1.5 rounded-md bg-green-500 px-3 py-1.5 text-sm font-semibold 
    text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
    focus-visible:outline-green-500 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
