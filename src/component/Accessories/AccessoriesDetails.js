import React, { Fragment, useState } from 'react';
import Loader from '../Layout/Loader';
import Carousel from 'react-material-ui-carousel';

import image from "../images/acc.png";
import { Rating } from '@mui/material';
import { toast } from 'react-toastify';

const options = {
    size: "large",
    readOnly: true,
    precision: 0.5,
    name: "uncontrolled-rating"

}

export const product = [
    {
        _id: 1,
        images: {
            public_: "sample id",
            url: image,
        },
        title: "Seeders",
        price: 200
    },

]

const AccessoriesDetails = () => {
    const [quantity, setQuantity] = useState(1);
  // increase quantity 
  const increaseQuantity = () => {

    if (product.Stock <= quantity) return;
    const qty = quantity + 1;
    setQuantity(qty);
}
const decreaseQuantity = () => {

    if (1 >= quantity) return;
    const qty = quantity - 1;
    setQuantity(qty);

}

const addToCartHandler = () => {
    // dispatch(addItemToCart(productId, quantity))
    toast.success("Item added to cart");
}
    const loading = false;

    return (
        <Fragment>

            {
                loading ? (<Loader />)
                    :
                    (<Fragment>
                        <div>
                            <div className='w-full bg-gray-300 flex flex-col lg:flex-row justify-evenly lg:items-center px-12' style={{ minHeight: '90vh' }}>
                                <div className='w-full lg:w-1/2 pb-5 lg:pb-0'>
                                    <div
                                        className='flex lg:justify-center lg:items-center shadow-xl rounded-md'
                                        style={{
                                            width: '600px', height: '600px', border: '2px solid #fff'
                                        }}>
                                        <Carousel className='w-full h-full'>
                                            {
                                                product?.images &&
                                                product?.images.map((item, i) => (
                                                    <img
                                                        key={item.url}
                                                        src={item?.url}
                                                        alt={`${i} Slide`}
                                                        className='w-full h-full'
                                                    />
                                                ))
                                            }

                                        </Carousel>
                                    </div>
                                </div>
                                <div className='w-full lg:w-1/2 flex flex-col  justify-start items-start p-5'>
                                    <p className='text-3xl pb-3 font-bold'> {product?.title} </p>
                                    <p className='text-xl font-bold opacity-60 border-b border-gray-500 w-full'>  productID: #{product?._id} </p>

                                    <div className="w-full flex items-center justify-start py-10 border-b border-gray-500">
                                        <Rating
                                            {...options}
                                        /> <span className='text-lg font-semibold text-gray-600'> ({product?.numOfReviews} Reviews) </span>
                                    </div>
                                    <div>
                                        <h1 className='text-4xl font-bold py-7'> BDT {product?.price} /- </h1>
                                        <div className='flex justify-start items-center border-b border-gray-500 pb-7'>
                                            <button
                                                className='text-white font-bold text-2xl'
                                                style={{
                                                    width: 45, height: 45, backgroundColor: '#1c1c1c'
                                                }}
                                                onClick={decreaseQuantity}
                                            > - </button>
                                            <input
                                                type="number"
                                                value={quantity}
                                                readOnly
                                                style={{ width: 60, height: 45, textAlign: 'center', outline: 'none' }}
                                            />
                                            <button
                                                className='text-white font-bold text-2xl' style={{
                                                    width: 45, height: 45, backgroundColor: '#1c1c1c'
                                                }}
                                                onClick={increaseQuantity}
                                            > + </button>
                                            <button
                                                className='btn btn-primary ml-7 rounded-full text-md'
                                                disabled={product.Stock <= 1 ? true : false}
                                                onClick={addToCartHandler}
                                            > Add to cart </button>
                                        </div>
                                        <div className='py-7 border-b border-gray-500'>
                                            <p className=' text-2xl font-bold text-gray-500'> status:
                                                <span className={product?.Stock <= 1 ? "text-red-700" : "text-primary"}> {product.Stock < 1 ? "OutOfStock" : "InStock"} </span> </p>
                                        </div>
                                        <div className='py-7'>
                                            <p className='text-xl font-bold text-gray-600'> Description </p>
                                            <p className='py-4 text-justify font-semibold opacity-70'> {product?.description} </p>
                                        </div>
                                        <button
                                            className='btn w-52 bg-primary text-white outline-none border-0 rounded-full'> Submit Review </button>
                                    </div>
                                </div>
                            </div>
                            
                        </div>

                    </Fragment>)
            }
        </Fragment>
    );
};

export default AccessoriesDetails;