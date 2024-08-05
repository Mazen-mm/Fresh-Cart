import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Component/Layout/Layout';
import Home from './Component/Home/Home'
import HomeProduct from './Component/HomeProduct/HomeProduct';
import Cart from './Component/Cart/Cart';
import Products from './Component/Products/Products';
import ProductDetails from './Component/ProductDetails/ProductDetails';
import Brands from './Component/Brands/Brands';
import Wishlist from './Component/Wishlist/Wishlist';
import Categories from './Component/Categories/Categories';
import Navbar from './Component/Navbar/Navbar';
import NotFound from './Component/NotFound/NotFound';
import Register from './Component/Register/Register';
import Login from './Component/Login/Login';
import ForgetPass from './Component/ForgetPass/ForgetPass';
import ResetPass from './Component/ResetPass/ResetPass';
import Footer from './Component/Footer/Footer';
import GuardRouting from './Component/GuardRouting/GuardRouting';
import { UserContextProvider } from './Context/userContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CartContextProvider } from './Context/cartContext';

export default function App() {
  let QueryClients = new QueryClient()
  let Routes = createBrowserRouter([
    {
      path:'/', element:<Layout/>, children:[
        { index: true , element: <GuardRouting><Home/></GuardRouting>},
        { path:'homeProduct' , element: <GuardRouting><HomeProduct/></GuardRouting>},
        { path:'cart' , element: <GuardRouting><Cart/></GuardRouting>},
        { path:'products' , element: <GuardRouting><Products/></GuardRouting>},
        { path:'productdetails/:id' , element: <GuardRouting><ProductDetails/></GuardRouting>},
        { path:'brands' , element: <GuardRouting><Brands/></GuardRouting>},
        { path:'wishlist' , element: <GuardRouting><Wishlist/></GuardRouting>},
        { path:'categories' , element: <GuardRouting><Categories/></GuardRouting>},
        { path:'navbar' , element: <Navbar/>},
        { path:"*" , element: <NotFound/>},
        { path:'register' , element: <Register/>},
        { path:'login' , element: <Login/>},
        { path:'forgetPass' , element: <ForgetPass/>},
        { path:'resetPass' , element: <ResetPass/>},
        { path:'footer' , element: <Footer/>}
      ]
    }
  ])
  return <>
      <QueryClientProvider client={QueryClients}>
        <CartContextProvider>
          <UserContextProvider>
            <RouterProvider router={Routes}></RouterProvider>
          </UserContextProvider>
        </CartContextProvider>
      </QueryClientProvider>
  </>
}
