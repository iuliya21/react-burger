import { useState } from "react";

export function useForm (inputValues={}) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event: { target: { value: string; name: string; }; }) => {
    const {value, name} = event.target;
    setValues({...values, [name]: value});
  };
  return {values, handleChange, setValues};
}