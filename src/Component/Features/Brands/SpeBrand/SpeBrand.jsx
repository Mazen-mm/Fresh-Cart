import axios from 'axios';
import React from 'react'
import { Helmet } from 'react-helmet-async';
import { HelmetProvider } from 'react-helmet-async'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

export default function SpeBrand() {
  let params = useParams ();
///// Function to get specific brand //////
  function getSpeBrand (id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`) 
  }
  let { data } = useQuery(['spebrands' , params.id] , () => getSpeBrand (params.id) , {
    enabled : !!params.id
  });

  return <>
  <HelmetProvider>
    {/* /////// Helmet contains informations about Component /////// */}
    <Helmet>
      <title>Fresh Cart SpeBrands</title>
    </Helmet>
    <div className="container">
    <h1 className='text-center text-main my-5'>Specific Brand</h1>
      {/* //// Display Specific brand //// */}
      {data?.data.data ? <div className="row w-75 d-flex justify-content-between mx-auto align-items-center">
        <div className="col-md-5">
          <img className='w-100' src={data.data.data.image} alt={data?.data.data.title} />
        </div>
        <div className="col-md-5">
          <h2 className='my-3 fw-bolder text-main'>{data?.data.data.name}</h2>
          <p className='h5'>Brand Name : {data.data.data.slug}</p>
        </div>
      </div> : ''}
    </div>
  </HelmetProvider>
  </>
}
