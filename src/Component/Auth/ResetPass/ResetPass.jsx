import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

export default function ResetPass() {
  let nav = useNavigate()
////// ValidationSchema Yup to handle regEX ///////
  let validationSchema = Yup.object({
    email: Yup.string().required('Email is Required').email('Enter Valid Email'),
    newPassword: Yup.string().required('newPassword is Required')
    .matches(/^[a-zA-Z!@#$%^*_0-9]{6,16}$/,'Enter Valid newPasword'),
  });
////// UseFormik to handle the form ///////
  let form = useFormik({
    initialValues : {
      email : "",
      newPassword : ""
    }, 
    onSubmit : ResetPasswordApi,
    validationSchema
  });
///// Function to Reset New Password //////
  async function ResetPasswordApi(value) {
    let req = await axios.put( 'https://ecommerce.routemisr.com/api/v1/auth/resetPassword' , value)
    if(req.data.token){
      nav('/login')
    }
  }

  return <>
  <HelmetProvider>
    <div className='my-5 w-50 m-auto'>
    {/* /////// Helmet contains informations about Component /////// */}
      <Helmet>
        <title>Reset Password</title>
      </Helmet>
      <h1>Reset Password</h1>
      {/* ///// Formik to handle The Form ///// */}
      <form action="" onSubmit={form.handleSubmit}>
        {/* ////// enter email /////// */}
        <div className='my-2'>
          <label htmlFor="resetpass-email">Email : </label>
          <input onBlur={form.handleBlur} onChange={form.handleChange} className='form-control mb-3' type="email"
          name='email' id='resetpass-email' autoComplete="email"/>
          {(form.errors.email && form.touched.email) ? <div className='alert alert-danger'>{form.errors.email}</div> : '' }
        </div>
        {/* ////// enter New Password /////// */}
        <div className='my-2'>
          <label htmlFor="newPassword">New Password : </label>
          <input onBlur={form.handleBlur} onChange={form.handleChange} className='form-control mb-3' 
          type="password" name='newPassword'  id='newPassword' />
          {(form.errors.newPassword && form.touched.newPassword) ? <div className='alert alert-danger'>{form.errors.newPassword}</div> : '' }
        </div>
        {/* ////// button to update Password /////// */}
        <button disabled={!(form.isValid && form.dirty)} type='submit' 
        onClick={form.handleSubmit} className='btn bg-main text-white'>Update Password</button>
      </form>
    </div>
  </HelmetProvider>
</>
}
