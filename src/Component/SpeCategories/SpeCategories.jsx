import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { Helmet , HelmetProvider } from 'react-helmet-async';

export default function SpeCategories() {
  let param = useParams ();
  function getSpeCategories (id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
  };
  let { data } = useQuery(['speCategories' , param.id] , () => getSpeCategories (param.id) , {
    enabled : !!param.id
  });
  
  return <>
  <HelmetProvider>
    <Helmet>
      <title>{data?.data.data.title}</title>
    </Helmet>
    {data?.data.data ? <div className="row w-75 align-items-center mx-auto">
      <h1 className='text-center text-main my-5'>Category Details</h1>
      <div className="col-md-4">
        <div className='item'><img className='w-100' src={data?.data.data.image}/></div>
      </div>
      <div className="col-md-8">
        <h2 className='text-center text-main'>{data?.data.data.name}</h2>
      </div>
    </div> : ''}
  </HelmetProvider>
  </>
}
