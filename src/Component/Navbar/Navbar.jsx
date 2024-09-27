import React, { useContext, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/userContext';
import { jwtDecode } from 'jwt-decode';
import logo from '../../assets/freshcart-logo.svg'
import { cartContext } from '../../Context/cartContext';
export default function Navbar() {
  let navLogin = useNavigate();
  let navCart = useNavigate();
  let navPro = useNavigate();
  let {userToken , setToken} = useContext(UserContext);
  let {numOfCartItems} = useContext(cartContext);

  function navProfile () {
    navPro('/profile')
  }

  function navigateToCart () {
    navCart('/cart')
  }

  function logOut () {
    localStorage.removeItem('userToken')
    setToken(null)
    navLogin('/login')
  }

  useEffect(() => {
    if ( userToken != null ){
      jwtDecode(userToken);
    }
  } , [] );

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid container">
          <Link className="navbar-brand" to="/"><img src={logo} alt="" /></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {userToken != null ?  <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="cart">Cart</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="wishlist">Wish List</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="products">Products</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="categories">Categories</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="brands">Brands</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="allorders">All Orders</NavLink>
              </li>
            </ul>  : ''}
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className='nav-item d-flex align-items-center'>
                <i style={{color:'#0000b3'}} className='fa-brands fa-facebook mx-2'></i>
                <i style={{color:'#3399ff'}} className='fa-brands fa-twitter mx-2'></i>
                <i style={{color:'#e87f29'}} class="fa-brands fa-instagram mx-2" ></i>
                <i style={{color:'#FD1D1D'}} className='fa-brands fa-youtube mx-2'></i>
                <i style={{color:'#c8232c'}} className='fa-brands fa-pinterest mx-2'></i>
              </li>
              {userToken != null ? <li className='nav-item d-flex justify-content-between'>
                <div className='position-relative d-flex align-items-center'>
                  <button onClick={navigateToCart} className='btn p-0'>
                  <i className='fa-solid fa-xl fa-cart-shopping text-main p-2'></i>
                  <span className='cart-num position-absolute end-0 translate-middle-y'>{numOfCartItems}</span>
                  </button>
                </div>
                <span className='nav-link cursor-pointer' onClick={navProfile}><i className="text-primary fa-xl fa-solid fa-user"></i></span>
                <span className='nav-link cursor-pointer' onClick={logOut}>Log Out</span>
              </li>  : <>
              <li className='nav-item'>
                <NavLink className='text-main nav-link' to='login'>Login</NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to='register'>Register</NavLink>
              </li>
              </> }
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
