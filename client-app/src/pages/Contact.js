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
<<<<<<< HEAD
import CustomInput from "../components/CustomInput";
=======
>>>>>>> 28296f3c9e4640e593df6fc16a09a9645b131d6b

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

            {/* need to fix the maps API from google developer console */}
            <iframe
              src="https://www.google.com/maps/embed/v1/view?zoom=17&center=-25.8361%2C28.1397&key=AIzaSyAE_ImBAIcv-lrjDrFAHdh0-ClON65vdQE"
              width="600"
              height="450"
              className="border-0 w-100"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="col-12 mt-5">
            <div className="contact-inner-wrapper d-flex justify-content-between ">
              <div>
<<<<<<< HEAD
                <h3 className="contact-title mb-4">Contact us</h3>
                <form action="" onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
                  <div>
                    <CustomInput
                      type="text"
                      label="Full Name"
                      className="form-control"
                      placeholder="Enter your full name"
=======
                <h3 className="contact-title mb-4">Contact</h3>
                <form action="" onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
                  <div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
>>>>>>> 28296f3c9e4640e593df6fc16a09a9645b131d6b
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
<<<<<<< HEAD
                    <CustomInput
                      type="email"
                      label="Email Address"
                      className="form-control"
                      placeholder="Enter your email address"
=======
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
>>>>>>> 28296f3c9e4640e593df6fc16a09a9645b131d6b
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
<<<<<<< HEAD
                    <CustomInput
                      type="tel"
                      label="Mobile Number"
                      className="form-control"
                      placeholder="Enter your mobile number"
=======
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Mobile Number"
>>>>>>> 28296f3c9e4640e593df6fc16a09a9645b131d6b
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
<<<<<<< HEAD
                    Comments
                    <textarea

                      id=""
                      className="w-100 form-control "
                      cols="30"
                      rows="4"
                      placeholder="Type your comments here"
=======
                    <textarea
                     
                      id=""
                      className="w-100 form-control"
                      cols="30"
                      rows="4"
                      placeholder="Comments"
>>>>>>> 28296f3c9e4640e593df6fc16a09a9645b131d6b
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
                      <a href="tel:+91 8264954234">+91 8264954234</a>
                    </li>
                    <li className="mb-3 d-flex gap-15 align-items-center">
                      <AiOutlineMail className="fs-5" />
<<<<<<< HEAD
                      <a href="mailto:info@alarabianoud.co.za" >
=======
                      <a href="info@alarabianoud.co.za">
>>>>>>> 28296f3c9e4640e593df6fc16a09a9645b131d6b
                        info@alarabianoud.co.za
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
