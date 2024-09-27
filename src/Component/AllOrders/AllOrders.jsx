import { Helmet, HelmetProvider } from 'react-helmet-async';
import React, { useState } from 'react'
import axios from 'axios';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

export default function AllOrders() {

  let [page , setPage] = useState(1);
  function getPageNumber (event){
    let page = event.target.getAttribute('pagenum')
    setPage(page)
  }

  function getAllOrders (queryData) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/?page=${queryData.queryKey[1]}`)
  }
  let { isLoading , data } = useQuery(['ordersApi' , page] , getAllOrders )
  
  return <>
  <div>
  <HelmetProvider>
    <Helmet>
      <title>Fresh Cart All Orders</title>
    </Helmet>
      {isLoading ? <div className='loading bg-white position-fixed d-flex align-items-center justify-content-center top-0 bottom-0 start-0 end-0'>
        <span className="loader"></span>
      </div> :
      <div className='container my-5'>
        <h1 className='text-center text-main my-4'>All Orders</h1>
        <div className='row bg-main-light'>
        <h3 className='text-center my-3'>Number of Orders: <span className='text-main'>{data?.data.results}</span> Order</h3>
          {data?.data.data.map( (element) => {
            return <div key={element._id} className='d-flex border-bottom align-items-center py-2'>
              <div>
                <h3 className='text-main'>Total Order Price : {element.totalOrderPrice}</h3>
                <h3>Payment Type : {element.paymentMethodType}</h3>
                <h6 className='fw-bolder'>Name : {element.user.name}</h6>
                <h6 className='fw-bolder'>email : {element.user.email}</h6>
                <h6 className='fw-bolder'>phone : {element.user.phone}</h6>
              </div>
            </div>
            }
          )}
        </div>
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center my-5">
            <li className="page-item">
              <Link className="page-link" onClick={getPageNumber} aria-label="Previous"><span aria-hidden="true">&laquo;</span></Link>
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
  </HelmetProvider> 
  </div>
  </>
}
