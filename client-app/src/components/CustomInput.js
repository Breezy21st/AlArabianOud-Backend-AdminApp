import React from "react";

const CustomInput = (props) => {
  const { type, name, label,placeholder, classname, value, onChange, onBlur } = props;
  return (
    <div >
      <label htmlFor={label}>{label} </label>
      <div className={`input-container ${classname}`}>
      <input 
        type={type}
        name={name}
        placeholder={placeholder}
        className={`form-control ${classname}`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      </div>
    </div>
  );
};

export default CustomInput;
