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

    <div className='background'> 
      <Meta title={"Sign Up"} />
      

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

                  label="First Name"
                  placeholder="Enter your first name"

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
                  label="Last Name"
                  placeholder="Enter your last name" 

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
                  label="Email Address"
                  placeholder="Enter your email address" 

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

                  label="Mobile number"
                  placeholder="Enter your mobile number"

                  value={formik.values.mobile} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="error">
                  {formik.touched.mobile && formik.errors.mobile}
                </div>


                  {/* put login for strong password */}
                <CustomInput
                  type="password"
                  name="password"
                  label="Password"
                  placeholder="Enter your password"
                  value={formik.values.password} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="error">
                  {formik.touched.password && formik.errors.password}
                </div>

                {/* put login for confirm password hide password icon*/}
                <CustomInput
                  type="confirm password"
                  name="confirm password"
                  label="Confirm Password"
                  placeholder="Enter confirm password"

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

      </div>

    </>
  );
};

export default Signup;
