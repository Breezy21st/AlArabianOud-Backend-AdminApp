import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { BiPhoneCall, BiInfoCircle } from "react-icons/bi";
import Container from "../components/Container";
import * as yup from 'yup';
import {useFormik} from 'formik';
import {useDispatch, useDsipatch} from 'react-redux';
import {createQuery} from '../features/contact/contactSlice'

import CustomInput from "../components/CustomInput";


const contactSchema = yup.object({
  name: yup.string().defined("Name is Required"),
  email: yup.string().nullable().email("Email should be valid").required("Email is Required"),
  mobile: yup.string().default('').nullable().required("Mobile Number is Required."),
  comment: yup.string().default('').nullable().required("Comment is Required.")

})

const Contact = () => {
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      comment: ""
    },

    validationSchema: contactSchema,
    onSubmit: values => {
      dispatch(createQuery(values))
    }
  })

  return (
    <>
      <Meta title={"Contact Us"} />
      <BreadCrumb title="Contact Us" />
      <Container class1="contact-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28728.10141035298!2d28.10367661083984!3d-25.836127599999987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e95649ec8bd04b7%3A0x1c285ac76c2d198!2sEldo%20Square%20Shopping%20Centre!5e0!3m2!1sen!2sza!4v1699369318981!5m2!1sen!2sza" 
              width="1300" 
              height="450" 
              style={{ border: "0"}}
              allowfullscreen="" 
              loading="lazy" 
              referrerpolicy="no-referrer-when-downgrade">
              </iframe>
            
          </div>
          <div className="col-12 mt-5">
            <div className="contact-inner-wrapper d-flex justify-content-between ">
              <div>

                <h3 className="contact-title mb-4">Contact us</h3>
                <form action="" onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
                  <div>
                    <CustomInput
                      type="text"
                      label="Full Name"
                      className="form-control"
                      placeholder="Enter your full name"
                      name="name"
                      onChange = {formik.handleChange("name")}
                      onBlur = {formik.handleBlur("name")}
                      value = {formik.values.name}
                    />
                    <div className="errors">
                        {
                          formik.touched.name && formik.errors.name
                        }
                    </div>
                  </div>
                  <div>

                    <CustomInput
                      type="email"
                      label="Email Address"
                      className="form-control"
                      placeholder="Enter your email address"

                    

                      name = "email"
                      onChange = {formik.handleChange("email")}
                      onBlur = {formik.handleBlur("email")}
                      value = {formik.values.email}
                    />
                    <div className="errors">
                        {
                          formik.touched.email && formik.errors.email
                        }
                    </div>
                  </div>
                  <div>

                    <CustomInput
                      type="tel"
                      label="Mobile Number"
                      className="form-control"
                      placeholder="Enter your mobile number"

                    

                      name = "mobile"
                      onChange = {formik.handleChange("mobile")}
                      onBlur = {formik.handleBlur("mobile")}
                      value = {formik.values.mobile}
                    />
                    <div className="errors">
                        {
                          formik.touched.mobile && formik.errors.mobile
                        }
                    </div>
                  </div>
                  <div>

                    Comments
                    <textarea

                      id=""
                      className="w-100 form-control "
                      cols="30"
                      rows="4"
                      placeholder="Type your comments here"
                      name = "comment"
                      onChange = {formik.handleChange("comment")}
                      onBlur = {formik.handleBlur("comment")}
                      value = {formik.values.comment}
                    ></textarea>
                    <div className="errors">
                        {
                          formik.touched.comment  && formik.errors.comment
                        }
                    </div>
                  </div>
                  <div>
                    <button className="button border-0">Submit</button>
                  </div>
                </form>
              </div>
              <div>
                <h3 className="contact-title mb-4">Get in touch with us</h3>
                <div>
                  <ul className="ps-0">
                    <li className="mb-3 d-flex gap-15 align-items-center">
                      <AiOutlineHome className="fs-5" />
                      <address className="mb-0">
                      Willem Botha Dr Shop 17, Eldo Square Shopping Centre, Eldo Glen, Centurion, 0157
                      </address>
                    </li>
                    <li className="mb-3 d-flex gap-15 align-items-center">
                      <BiPhoneCall className="fs-5" />
                      <a href="tel:+27 072 054 4448">+27 072 054 4448</a>
                    </li>
                    <li className="mb-3 d-flex gap-15 align-items-center">
                      <AiOutlineMail className="fs-5" />

                      <a href="mailto:nooreinahmed@gmail.com" >

                        nooreinahmed@gmail.com
                      </a>
                    </li>
                    <li className="mb-3 d-flex gap-15 align-items-center">
                      <BiInfoCircle className="fs-5" />
                      <p className="mb-0">Monday – Friday 10 AM – 8 PM</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Contact;
