import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Statics/Navbar/Navbar';
import Footer from '../Statics/Footer/Footer';
import { Offline } from "react-detect-offline";
import { useDispatch } from 'react-redux';
import { getLoggedUserCart } from '../../redux/cartSlice';
import { setUserToken } from '../../redux/userSlice';

export default function Layout() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      dispatch(setUserToken(token));
      dispatch(getLoggedUserCart());
    }
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      {/* //// Outlet or Children components //// */}
      <div className="container">
        <Outlet />
      </div>
      {/* //// Outlet or Children components //// */}
      {/* ///// Library Component to alert if user offline ///// */}
      <div>
        <Offline><div className="network"><i className='fas fa-wifi'></i>You Are Offline !</div></Offline>
      </div>
      {/* ///// Library Component to alert if user offline ///// */}
      {/* //// Footer Fixed Component //// */}
      <Footer />
    </div>
  );
}
