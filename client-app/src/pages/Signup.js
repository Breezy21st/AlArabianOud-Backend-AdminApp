import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { useFormik } from 'formik';
import * as yup from "yup";
import { useDispatch } from 'react-redux'; 
import { registerUser } from "../features/user/userSlice";

const signUpSchema = yup.object({
  firstname: yup.string().required("First name is required"),
  lastname: yup.string().required("Last name is required"),
  email: yup.string().email("Email should be valid").required("Email is required"),
  mobile: yup.string().required("Mobile No is required"),
  password: yup.string().required("Password is required"),
});

const Signup = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      mobile: "",
      password: "",
    },
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      dispatch(registerUser(values));
    },
  });

  return (
    <>
      <Meta title={"Sign Up"} />
      <BreadCrumb title="Sign Up" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Sign Up</h3>
              <form 
                  action="" 
                  onSubmit={formik.handleSubmit} 
                  className="d-flex flex-column gap-15"
              >
                <CustomInput 
                  type="text" 
                  name="firstname" 
                  placeholder="First Name"
                  onChange={formik.handleChange}
                  value={formik.values.firstname} 
                  onBlur={formik.handleBlur}
                />
                <div className="error">
                  {formik.touched.firstname && formik.errors.firstname}
                </div>
                  
                <CustomInput 
                  type="text" 
                  name="lastname" 
                  placeholder="Last Name" 
                  value={formik.values.lastname} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="error">
                  {formik.touched.lastname && formik.errors.lastname}
                </div>
                  
                <CustomInput 
                  type="email" 
                  name="email" 
                  placeholder="Email" 
                  value={formik.values.email} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="error">
                  {formik.touched.email && formik.errors.email}
                </div>
                  
                <CustomInput
                  type="tel"
                  name="mobile"
                  placeholder="Mobile Number"
                  value={formik.values.mobile} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="error">
                  {formik.touched.mobile && formik.errors.mobile}
                </div>
                  
                <CustomInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formik.values.password} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="error">
                  {formik.touched.password && formik.errors.password}
                </div>
                <div>
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button border-0" type="submit">Sign Up</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Signup;
