import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function ForgetPass () {
let navReset = useNavigate()
let [errMsg,setErr] = useState('')
let [formStatus , setFormStatus] = useState(true)
////// ValidationSchema Yup to handle Email ///////
let validationSchema = Yup.object({
  email: Yup.string().required('Email is Required').email('Enter Valid Email'),
})
////// ValidationSchema Yup to handle reset code ///////
let validationSchema2 = Yup.object({
  resetCode: Yup.string().required('Reset Code is Required').matches(/^[0-9]{5,6}$/ , 'Enter Valid Code')
})
////// UseFormik to handle Email form ///////
  let formik = useFormik({
    initialValues : {
      email : '',
    },
    onSubmit : ForgetPassApi,
    validationSchema 
  })
////// UseFormik to handle reset code form ///////
  let formik2 = useFormik({
    initialValues : {
      resetCode : ''
    },
    onSubmit : verifyResetCode,
    validationSchema : validationSchema2
  })
///// Function to send email forget pass //////
  async function ForgetPassApi (value){
    try {
      let req = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', value);
      if (req.data.statusMsg === 'success') {
        setFormStatus(false);
      }
    } catch (errorr) {
      const message = errorr.response?.data?.message || 'Something went wrong';
      setErr(message);
    }
  }
///// Function to verify reset code //////
  async function verifyResetCode (value) {
    try {
      let req = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', value);
      if (req.data.status === 'Success') {
        navReset('/resetPass');
      }
    } catch (errorr) {
      const message = errorr.response?.data?.message || 'Something went wrong';
      setErr(message);
    }
  }

  return <>
  <div className='my-5 w-50 m-auto'>
    <HelmetProvider>
    {/* /////// Helmet contains informations about Component /////// */}
    <Helmet>
      <title>Forget Password</title>
    </Helmet>
    <h1 className='text-center'>Login Now ....</h1>
    {/* ///// Display The error messages ///// */}
    {errMsg !== '' ? <div className='alert alert-danger'>{errMsg}</div> : ''}
    {/* ///// Formik to handle The Forms ///// */}
    {formStatus ? <form onSubmit={formik.handleSubmit}>
      {/* ////// enter email /////// */}
      <div className='my-2'>
  <label htmlFor="forgetpass-email">Enter Your Email</label>
  <input onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control mb-3' type="email"
  name='email' id='forgetpass-email' autoComplete="email"/>
        <button type='submit' className='btn bg-main text-white'>Send</button>
      </div>
      {/* ////// enter email /////// */}
    </form>  :  
    ////// Formik2 to handle reset code ///////
    <form onSubmit={formik2.handleSubmit}>
      {/* ////// enter reset code /////// */}
      <div className='my-2'>
        <label htmlFor="resetCode">Enter Reset Code</label>
        <input onBlur={formik2.handleBlur} onChange={formik2.handleChange} className='form-control mb-3' type="resetCode"
        name='resetCode' id='resetCode'/>
        {formik2.errors.resetCode && formik2.touched.resetCode ?<div className='alert alert-danger'>{formik2.errors.resetCode}</div>:''}
        <button type='submit' className='btn bg-main text-white'>Confirm Code</button>
      </div>
      {/* ////// enter reset code /////// */}
    </form>
    ////// Formik2 to handle reset code ///////
    }
    </HelmetProvider>
  </div>
  </>
}
