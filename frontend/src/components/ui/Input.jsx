import { forwardRef } from "react";

// eslint-disable-next-line react/display-name
export const Input = forwardRef((props, ref) => {
  return (
    
    <input
      type="text"
      className={`bg-zinc-100 py-3 block my-2 text-center w-full`}
      {...props}
      ref={ref}
    />
    
  );
});

export default Input;
