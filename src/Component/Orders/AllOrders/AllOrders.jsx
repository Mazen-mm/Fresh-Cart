import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { HelmetProvider } from 'react-helmet-async'
import { useQuery } from 'react-query';
import axios from 'axios';

export default function AllOrders() {
  let [page , setPage] = useState(1)
  // Function to update the page number
  function getPageNumber(event) {
    let selectedPage = event.target.getAttribute('pagenum');
    setPage(selectedPage);
  }
///////// Function to get All Orders /////////
  function getOrders (queryData) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/?page=${queryData.queryKey[1]}`)
  }
  let { data } = useQuery(['ordersApi' , page], getOrders);
  
  return <>
  <HelmetProvider>
    {/* /////// Helmet to contain Component Informations /////// */}
    <Helmet>
      <title>Fresh Cart Orders</title>
    </Helmet>
    <div className="container my-5">
    <h1 className='text-center text-main'>All Orders</h1>
      {/* /////// Display Orders /////// */}
      <div className="row d-flex justify-content-between mx-auto my-3 p-3 bg-main-light">
        {data?.data?.data.map( (order) => 
          <div key={order._id} className="border-bottom border-top align-items-center my-5 py-5">
            <div className="row my-2">
              {/* /////// User Information /////// */}
              <div className="col-md-6">
              {order.user && (
                <>
                  <h6 className='text-main'><strong>User Details:</strong></h6>
                  <p><strong>Name: </strong>{order.user.name}</p>
                  <p><strong>Email: </strong>{order.user.email}</p>
                  <p><strong>Phone: </strong>{order.user.phone}</p>
                </>
              )}
              </div>
              {/* /////// Order Details /////// */}
              <div className="col-md-6">
                <h6><strong>Total Price:</strong> {order.totalOrderPrice} EGP</h6>
                <h6><strong>Payment Method:</strong> {order.paymentMethodType}</h6>
                {order.shippingAddress && (
                  <>
                    <h6><strong>Shipping Address:</strong></h6>
                    <p>Details: {order.shippingAddress.details}</p>
                    <p>Phone: {order.shippingAddress.phone}</p>
                    <p>City: {order.shippingAddress.city}</p>
                  </>
                )}
              </div>
            </div>
            {/* Cart Items */}
            <div className="row d-flex justify-content-between">
              <div className="col-md-2">
                <h6 className='text-main'><strong>Cart Items:</strong></h6>
              </div>
            {/* Cart Details */}
              <div className="col-md-10">
                <div className="row">
                {order.cartItems && (
                  <>
                    {order.cartItems.map((item, index) => (
                      <div key={index} className="col-md-4 cart-item border p-2 my-2">
                        <h6><strong>Item Count:</strong> {item.count}</h6>
                        <p><strong>Price:</strong> {item.price} EGP</p>
                        {/* Product Details */}
                        {item.product && (
                          <>
                            <img src={item.product.imageCover} alt={item.product.title} width="100"/>
                            <p><strong>Category:</strong> {item.product.category.name}</p>
                          </>
                        )}
                      </div>
                    ))}
                  </>
                )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pagination: Assuming you have multiple pages */}
        <div className="pagination-controls text-center my-5">
          <button className='btn btn-secondary' onClick={getPageNumber} pagenum={page - 1} disabled={page <= 1}>
            Previous
          </button>
          <span className='mx-2'>Page {page}</span>
          <button className='btn btn-secondary' onClick={getPageNumber} pagenum={Number(page) + 1}>
            Next
          </button>
        </div>
      </div>
    </div>
  </HelmetProvider>
  </>
}
