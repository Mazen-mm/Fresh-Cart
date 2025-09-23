import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const userData = useSelector((state) => state.user.userData);
  const nav = useNavigate();
  const name = userData?.name || '';
  // Function to navigate to my cart
  function navToMyCart() {
    nav('/cart');
  }
  return (
    <div className="container text-center my-5">
      {/* //// Display User data //// */}
      <h1 className='text-main mt-5'>Hello : {name}</h1>
      <h5>Your Email is : {userData?.email}</h5>
      <button className='btn bg-main text-white my-5 w-25' onClick={navToMyCart}>My Cart</button>
    </div>
  );
}
