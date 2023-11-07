import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { useFormik } from 'formik';
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux'; 
import { loginUser } from "../features/user/userSlice";


const loginSchema = yup.object({
  email: yup.string().email("Email should be valid").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState('');
  const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isSuccess && user) {
      navigate('/'); 
    } else if (isError) {
      navigate("")
    }
  }, [user, isError, isSuccess, isLoading, navigate]);


  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values));
      
    },
  });

  return (
    <>

    <div className='background'> 
      <Meta title={"Login"} />

      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Login</h3>
              <div className="error text-center">
          {message.message === "Rejected" ? "Incorrect email or password, try again" : ""}
        </div>
              <form action="" onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
                

                
                <CustomInput 
                  type="email" 
                  name="email" 
                  label= "Email Address"
                  placeholder="Enter your email address" 

                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                  value={formik.values.email}
                />
                <div className="error">
                  {formik.touched.email && formik.errors.email}
                </div>

                {/* hide password icon */}
                <CustomInput
                  type="password"
                  name="password"
                  label="Password"
                  placeholder="Enter your password"

                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                  value={formik.values.password}
                />
                <div className="error">
                  {formik.touched.password && formik.errors.password}
                </div>
                <div>
                  <Link to="/forgot-password">Forgot Password?</Link>

                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button border-0" type="submit">
                      Login
                    </button>
                    <Link to="/signup" className="button signup">
                      SignUp
                    </Link>
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

export default Login;
