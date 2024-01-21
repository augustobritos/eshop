import { forwardRef } from "react";

// eslint-disable-next-line react/display-name
export const TextArea = forwardRef((props, ref, className) => {
  return (
    
    <textarea
      type="text"
      className={`bg-zinc-100 px-96 py-2 block my-2 ${className}`}
      {...props}
      ref={ref}
    >
      {props.children}
    </textarea>
    
  );
});

export default TextArea;
