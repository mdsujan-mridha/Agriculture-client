import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { LocationOn, Star } from '@mui/icons-material';
import { Rating } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../action/cartAction';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const addToCartHandler = () => {
        dispatch(addItemToCart(product._id, 1))
        toast.success("Item added to cart");
    }

    return (
        <Fragment>
            <Link to={`/products/${product._id}`} className="w-auto h-auto bg-secondary rounded-lg shadow-2xl relative" key={product._id}>
                <img src={product?.images[0]?.url} alt={product.name}
                    className='p-1 rounded-2xl w-full h-60' />
                <div className='mt-5 px-2'>
                    <div className='flex justify-between gap-5 items-center'>
                        <p className='text-xl font-bold text-white'> {product?.name} </p>
                        <Rating
                            style={{ color: 'orange' }}
                            name='review'
                            readOnly
                            precision={0.5}
                            value={4}
                            emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
                        />
                    </div>
                    <p className='flex  gap-10 pt-2 text-gray-200 font-bold text-xl'> <LocationOn /> {product?.location} </p>
                    <div className='flex gap-3 items-center p-2 pb-5'>
                        <p className='text-lg font-extrabold text-white'> {product?.price} /- টাকা </p>
                        <p className='bg-primary p-2 rounded-xl px-5'> 5% </p>

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

export default ProductCard;