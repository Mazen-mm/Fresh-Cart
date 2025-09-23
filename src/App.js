import { RouterProvider , createHashRouter } from 'react-router-dom'
import Layout from './Component/Layout/Layout';
import Home from './Component/Features/Home/Home'
import HomeProduct from './Component/Features/Home/HomeProduct/HomeProduct';
import Cart from './Component/Cart/Cart';
import Products from './Component/Features/Products/Products';
import ProductDetails from './Component/Features/Products/ProductDetails/ProductDetails';
import Brands from './Component/Features/Brands/Brands';
import Wishlist from './Component/Wishlist/Wishlist';
import Categories from './Component/Features/Categories/Categories';
import Navbar from './Component/Statics/Navbar/Navbar';
import NotFound from './Component/Statics/NotFound/NotFound';
import Register from './Component/Auth/Register/Register';
import Login from './Component/Auth/Login/Login';
import ForgetPass from './Component/Auth/ForgetPass/ForgetPass';
import ResetPass from './Component/Auth/ResetPass/ResetPass';
import Footer from './Component/Statics/Footer/Footer';
import GuardRouting from './Component/Statics/GuardRouting/GuardRouting';
import { QueryClient, QueryClientProvider } from 'react-query';
import Profile from './Component/Statics/Profile/Profile';
import CheckOut from './Component/Orders/CheckOut/CheckOut';
import AllOrders from './Component/Orders/AllOrders/AllOrders';
import SubCategory from './Component/Features/Categories/SubCategory/SubCategory';
import SpeBrand from './Component/Features/Brands/SpeBrand/SpeBrand';


export default function App() {
  let QueryClients = new QueryClient()
  let Routes = createHashRouter([
    {
      path:'/', element:<Layout/>, children:[
        { index: true , element: <GuardRouting><Home/></GuardRouting>},
        { path:'homeProduct' , element: <GuardRouting><HomeProduct/></GuardRouting>},
        { path:'profile' , element: <GuardRouting><Profile/></GuardRouting>},
        { path:'cart' , element: <GuardRouting><Cart/></GuardRouting>},
        { path:'checkout/:id' , element: <GuardRouting><CheckOut/></GuardRouting>},
        { path:'products' , element: <GuardRouting><Products/></GuardRouting>},
        { path:'productdetails/:id' , element: <GuardRouting><ProductDetails/></GuardRouting>},
        { path:'brands' , element: <GuardRouting><Brands/></GuardRouting>},
        { path:'spebrand/:id' , element: <GuardRouting><SpeBrand/></GuardRouting>},
        { path:'wishlist' , element: <GuardRouting><Wishlist/></GuardRouting>},
        { path:'categories' , element: <GuardRouting><Categories/></GuardRouting>},
        { path:'subcategory/:id' , element: <GuardRouting><SubCategory/></GuardRouting>},
        { path:'allorders' , element: <GuardRouting><AllOrders/></GuardRouting>},
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
      <RouterProvider router={Routes}></RouterProvider>
    </QueryClientProvider>
  </>
}
