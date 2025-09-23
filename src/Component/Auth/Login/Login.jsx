import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import { setUserToken, setUserData } from '../../../redux/userSlice';
import { getLoggedUserCart } from '../../../redux/cartSlice';

export default function Login () {
  const dispatch = useDispatch();
  const navg = useNavigate();
  const navForget = useNavigate();
  const [errMsg, setErr] = useState('');
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  
  // ValidationSchema Yup to handle regEX
  const validationSchema = Yup.object({
    email: Yup.string().required('Email is Required').email('Enter Valid Email'),
    password: Yup.string().required('Password is Required')
      .matches(/^[a-zA-Z!@#$%^*_0-9]{6,16}$/,'Enter Valid Pasword'),
  });
  // UseFormik to handle the form
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: loginUser,
    validationSchema
  });

  // Fill demo credentials handler
  function fillDemoCredentials() {
    formik.setValues({
      email: 'mazenmahmoud100200300@gmail.com',
      password: 'Mazen123',
    });
  }
  // Function to Login the User
  async function loginUser(value) {
    setLoading(false);
    let req = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', value)
      .catch(function (errorr) {
        setErr(errorr.response.data.message);
        setLoading(true);
      });
    // if login process success ? open the Fresh Cart App and navigate to home component
    if (req?.data?.message === 'success') {
      setLoading(true);
      localStorage.setItem('userToken', req.data.token);
      dispatch(setUserToken(req?.data?.token));
      dispatch(setUserData(req?.data?.user));
      dispatch(getLoggedUserCart());
      navg('/');
    }
  }
  // Function to navigate to ForgetPass Component if user Forget his Password
  let handleForgetPassword = () => {
    navForget('/forgetPass');
  };

  return <>
  <div className='my-5 col-11 col-lg-8 col-md-9 m-auto'>
    <HelmetProvider>
    {/* /////// Helmet contains informations about Component /////// */}
    <Helmet>
      <title>Fresh Cart Login</title>
    </Helmet>
    <h1 className='text-center'>Login Now ....</h1>
    <div className="mb-3 bg-main-light border border-3 rounded-4 p-3" itemType='note'>
      <p className="fw-bolder mb-1">Demo login:</p>
      <p className="text-muted mb-1">Email: <b>mazenmahmoud100200300@gmail.com</b></p>
      <p className="text-muted mb-2">Password: <b>Mazen123</b></p>
      <button type="button" className="btn btn-primary" onClick={fillDemoCredentials}>
        Fill Demo Credentials
      </button>
    </div>
    {/* ///// Display The error messages ///// */}
    {errMsg !== '' ? <div className='alert alert-danger'>{errMsg}</div> : ''}
    {/* ///// Formik to handle The Form ///// */}
    <form action="" onSubmit={formik.handleSubmit}>
      {/* ////// enter email /////// */}
      <div className='my-2'>
        <label htmlFor="login-email">Email :</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control' type="email"
        name='email' id='login-email' autoComplete="email" value={formik.values.email}/>
        {(formik.errors.email && formik.touched.email) ? 
          <div className='alert alert-danger'>{formik.errors.email}</div> : '' }
      </div>
      {/* ////// enter password /////// */}
      <div className='my-2'>
        <label htmlFor="password">Password : </label>
        <div className='input-group d-flex flex-nowrap align-items-center'>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control' 
            type={showPassword ? "text" : "password"} name='password'  id='password' value={formik.values.password} />
          <button type='button' className="btn bg-dark-subtle cursor-pointer" onClick={() => setShowPassword(!showPassword)} >
            {showPassword ? <i className="fa-regular fa-eye-slash"></i> : <i className="fa-regular fa-eye"></i> }
          </button>
        </div>
        {(formik.errors.password && formik.touched.password) ? <div className='alert alert-danger'>
          {formik.errors.password}</div> : '' }
      </div>
      {/* //// Loading until checks out the login process successfully /// */}
      {loading ? <button disabled={!formik.isValid} type='submit'onClick={formik.handleSubmit} 
        className='btn bg-main text-white'>Login</button> : 
        <button type='button' className='btn text-white bg-success'>
          <i className='fa-solid fa-circle-notch fa-spin'></i>
        </button>}
      {/* ///// button to navigate to ForgetPass Component if user forget his pass ///// */}
      <button type='button' className='btn' onClick={handleForgetPassword}>Forget Password .... ?</button>
    </form>
    </HelmetProvider>
  </div>
  </>
}
