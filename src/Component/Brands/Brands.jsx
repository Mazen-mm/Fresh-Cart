import { Helmet, HelmetProvider } from 'react-helmet-async';
import React, { useState } from 'react'
import axios from 'axios';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

export default function Brands() {
  let [page , setPage] = useState(1);
  function getPageNumber (event){
    let page = event.target.getAttribute('pagenum')
    setPage(page)
  }

  function getAllBrands (queryData) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands/?page=${queryData.queryKey[1]}`)
  }
  let { isLoading , data } = useQuery(['brandsApi' , page] , getAllBrands )

  return <>
  
  <HelmetProvider>
    <Helmet>
      <title>Fresh Cart Brands</title>
    </Helmet>
    <div className="container">
      <h1 className='text-center text-main mt-5'>All Brands</h1>
      {isLoading ? <div className='loading bg-white position-fixed d-flex align-items-center justify-content-center top-0 bottom-0 start-0 end-0'>
        <span className="loader"></span>
      </div> :
      <div className='container my-5'>
        <div className='row g-4'>
          {data?.data.data.map( (element) => {
            return <div key={element._id} className='col-md-3'>
              <Link to={`/specategories/${element._id}`}>
                <div className="product text-center">
                  <img className='w-100' src={element.image} alt="" />
                  <h4 className='text-main fw-bolder mt-2'>{element.name}</h4>
                </div>
              </Link>
            </div>
            }
          )}
        </div>
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center my-5">
            <li className="page-item">
              <Link className="page-link" onClick={getPageNumber}  aria-label="Previous"><span aria-hidden="true">&laquo;</span></Link>
            </li>
            <li className="page-item cursor-pointer"><Link className="page-link" pagenum='1' onClick={getPageNumber} >1</Link></li>
            <li className="page-item cursor-pointer"><Link className="page-link" pagenum='2' onClick={getPageNumber} >2</Link></li>
            <li className="page-item">
              <Link className="page-link" aria-label="Next"><span aria-hidden="true">&raquo;</span></Link>
            </li>
          </ul>
        </nav>
      </div>
      }
    </div>
  </HelmetProvider> 
  </>
}
