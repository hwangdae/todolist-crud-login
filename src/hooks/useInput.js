import { useState } from "react";

function useInput() {
  const [value, setValue] = useState("");

  const handler = (event) => {
    setValue(event.target.value);
  };

  const reset = () =>{
    setValue("")
  }
  
  return [value, handler, reset];
}

export default useInput;
