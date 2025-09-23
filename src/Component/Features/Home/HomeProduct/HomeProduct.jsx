import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, getLoggedUserCart } from '../../../../redux/cartSlice';

import { addToWish, setNumOfWishItems, getLoggedUserWish, removeWishItem } from '../../../../redux/wishlistSlice';

export default function HomeProduct() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const wishlistData = useSelector((state) => state.wishlist.wishlist?.data);
  const wishlist = wishlistData || [];

  useEffect(() => {
    dispatch(getLoggedUserWish());
  }, [dispatch]);

  // Add product to wishlist
  async function toggleWishlist(id, isWished) {
    try {
      let req;
      if (isWished) {
        req = await dispatch(removeWishItem(id)).unwrap();
      } else {
        req = await dispatch(addToWish(id)).unwrap();
      }
      if (req.status === 'success') {
        dispatch(setNumOfWishItems(req.numOfWishItems));
        await dispatch(getLoggedUserWish());
        Swal.fire({
          title: 'Good job!',
          text: isWished ? 'Product removed from your wish list' : 'Product added successfully to your wish list',
          icon: 'success',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    }
  }

  function getPageNumber(event) {
    let selectedPage = event.target.getAttribute('pagenum');
    setPage(selectedPage);
  }

  function getProducts(queryData) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/Products/?page=${queryData.queryKey[1]}`);
  }

  let { isLoading, data } = useQuery(['productsApi', page], getProducts);

  async function addProductToCart(id) {
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
  }

  return (
    <>
      {isLoading ? (
        <div className='loading bg-white position-fixed d-flex align-items-center justify-content-center top-0 bottom-0 start-0 end-0'>
          <span className="loader"></span>
        </div>
      ) : (
        <div className='container my-5 m-auto'>
          <h2 className='text-center text-main mb-5'>All Products</h2>
          <div className='row justify-content-between g-0'>
            {data?.data.data.map((element) => {
              const isWished = wishlist.some((item) => item.id === element.id);
              return (
                <div key={element.id} className='col-md-2 m-1'>
                  <div className="product position-relative p-1">
                    <Link to={`/productdetails/${element.id}`}>
                      <img className='w-100' src={element.imageCover} alt="" />
                      <h6 className='text-main mt-2'>{element.category.name}</h6>
                      <h6>{element.title.split(' ').slice(0, 2).join(' ')}</h6>
                      <div className='d-flex justify-content-between'>
                        <span>{element.price}EGP</span>
                        <span>{element.ratingsAverage}<i className='fa-solid fa-star rating-color'></i></span>
                      </div>
                    </Link>
                    {/* //// button to add/remove from wish list //// */}
                    <i
                      onClick={() => toggleWishlist(element.id, isWished)}
                      className={`fa-heart fa-2x position-absolute top-0 end-0 m-2 ${isWished ? 'fa-solid text-danger' : 'fa-regular text-danger'}`}
                      style={{ cursor: 'pointer', zIndex: 2 }}
                      title={isWished ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    ></i>
                    {/* //// button add to cart //// */}
                    <button onClick={() => addProductToCart(element.id)} className='btn bg-main text-white w-100 mt-2'>Add Product</button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="pagination-controls text-center my-5">
            <button className='btn btn-secondary' onClick={getPageNumber} pagenum={page - 1} disabled={page <= 1}>
              Previous
            </button>
            <span className='mx-2'>Page {page}</span>
            <button className='btn btn-secondary' onClick={getPageNumber} pagenum={Number(page) + 1} disabled={page >= data?.data?.metadata.numberOfPages}>
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}
