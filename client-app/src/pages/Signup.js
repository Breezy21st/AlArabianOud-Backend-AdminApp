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
import { useNavigate } from 'react-router-dom';

function countDigits(str) {
  return str.replace(/\D/g, '').length;
}

const signUpSchema = yup.object({
  firstname: yup.string().required("First name is required"),
  lastname: yup.string().required("Last name is required"),
  email: yup.string().email("Email should be valid e.g name@example.com").required("Email is required"),
  countryCode: yup.string()
      .required('Country code is required'),
  mobile: yup.string().required('Mobile number is required').test(
        'isValidMobile',
        '', // We'll set the message dynamically based on the countryCode
        function(value) {
          const { countryCode } = this.parent; // Access other values in the schema
          const numberOfDigits = countDigits(value); // Count only digits to ignore spaces or other characters
    
          let requiredDigits;
          switch (countryCode) {
            case '+1': // USA & Canada
              requiredDigits = 10; // 10 digits after the country code
              break;
            case '+27': // South Africa
              requiredDigits = 9; // 9 digits after the country code
              break;
            case '+44': // UK
              requiredDigits = 10; // 10 digits after the country code
              break;
            // Add other country code checks here
            default:
              return this.createError({ message: 'Please select a valid country code' });
          }
    
          if (numberOfDigits !== requiredDigits + countryCode.length) {
            // Set the dynamic error message
            return this.createError({ message: `Mobile number must be exactly ${requiredDigits} digits long.` });
          }
    
          return true; // If no issues, validation passes
        }
      ),
  password: yup
    .string()
    .required("Password is required")
    // you can add password strength validations here if required
    .min(8, "Password must be at least 8 characters long"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], "Passwords must match")
    .required("Confirm password is required"),
});

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      countryCode: "",
      mobile: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      dispatch(registerUser(values))
        .unwrap()
        .then(() => {
          navigate('/login'); // Redirect on success
        })
        .catch((error) => {
          // Handle the error condition if registration fails
          console.error('Registration failed: ', error);
        });
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
                  
                <div className="form-group">
        <label htmlFor="mobile">Mobile Number</label>
        <div style={{ display: 'flex' }}>
          <select
            name="countryCode"
            onChange={(e) => {
              formik.setFieldValue('countryCode', e.target.value);
              // Combine country code with the existing mobile number without country code
              formik.setFieldValue('mobile', `${e.target.value} ${formik.values.mobile.split(" ")[1] || ''}`.trim());
            }}
            onBlur={formik.handleBlur}
            value={formik.values.countryCode}
            className="form-control form-select"
            style={{ maxWidth: '100px', marginRight: '8px', borderRadius: '10px', border: "2px solid #ccc"  }}
          >
            <option value="" label="Code" />
            <option value="+1" label="+1" />
            <option value="+27" label="+27" />
            <option value="+44" label="+44" />
            
          </select>
          <input 
            style={{ borderRadius: '10px', border: "2px solid #ccc"}}
            type="tel"
            name="mobile"
            placeholder="Enter your mobile number"
            value={formik.values.mobile.split(" ")[1] || ''} // To ensure only the mobile number part is displayed
            onChange={(e) => {
              // Update mobile value keeping the country code
              formik.setFieldValue('mobile', `${formik.values.countryCode} ${e.target.value}`.trim());
            }}
            onBlur={formik.handleBlur}
            
          />
        </div>
        {formik.touched.mobile && formik.errors.mobile ? (
          <div className="error">{formik.errors.mobile}</div>
        ) : null}
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

                {/* Add logic for confirm password with hide/show password icon */}
            <CustomInput
              type="password" // The type should be "password" not "confirm password"
              name="confirmPassword" // Change this to camelCase to match the formik state
              label="Confirm Password"
              placeholder="Confirm your password"
              value={formik.values.confirmPassword} // Update this to use confirmPassword from formik's state
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="error">
              {formik.touched.confirmPassword && formik.errors.confirmPassword} 
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
