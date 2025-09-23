import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../../../assets/freshcart-logo.svg';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../redux/userSlice';

export default function Navbar() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.user.userToken);
  const { cart } = useSelector((state) => state.cart);
  const numOfCartItems = cart?.numOfCartItems || 0;

  function navProfile() {
    nav('/profile');
  }
  function navigateToCart() {
    nav('/cart');
  }
  function logOut() {
    dispatch(logout());
    nav('/login');
  }

  return <>
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid container">
        <Link className="navbar-brand" to="/"><img src={logo} alt="" /></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" aria-label="Toggle navigation"
          aria-expanded="false" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {userToken ? (
            <div className="row align-items-center w-100">
              <div className="col-8">
                <ul className="navbar-nav d-flex flex-column flex-lg-row justify-content-evenly">
                  <li className="nav-item"><NavLink className="nav-link" to="/">Home</NavLink></li>
                  <li className="nav-item"><NavLink className="nav-link" to="cart">Cart</NavLink></li>
                  <li className="nav-item"><NavLink className="nav-link" to="wishlist">WishList</NavLink></li>
                  <li className="nav-item"><NavLink className="nav-link" to="products">Products</NavLink></li>
                  <li className="nav-item"><NavLink className="nav-link" to="categories">Categories</NavLink></li>
                  <li className="nav-item"><NavLink className="nav-link" to="brands">Brands</NavLink></li>
                  <li className="nav-item"><NavLink className="nav-link" to="allorders">Orders</NavLink></li>
                </ul>
              </div>
              <div className="col-4 p-0">
                <ul className="navbar-nav d-flex flex-column flex-lg-row justify-content-between align-items-center gap-4 gap-lg-0">
                  <li className='nav-item d-flex align-items-center'>
                    <i style={{ color: '#1877F2' }} className='fa-brands fa-facebook mx-1'></i>
                    <i style={{ color: '#00acee' }} className='fa-brands fa-twitter mx-1'></i>
                    <i style={{ color: '#c13584' }} className='fa-brands fa-instagram mx-1'></i>
                    <i style={{ color: '#FF0000' }} className='fa-brands fa-youtube mx-1'></i>
                    <i style={{ color: '#cc0000' }} className='fa-brands fa-pinterest mx-1'></i>
                  </li>
                  <li className='nav-item d-flex align-items-center mt-5 mt-lg-0'>
                    <button onClick={navigateToCart} className='btn p-0 position-relative'>
                      <i className='fa-solid fa-xl fa-cart-shopping text-main p-2'></i>
                      <span className='cart-num position-absolute end-0 translate-middle-y'>{numOfCartItems}</span>
                    </button>
                  </li>
                  <li className='nav-item d-flex align-items-center mt-2 mt-lg-0'>
                    <span className='nav-link cursor-pointer p-0' onClick={navProfile}>
                      <i className="text-primary fa-xl fa-solid fa-user"></i>
                    </span>
                  </li>
                  <li className='nav-item cursor-pointer' onClick={logOut}>Log Out</li>
                </ul>
              </div>
            </div>
          ) : (
            <ul className="navbar-nav gap-2">
              <li className='nav-item'><NavLink className='text-main nav-link' to='login'>Login</NavLink></li>
              <li className='nav-item'><NavLink className='nav-link' to='register'>Register</NavLink></li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  </>
}
