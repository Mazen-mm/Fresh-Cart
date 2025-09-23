import { useFormik } from 'formik'
import React from 'react'
import { HelmetProvider } from 'react-helmet-async'
import * as Yup from 'yup'
import amazonImg from '../../../assets/images/Amazon_Pay_logo.png'
import masterImg from '../../../assets/images/MasterCard-Logo.png'
import payPalImg from '../../../assets/images/PayPal.png'
import appStoreImg from '../../../assets/images/App_Store.png'
import googlePlayImg from '../../../assets/images/get-it-on-google-play.png'

export default function Footer() {
////// ValidationSchema Yup to handle regEX in email input ///////
  let validationSchema = Yup.object({
    email: Yup.string().required('Email is Required').email('Enter Valid Email'),
  });
////// UseFormik to handle the Email input ///////
  let formik = useFormik({
    initialValues : {
      email : '',
    },
    validationSchema 
  });

  return <>
  <HelmetProvider>
    <div className="mt-5 bg-main-light">
      <div className="container py-5">
        {/* ///// First 2 sentence in footer ////// */}
        <h3>Get the FreshCart app</h3>
        <p>We will send you a link, open it on your phone to download the app</p>
        <div className="row pb-3 border-bottom">
          {/* ////// Email Input /////// */}
          <div className="col-8 col-md-9 col-lg-10">
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder="Email..."
              className='form-control mb-3' type="email" name='email' id='footer-email' autoComplete="email"/>
          </div>
          {/* ////// Share App button /////// */}
          <div className="col-4 col-md-3 col-lg-2 p-0">
            <button disabled={!(formik.isValid && formik.dirty)} type='submit' 
            onClick={formik.handleSubmit} className='btn bg-main text-white'>Share App Link</button>
          </div>
        </div>
        {/* ////// Last Section in Footer /////// */}
        <div className="row border-bottom py-3 d-flex align-items-center">
        {/* /////// Payment Partners //////// */}
          <div className="col-12 col-lg-6">
            <div className="row align-items-center">
              <div className="col-5"><h6>Payment Partners</h6></div>
              <div className="col-2 p-0"><img className='w-100' src={amazonImg} alt="" /></div>
              <div className="col-2 p-0"><img className='w-100' src={masterImg} alt="" /></div>
              <div className="col-2 p-0"><img className='w-100' src={payPalImg} alt="" /></div>
            </div>
          </div>
          {/* ////// Get Fresh Cart App /////// */}
          <div className="col-12 col-lg-6">
            <div className="row align-items-center">
              <div className="col-6"><h6>Get deliveries with FreshCart</h6></div>
              <div className="col-3 p-0"><img className='w-100' src={googlePlayImg} alt="" /></div>
              <div className="col-3 p-1"><img className='w-100' src={appStoreImg} alt="" /></div>
            </div>
          </div>
          {/* ////// Get Fresh Cart App /////// */}
        </div>
      </div>
    </div>
  </HelmetProvider>
  </>
}
