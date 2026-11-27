import React from "react";

export const Input = ({
  value,
  setValue,
  validation,
  minLength,
  maxLength,
  title,
  type,
  placeholder,
  autoComplete,
  required
}) => {
  const change = (e) => {
    console.log(e.target.value);
    setValue(e.target.value)
};

  return(
    <input 
    value={value}
    onChange={change}
    minLength={minLength}
    maxLength={maxLength}
    title={title}
    type={type}
    placeholder={placeholder}
    autoComplete={autoComplete}
    required
    />
  ) 
};
