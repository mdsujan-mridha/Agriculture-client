import { Star } from '@mui/icons-material';
import { Rating } from '@mui/material';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const AccessoriesCard = ({ product }) => {
       
    const addToCartHandler = () => {
        // dispatch(addItemToCart(product._id,1))
        toast.success("Item added to cart");
    }

    return (
        <Fragment>
            <Link to="/accessories/:id" className="w-auto h-auto bg-gray-100 rounded-lg shadow-xl relative" key={product._id}>
                <img src={product?.images} alt={product.title}
                    className='p-1 rounded-2xl w-full h-60' />
                <div className='mt-5 px-2'>
                    <div className='flex justify-between gap-5 items-center'>
                        <p className='text-xl font-bold'> {product?.title} </p>
                        <Rating
                            style={{ color: 'orange' }}
                            name='review'
                            readOnly
                            precision={0.5}
                            value={4}
                            emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
                        />
                    </div>
                
                    <div className='flex gap-3 items-center p-2 pb-5'>
                        <p className='text-lg font-extrabold text-primary'> {product?.price} /- টাকা </p>
                        <p className='bg-gray-400 p-2 rounded-xl px-5'> 5% </p>

                    </div>
                </div>
                <div className='pb-0 mt-10'>
                    <button
                        onClick={addToCartHandler}
                        className='btn btn-primary w-full absolute bottom-0 left-0 hidden  transition-opacity opacity-0 delay-300'>Add to cart</button>
                </div>
            </Link>
        </Fragment>
    );
};

export default AccessoriesCard;