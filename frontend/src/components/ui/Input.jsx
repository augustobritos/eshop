import { forwardRef } from "react";

// eslint-disable-next-line react/display-name
export const Input = forwardRef((props, ref, className) => {
  return (
    
    <input
      type="text"
      className={`bg-zinc-100 px-96 py-3 block my-2 text-center ${className}`}
      {...props}
      ref={ref}
    />
    
  );
});

export default Input;
