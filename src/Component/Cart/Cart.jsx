import React, { useContext, useEffect, useState } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { cartContext } from '../../Context/cartContext'
import { NavLink } from 'react-router-dom';

export default function Cart() {
  let [cartDetails , setCartDetails] = useState();
  let {getLoggedUserCart , removeCartItem , updateProductQuantity , setNumOfCartItems} = useContext(cartContext);

  useEffect( () => {
    getUserCart();
  } , []);

  async function getUserCart () {
    let {data} = await getLoggedUserCart().catch( (err)=> {console.log(err);})
    if(data?.status === 'success'){
      setCartDetails(data);
    }
  }
  async function removeItem (id) {
    let {data} = await removeCartItem(id);
    if(data?.status === 'success'){
      setCartDetails(data);
      setNumOfCartItems(data.numOfCartItems);
      updateProductQuantity(data?.setNumOfCartItems);
    }
  }
  async function updateCount (id , count) {
    let {data} = await updateProductQuantity(id , count);
    setCartDetails(data);
  }

  return <>
    <div>
    <HelmetProvider>
      <Helmet>
        <title>Fresh Cart</title>
      </Helmet>      
      {cartDetails? <div className="w-75 mx-auto my-3 p-3 bg-main-light">
        <h3 className='text-center'>Shop Cart :</h3>
        <h6 className='text-center text-main'>Cart Items : {cartDetails.numOfCartItems}</h6>
        {cartDetails.data.products.map( (el) => 
        <div key={el._id} className="row border-bottom align-items-center py-2 px-2">
          <div className="col-md-2"><img className='w-100 ' src={el.product.imageCover} alt="" />
          </div>
          <div className="col-md-10">
            <div className="d-flex justify-content-between">
              <div>
                <h6>{el.product.title.split(' ').slice(0,3).join(' ')}</h6>
                <h6 className='text-muted'>Price : {el.price} EGP</h6>
              </div>
              <div>
                <button onClick={()=> updateCount(el.product.id , el.count + 1)} 
                className='btn btn-success btn-sm p-2'><i className='fa-solid fa-plus'></i></button>
                <span className='mx-2'>{el.count}</span>
                <button onClick={()=> updateCount(el.product.id , el.count - 1)}
                className='btn btn-danger btn-sm p-2'><i className='fa-solid fa-minus'></i></button>
              </div>
            </div>
            <button onClick={()=> removeItem(el.product._id)} className='btn'>
              <i className='text-danger fas fa-trash-can'></i> Remove</button>
          </div>
        </div>
        )}
        <div>
          <div className="row">
            <div className="col-md-6">
              <h6 className='my-3 text-main'>Total Price : {cartDetails.data.totalCartPrice} EGP</h6>
              <NavLink to={'/checkout/'+cartDetails.data._id} className='btn btn-success'>Check Out Payment ?</NavLink>
            </div>
            <div className="col-md-6 d-flex align-items-center justify-content-end">
              {/* <button onClick={clearCart} className='btn btn-danger'>Clear Cart</button> */}
            </div>
          </div>
        </div>
      </div> : 
      <div className='loading bg-white position-fixed d-flex align-items-center justify-content-center top-0 bottom-0 start-0 end-0'>
          <span className="loader"></span>
      </div>
      }
    </HelmetProvider>
    </div>
  </>
}
