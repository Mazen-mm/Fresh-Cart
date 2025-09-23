import axios from 'axios';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { addToCart, setNumOfCartItems } from '../../../../redux/cartSlice';
import { Helmet , HelmetProvider } from 'react-helmet-async';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Swal from 'sweetalert2';

export default function ProductDetails() {
  const dispatch = useDispatch();
  // Function to add product to cart
  async function addCart(id) {
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
let params = useParams ();
////// Function to get product details //////
  function getProductDetails (id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`) 
  }
  let { data } = useQuery(['prodductDetails' , params.id] , () => getProductDetails (params.id) , {
    enabled : !!params.id
  });
////// React Slider to scroll and show the images of product //////
  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows : false ,
    autoplaySpeed : 2000 ,
    autoplay : true
  };

  return <>
  <HelmetProvider>
    {/* /////// Helmet contains informations about Component /////// */}
    <Helmet>
      <title>{data?.data.data.title}</title>
    </Helmet>
    {/* /////// Display the product details /////// */}
    {data?.data.data ? <div className="row mb-5 d-flex justify-content-center align-items-center">
    <h1 className='text-center text-main mt-5'>Product Details</h1>
    <div className="col-md-4">
        {/* ////// Slider to scroll and show the images of product ////// */}
        <Slider {...settings}>
          {data?.data.data.images.map((image , index) => (
            <div className='item' key={index}>
              <img className='w-100' src={image} alt={data?.data.data.title} />
            </div>
          ))}
        </Slider>
    </div>
    {/* ///// Product Details information ///// */}
    <div className="col-md-7">
      <h2 className='h5'>{data?.data.data.title}</h2>
      <p>{data?.data.data.descrption}</p>
      <h6 className='text-main'>{data?.data.data.category?.name}</h6>
      <h6>Price : {data?.data.data.price} EGP</h6>
      <div className="d-flex justify-content-between">
        <span>Rating Quantity : {data?.data.data.ratingsQuantity}</span>
        <span><i className='fas fa-star rating-color'></i>{data?.data.data.ratingsAverage}</span>
      </div>
      {/* ////// button to add product to cart ////// */}
      <button onClick={ ()=> addCart(params.id)} className='btn bg-main text-white w-50 mt-3'>Add To Cart</button>
    </div>
  </div> : ''}
  </HelmetProvider>
  </>
}
