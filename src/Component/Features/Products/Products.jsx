import { Helmet, HelmetProvider } from 'react-helmet-async';
import axios from 'axios'
import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, setNumOfCartItems } from '../../../redux/cartSlice';
import { addToWish, setNumOfWishItems, getLoggedUserWish, removeWishItem } from '../../../redux/wishlistSlice';

export default function Products() {
  const dispatch = useDispatch();
  // Wishlist state and refresh logic
  const wishlistData = useSelector((state) => state.wishlist.wishlist?.data);
  const wishlist = wishlistData || [];

  useEffect(() => {
    dispatch(getLoggedUserWish());
  }, [dispatch]);

  // Add product to wishlist with instant feedback
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
  // Add product to cart
  async function addProductToCart(id) {
    try {
      const req = await dispatch(addToCart(id)).unwrap();
      if (req.status === 'success') {
        dispatch(setNumOfCartItems(req.numOfCartItems));
        Swal.fire({
          title: 'Good job!',
          text: 'Product added successfully to your cart',
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

  let [page , setPage] = useState(1)
  // Function to update the page number
  function getPageNumber(event) {
    let selectedPage = event.target.getAttribute('pagenum');
    setPage(selectedPage);
    console.log(page);
  }
////// Function to get All Products ///////
  function getAllProducts (queryData) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/Products/?page=${queryData.queryKey[1]}`)
  }
  let { isLoading , data } = useQuery(['productsApi' , page] , getAllProducts , {
    // cacheTime : 3000 ,
    // refetchOnMount : false ,
    // staleTime : 3000 ,
    // refetchInterval : 5000 ,
    // enabled : false 
  })

///// Handle Search input //////
  const [search, setSearch] = useState('');
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
///// Filter Products in search input and display only matches words //////
  const filteredProducts = data?.data?.data.filter((product) => 
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  
  return <>
  <HelmetProvider>
    {/* /////// Helmet contains informations about Component /////// */}
    <Helmet>
      <title>Fresh Cart Products</title>
    </Helmet>
    <div className="container">
      <div className="my-5">
        {/* ///// Search input ///// */}
        <nav className="navbar navbar-light bg-light w-75 mx-auto">
          <input
            className="form-control me-2"
            id="product-search"
            name="product-search"
            autoComplete="off"
            value={search}
            onChange={handleSearch}
            type="search"
            placeholder="Search..."
            aria-label="Search"
          />
        </nav>
      </div>
      {/* ///// Loading until products comes from DataBase ///// */}
      {isLoading ? <div className='loading bg-white position-fixed d-flex align-items-center justify-content-center top-0 bottom-0 start-0 end-0'>
        <span className="loader"></span>
      </div> :
      <div className='container my-5'>
        <div className='row g-4'>
          {/* //// Display Filtered Products //// */}
          {filteredProducts?.map((element) => {
            const isWished = wishlist.some((item) => item.id === element.id);
            return (
              <div key={element.id} className='col-md-3'>
                <div className="product position-relative p-2">
                  {/* //// Link to Product Details //// */}
                  <Link to={`/productdetails/${element.id}`}>
                    <img className='w-100' src={element.imageCover} alt="" />
                    <h6 className='text-main mt-2'>{element.category.name}</h6>
                    <h6>{element.title.split(' ').slice(0,2).join(' ')}</h6>
                    <div className='d-flex justify-content-between'>
                      <span>{element.price}EGP</span>
                      <span>{element.ratingsAverage}<i className='fa-solid fa-star rating-color'></i></span>
                    </div>
                  </Link>
                  {/* //// button to add to wish list //// */}
                  <i
                    onClick={() => toggleWishlist(element.id, isWished)}
                    className={`fa-heart fa-2x position-absolute top-0 end-0 m-2 ${isWished ? 'fa-solid text-danger' : 'fa-regular text-danger'}`}
                    style={{ cursor: 'pointer', zIndex: 2 }}
                    title={isWished ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  ></i>
                  {/* //// button to add to Cart //// */}
                  <button onClick={() => addProductToCart(element.id)} className='btn bg-main text-white w-100'>Add Product</button>
                </div>
              </div>
            );
          })}
    </div>
        {/* Pagination: Assuming you have multiple pages */}
        <div className="pagination-controls text-center my-5">
          <button className='btn btn-secondary' onClick={getPageNumber} pagenum={page - 1} disabled={page <= 1}>
            Previous
          </button>
          <span className='mx-2'>Page {page}</span>
          <button className='btn btn-secondary' onClick={getPageNumber} pagenum={page + 1} disabled={page >= data?.data?.metadata.numberOfPages}>
            Next
          </button>
        </div>
  </div>
  }
    </div>
  </HelmetProvider>
</>
}
