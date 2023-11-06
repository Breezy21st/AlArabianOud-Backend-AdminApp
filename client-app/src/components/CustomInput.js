import React from "react";

const CustomInput = (props) => {
<<<<<<< HEAD
  const { type, name, label,placeholder, classname, value, onChange, onBlur } = props;
  return (
    <div >
      <label htmlFor={label}>{label} </label>
      <div className={`input-container ${classname}`}>
      <input 
=======
  const { type, name, placeholder, classname, value, onChange, onBlur } = props;
  return (
    <div>
      <input
>>>>>>> 28296f3c9e4640e593df6fc16a09a9645b131d6b
        type={type}
        name={name}
        placeholder={placeholder}
        className={`form-control ${classname}`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
<<<<<<< HEAD
      </div>
=======
>>>>>>> 28296f3c9e4640e593df6fc16a09a9645b131d6b
    </div>
  );
};

export default CustomInput;
