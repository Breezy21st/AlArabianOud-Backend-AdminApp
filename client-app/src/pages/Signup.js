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
<<<<<<< HEAD
    <div className='background'> 
      <Meta title={"Sign Up"} />
      
=======
      <Meta title={"Sign Up"} />
      <BreadCrumb title="Sign Up" />
>>>>>>> 28296f3c9e4640e593df6fc16a09a9645b131d6b
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
<<<<<<< HEAD
                  label="First Name"
                  placeholder="Enter your first name"
=======
                  placeholder="First Name"
>>>>>>> 28296f3c9e4640e593df6fc16a09a9645b131d6b
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
<<<<<<< HEAD
                  label="Last Name"
                  placeholder="Enter your last name" 
=======
                  placeholder="Last Name" 
>>>>>>> 28296f3c9e4640e593df6fc16a09a9645b131d6b
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
<<<<<<< HEAD
                  label="Email Address"
                  placeholder="Enter your email address" 
=======
                  placeholder="Email" 
>>>>>>> 28296f3c9e4640e593df6fc16a09a9645b131d6b
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
<<<<<<< HEAD
                  label="Mobile number"
                  placeholder="Enter your mobile number"
=======
                  placeholder="Mobile Number"
>>>>>>> 28296f3c9e4640e593df6fc16a09a9645b131d6b
                  value={formik.values.mobile} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="error">
                  {formik.touched.mobile && formik.errors.mobile}
                </div>
<<<<<<< HEAD

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
=======
                  
                <CustomInput
                  type="password"
                  name="password"
                  placeholder="Password"
>>>>>>> 28296f3c9e4640e593df6fc16a09a9645b131d6b
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
<<<<<<< HEAD
      </div>
=======
>>>>>>> 28296f3c9e4640e593df6fc16a09a9645b131d6b
    </>
  );
};

export default Signup;
