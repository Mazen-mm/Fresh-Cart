import React, { useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getLoggedUserCart, removeCartItem, updateProductQuantity } from '../../redux/cartSlice';

export default function Cart() {
  const dispatch = useDispatch();
  const { cart, status, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getLoggedUserCart());
  }, [dispatch]);

  const handleRemove = (id) => {
    dispatch(removeCartItem(id)).then(() => {
      dispatch(getLoggedUserCart());
    });
  };

  const handleUpdate = (id, count) => {
    dispatch(updateProductQuantity({ productId: id, count })).then(() => {
      dispatch(getLoggedUserCart());
    });
  };

  return (
    <div>
      <HelmetProvider>
        {/* /////// Helmet contains informations about Component /////// */}
        <Helmet>
          <title>Fresh Cart</title>
        </Helmet>
        <div className="text-center text-main mt-5"><h1>Cart Details</h1></div>
        {status === 'loading' ? (
          <div className='loading bg-white position-fixed d-flex align-items-center justify-content-center top-0 bottom-0 start-0 end-0'>
            <span className="loader"></span>
          </div>
        ) : error ? (
          <div className='alert alert-danger text-center my-5'>{error.message || error}</div>
        ) : cart && cart.data && cart.data.products.length > 0 ? (
          <div className="w-75 mx-auto my-3 p-3 bg-main-light">
            {/* /////// Cart Details /////// */}
            <h6 className='text-center text-main'>Cart Items : {cart.numOfCartItems}</h6>
            {/* /////// Cart items /////// */}
            {cart.data.products.map((el) => (
              <div key={el._id} className="row border-bottom align-items-center py-2 px-2">
                {/* /////// Cart items imgs /////// */}
                <div className="col-md-2"><img className='w-100 ' src={el.product.imageCover} alt="" /></div>
                {/* /////// Cart items details /////// */}
                <div className="col-md-10">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h6>{el.product && el.product.title ? el.product.title.split(' ').slice(0,3).join(' ') : ''}</h6>
                      <h6 className='text-muted'>Price : {el.price} EGP</h6>
                    </div>
                    {/* /////// buttons to update the count of items /////// */}
                    <div>
                      <button onClick={() => handleUpdate(el.product.id, el.count + 1)}
                        className='btn btn-success btn-sm p-2'><i className='fa-solid fa-plus'></i></button>
                      <span className='mx-2'>{el.count}</span>
                      <button onClick={() => handleUpdate(el.product.id, el.count - 1)}
                        className='btn btn-danger btn-sm p-2' disabled={el.count <= 1}><i className='fa-solid fa-minus'></i></button>
                    </div>
                  </div>
                  {/* /////// button to remove cart item //////// */}
                  <button onClick={() => handleRemove(el.product._id)} className='btn'>
                    <i className='text-danger fas fa-trash-can'></i> Remove</button>
                </div>
              </div>
            ))}
            <div>
              <div className="row d-flex justify-content-between">
                <div className="col-md-8">
                  <h6 className='my-3 text-main'>Total Price : {cart.data.totalCartPrice} EGP</h6>
                  {/* ///// Button to navigate to Checkout Component ////// */}
                  <NavLink to={'/checkout/' + cart.data._id} className='btn w-50 btn-success'>
                    Check Out Payment ?</NavLink>
                </div>
                <div className="col-md-3 my-3 d-flex align-items-center">
                  {/* /////// button to Clear Cart //////// */}
                  {/* <button onClick={() => dispatch(clearAllCart())} className='mx-auto w-75 p-2 btn btn-danger'>Clear Cart</button> */}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className='alert alert-info text-center my-5'>No items in cart.</div>
        )}
      </HelmetProvider>
    </div>
  );
}
