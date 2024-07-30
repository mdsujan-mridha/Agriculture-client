import { Fragment, useEffect, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './component/Header/Navbar';
import Home from './component/Home/Home';
import Products from './component/Products/Products';
import Aboutus from './component/About/Aboutus';
import Login from './component/user/Login';
import Footer from './component/Home/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './component/user/Register';
import axios from 'axios';

import ProductDetails from './component/Products/ProductDetails';
import Cart from './component/Cart/Cart';
import Posts from './component/post/Posts';
import ProtectedRoute from './component/Route/ProtectedRoute';
import { useSelector } from 'react-redux';
import store from './store';
import { loadUser } from './component/action/userAction';
import Shipping from './component/Cart/Shipping';
import ConfirmOrder from './component/Cart/ConfirmOrder';
import Payment from './component/Cart/Payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Success from './component/Cart/Success';
import 'react-multi-carousel/lib/styles.css';
import Contact from './component/Contact/Contact';
import Weather from './component/Weather/Weather';
import Accessories from './component/Accessories/Accessories';
import InformationDetails from './component/Information/InformationDetails';
import PostDetails from './component/post/PostDetails';
import AccessoriesDetails from './component/Accessories/AccessoriesDetails';

import Dashboard from './component/Admin/Dashboard';
import ProductList from './component/Admin/ProductList';
import UpdateProduct from './component/Admin/UpdateProduct';
import NewProduct from './component/Admin/NewProduct';
import UserList from './component/Admin/UserList';
import UpdateUser from './component/Admin/UpdateUser';
import OrderList from './component/Admin/OrderList';
import OrderProcess from './component/Admin/OrderProcess';
import OrderDetails from './component/Order/OrderDetails';
import Myorder from './component/Order/Myorder';
import PostList from './component/Admin/PostList';
import UpdatePost from './component/Admin/UpdatePost';
import NewPost from './component/Admin/NewPost';
import SellNewProduct from './component/user/SellNewProduct';
import Videos from './component/Videos/Videos';
import UserDashboard from './component/user/UserDashboard';
import UserOrder from './component/user/UserOrder';
import UpdateProfile from './component/user/UpdateProfile';
import RoofGarden from './component/post/RoofGarden';
import Cultivation from './component/post/Cultivation';

import AgriInformation from './component/post/AgriInformation';
import Agriculture from './component/post/Agriculture';
import NewVideo from './component/Admin/NewVideo';
import VideoList from './component/Admin/VideoList';
import Message from './component/Admin/Message';
import MessageDetails from './component/Admin/MessageDetails';

function App() {

  axios.defaults.withCredentials = true;
  const { isAuthenticated, user } = useSelector((state) => state.user);
  // sate for stripe 
  const [stripeApiKey, setStripeApiKey] = useState("");


  async function getStripeApiKey() {
    const { data } = await axios.get("https://farming-assistant-backend.vercel.app/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
    // console.log(data.stripeApiKey);
  }

  useEffect(() => {
    store.dispatch(loadUser());
    getStripeApiKey();
  }, [])

  return (
    <Fragment>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/products' element={<Products />}></Route>
        <Route path='/about' element={<Aboutus />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/weather' element={<Weather />}></Route>
        <Route path='/products/:productId' element={<ProductDetails />}></Route>
        <Route path='/post/:id' element={<PostDetails />}></Route>
        <Route path='/videoContent' element={<Videos />}></Route>
        <Route path='/information/details' element={<InformationDetails />}></Route>
        <Route path="/accessories" element={<Accessories />}></Route>
        <Route path='/accessories/:id' element={<AccessoriesDetails />}></Route>
        <Route path='/disease' element={<Posts />} />
        <Route path='/roofgarden' element={<RoofGarden />} />
        <Route path='/cultivation' element={<Cultivation />} />
        <Route path='/agriculture' element={<Agriculture />} />
        <Route path='/agriinformation' element={<AgriInformation />} />

        {/* cart will be protected route */}

        {/* protected route for user */}

        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path='/cart' element={<Cart />}></Route>
          <Route path='/profile' element={<UserDashboard />}></Route>
          <Route path='/shipping' element={<Shipping />} ></Route>
          <Route path='/order/confirm' element={<ConfirmOrder />} ></Route>
          <Route path='/orders' element={<UserOrder />}></Route>
          <Route path='/order/:id' element={<OrderDetails />}></Route>
          <Route path='/new/product' element={<SellNewProduct />}></Route>
          <Route>
            {stripeApiKey && (
              <Route
                path="/process/payment"
                element={
                  <Elements stripe={loadStripe(stripeApiKey)} >
                    <Payment stripeApiKey={stripeApiKey} />
                  </Elements>
                }
              >
              </Route>
            )}
          </Route>
          <Route path='/success' element={<Success />} ></Route>
          <Route path='/user/dashboard' element={<UserDashboard />} />
          <Route path='/update-profile' element={<UpdateProfile />}></Route>
        </Route>

        {/* this route for admin  */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              adminRoute={true}
              isAdmin={user?.role === "admin" ? true : false}
            >
              <Dashboard />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              adminRoute={true}
              isAdmin={user?.role === "admin" ? true : false}
            >
              <ProductList />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/admin/product/:id"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              adminRoute={true}
              isAdmin={user?.role === "admin" ? true : false}
            >
              <UpdateProduct />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/admin/product"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              adminRoute={true}
              isAdmin={user?.role === "admin" ? true : false}
            >
              <NewProduct />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              adminRoute={true}
              isAdmin={user?.role === "admin" ? true : false}
            >
              <UserList />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/admin/user/:id"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              adminRoute={true}
              isAdmin={user?.role === "admin" ? true : false}
            >
              <UpdateUser />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              adminRoute={true}
              isAdmin={user?.role === "admin" ? true : false}
            >
              <OrderList />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/admin/order/:id"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              adminRoute={true}
              isAdmin={user?.role === "admin" ? true : false}
            >
              <OrderProcess />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/admin/post"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              adminRoute={true}
              isAdmin={user?.role === "admin" ? true : false}
            >
              <PostList />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/admin/post/:id"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              adminRoute={true}
              isAdmin={user?.role === "admin" ? true : false}
            >
              <UpdatePost />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/admin/post/new"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              adminRoute={true}
              isAdmin={user?.role === "admin" ? true : false}
            >
              <NewPost />
            </ProtectedRoute>
          }
        ></Route>

        {/* route for video  */}

        <Route
          path="/admin/video/new"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              adminRoute={true}
              isAdmin={user?.role === "admin" ? true : false}
            >
              <NewVideo />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/admin/videos"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              adminRoute={true}
              isAdmin={user?.role === "admin" ? true : false}
            >
              <VideoList />
            </ProtectedRoute>
          }
        ></Route>

        {/* all message  */}
        <Route
          path="/admin/message"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              adminRoute={true}
              isAdmin={user?.role === "admin" ? true : false}
            >
              <Message />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/message/:id"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              adminRoute={true}
              isAdmin={user?.role === "admin" ? true : false}
            >
              <MessageDetails />
            </ProtectedRoute>
          }
        ></Route>

      </Routes>
      <Footer />
    </Fragment >
  );
}

export default App;
