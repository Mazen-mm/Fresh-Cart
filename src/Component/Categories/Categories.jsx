import axios from 'axios';
import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

export default function Categories() {
  function getAllCategories ( ) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }
  let { isLoading , data } = useQuery( 'categoriesApi' , getAllCategories )
  return <>
  <HelmetProvider>
    <Helmet>
      <title>Fresh Cart Categories</title>
    </Helmet>
    <div className="container">
      <h1 className='text-center text-main mt-5'>All Categories</h1>
      {isLoading ? <div className='loading bg-white position-fixed d-flex align-items-center justify-content-center top-0 bottom-0 start-0 end-0'>
        <span className="loader"></span>
      </div> :
      <div className='container my-5'>
        <div className='row g-4'>
          {data?.data.data.map( (element) => {
            return <div key={element._id} className='col-md-4'>
              <Link to={`/specategories/${element._id}`}>
                <div className="card product text-center">
                  <div className='card-body p-0'>
                    <img className='w-100' style={{height:'300px', objectFit:'cover'}} src={element.image} />
                    <h4 className='text-success fw-bolder my-4'>{element.name}</h4>
                  </div>
                </div>
              </Link>
            </div>
            }
          )}
        </div>
      </div>
    }
    </div>
  </HelmetProvider>
  </>
}
