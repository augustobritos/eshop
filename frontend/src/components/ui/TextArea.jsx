import { forwardRef } from "react";

// eslint-disable-next-line react/display-name
export const TextArea = forwardRef((props, ref) => {
  return (
    
    <textarea
      type="text"
      className={`bg-zinc-100 py-2 block my-2 w-full`}
      {...props}
      ref={ref}
    >
      {props.children}
    </textarea>
    
  );
});

export default TextArea;
