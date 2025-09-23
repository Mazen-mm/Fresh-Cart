import React, { useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, getLoggedUserCart } from '../../redux/cartSlice';
import { getLoggedUserWish, removeWishItem } from '../../redux/wishlistSlice';

export default function Wishlist() {
  const dispatch = useDispatch();
  const { wishlist, status, error } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(getLoggedUserWish());
  }, [dispatch]);

  const handleRemoveWish = (id) => {
    dispatch(removeWishItem(id)).then(() => {
      dispatch(getLoggedUserWish());
    });
  };

  const handleAddToCart = (id) => {
    dispatch(addToCart(id))
      .unwrap()
      .then((res) => {
        if (res.status === 'success') {
          dispatch(getLoggedUserCart());
          Swal.fire({
            title: 'Good job!',
            text: 'Product added successfully to your cart',
            icon: 'success',
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message || 'Something went wrong!',
          footer: '<a href="#">Why do I have this issue?</a>',
        });
      });
  };

  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>Fresh Cart Wish List</title>
        </Helmet>
        <div className="text-center text-main mt-5">
          <h1>Wish List</h1>
        </div>
        {status === 'loading' ? (
          <div className='loading bg-white position-fixed d-flex align-items-center justify-content-center top-0 bottom-0 start-0 end-0'>
            <span className="loader"></span>
          </div>
        ) : error ? (
          <div className='alert alert-danger text-center my-5'>{error.message || error}</div>
        ) : wishlist && wishlist.data ? (
          <div className="w-75 mx-auto my-3 p-3 bg-main-light">
            <h5 className='text-center'>Favourite Items : {wishlist.count}</h5>
            {wishlist?.data?.map((el) => (
              <div key={el._id} className="row border-bottom align-items-center py-2 px-2">
                <div className="col-md-2">
                  <img className='w-100 ' src={el.imageCover} alt="" />
                </div>
                <div className="col-md-10">
                  <div className="d-flex justify-content-between">
                    <div className='col-md-9'>
                      <h6>{el.title}</h6>
                      <h6 className='text-muted'>Price : {el.price} EGP</h6>
                    </div>
                    <div className='col-md-2'>
                      <button onClick={() => handleAddToCart(el.id)} className='btn bg-main text-white btn-sm p-2'>Add To Cart</button>
                    </div>
                  </div>
                  <button onClick={() => handleRemoveWish(el?._id)} className='btn'>
                    <i className='text-danger fas fa-trash-can'></i> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='alert alert-info text-center my-5'>No items in wishlist.</div>
        )}
      </HelmetProvider>
    </div>
  );
}
