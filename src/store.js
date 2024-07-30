import { combineReducers, applyMiddleware, legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { allUserReducer, profileReducer, userDetailsReducer, userReducer } from './component/reducer/userReducer';
import { newProductReducer, newReviewReducer, productDetailsReducer, productReducer, productReviewReducer, reviewReducer, updateProductReducer } from './component/reducer/productReducer';
import { cartReducer } from './component/reducer/cartReducer';
import { newPostReducer, postDetails, postReducer, updatePostReducer } from './component/reducer/postReducer';
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from './component/reducer/orderReducer';
import { newVideoReducer, updateVideoReducer, videosReducer } from './component/reducer/videoReducer';

const reducer = combineReducers({
    user: userReducer,
    allUsers: allUserReducer,
    // all product reducer 
    products: productReducer,
    // get product details 
    productDetails: productDetailsReducer,
    // add item in cart
    cart: cartReducer,
    // post 
    posts: postReducer,
    postDetails: postDetails,
    post: updatePostReducer,
    newPost: newPostReducer,
    // update and delete
    product: updateProductReducer,
    newProduct: newProductReducer,
    userDetails: userDetailsReducer,
    profile: profileReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    allOrder: allOrdersReducer,
    order: orderReducer,
    videos: videosReducer,
    video: updateVideoReducer,
    newVideo: newVideoReducer,
    // product review 
    productReviews: productReviewReducer,
    review: reviewReducer,
    newReview: newReviewReducer,
});


let initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems"))
            : [],
        shippingInfo: localStorage.getItem("shippingInfo")
            ?
            JSON.parse(localStorage.getItem("shippingInfo"))
            : {},
    }
};


const middleware = [thunk];
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;


