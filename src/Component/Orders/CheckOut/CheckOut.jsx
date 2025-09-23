import { useFormik } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { checkOutPayment } from '../../../redux/cartSlice';

export default function CheckOut() {
  const daata = useParams();
  const dispatch = useDispatch();
////// ValidationSchema Yup to handle regEX ///////
  let validationSchema = Yup.object({
    details: Yup.string(),
    city: Yup.string().required('City is Required').matches(/^[\w-]{3,}$/,'Enter Valid City'),
    phone: Yup.string().required('Phone is Required').matches(/^01[1250][0-9]{8}$/,'Enter Valid Phone'),
  })
////// UseFormik to handle the form ///////
  let formik = useFormik({
    initialValues : {
      details:'',
      city:'',
      phone : ''
    },
    onSubmit : Pay,
    validationSchema 
  })
///// Function to open payment link //////
  async function Pay(val) {
    try {
      const resultAction = await dispatch(checkOutPayment({ cartId: daata.id, shippingAddress: val }));
      const req = resultAction.payload;
      if (req?.status === 'success') {
        window.open(req.session.url, '_self');
      }
    } catch (err) {
      console.log(err);
    }
  }

  return <>
  <div className="container w-75 mx-auto">
    <h1 className='text-center mt-5'>Payment</h1>
    {/* ////// Form Details ////// */}
    <form className='my-5' action="" onSubmit={formik.handleSubmit}>
      {/* ////// Input and Label for city ////// */}
      <div className='my-2'>
        <label htmlFor="city">City : </label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control mb-3' type="text" name='city' id='city'/>
        {(formik.errors.city && formik.touched.city) ? <div className='alert alert-danger'>{formik.errors.city}</div> : '' }
      </div>
      {/* ////// Input and Label for Phone ////// */}
      <div className='my-2'>
        <label htmlFor="phone">Phone : </label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control mb-3' type="tel" name='phone' id='phone'/>
        {(formik.errors.phone && formik.touched.phone) ? <div className='alert alert-danger'>{formik.errors.phone}</div> : '' }
      </div>
      {/* ////// Input and Label for Details ////// */}
      <div className='my-2'>
        <textarea placeholder='Enter Details Here ...' onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control mb-3' name='details'></textarea>
        {(formik.errors.details && formik.touched.details) ? <div className='alert alert-danger'>{formik.errors.details}</div> : '' }
      </div>
      {/* ///// button go to payment link ///// */}
      <div className='text-center'>
        <button type='submit' className='btn bg-main text-white w-25'>Pay
        <i className='fa-brands fa-cc-visa mx-2'></i></button>
      </div>
    </form>
  </div>
  </>
}
