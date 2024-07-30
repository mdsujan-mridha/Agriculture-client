import React, { Fragment, useEffect } from 'react';
import { LocationOn, Star } from '@mui/icons-material';
import { Rating } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors, getAllProduct } from '../action/productAction';
import Loader from '../Layout/Loader';





const OrganicFood = () => {

    const dispatch = useDispatch();

    const { products, error, loading } = useSelector((state) => state.products);


    useEffect(() => {

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        dispatch(getAllProduct())

    }, [dispatch, error]);

    const homeProducts = products?.slice(12, 16);

    return (
        <Fragment>
            {
                loading ?
                    (<Loader />)
                    :
                    (
                        <Fragment>
                            <div className='pt-20 pb-10 lg:px-12 md:px-10'>
                                <div className="flex justify-between items-center">
                                    <h1 className='text-2xl font-bold text-white lg:text-center'>অর্গানিক ফুড </h1>
                                    <Link to="/products" className='text-xl text-orange-700 font-bold'> View All </Link>
                                </div>
                                <div className='pt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
                                    {homeProducts &&
                                        homeProducts?.map((product) => (
                                            <Link to={`/products/${product?._id}`} className="w-96 h-auto bg-secondary rounded-lg shadow-xl relative" key={product.id}>
                                                <img loading='lazy' src={product?.images[0]?.url} alt={product.name}
                                                    className='p-1 rounded-2xl w-full h-64' />
                                                <div className='mt-5 px-2'>
                                                    <div className='flex justify-between gap-5 items-center'>
                                                        <p className='text-lg font-bold'> {product?.name} </p>
                                                        <Rating
                                                            style={{ color: 'orange' }}
                                                            name='review'
                                                            readOnly
                                                            precision={0.5}
                                                            value={4}
                                                            emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
                                                        />
                                                    </div>
                                                    <p className='flex  gap-10 pt-2 text-white font-bold text-xl'> <LocationOn /> Barguna,Barishal </p>
                                                    <div className='flex gap-3 items-center p-2 pb-5'>
                                                        <p className='text-lg font-extrabold text-white'> {product?.price} /- টাকা </p>
                                                        <p className='bg-gray-400 p-2 rounded-xl px-5'> 5% </p>
                                                    </div>
                                                </div>
                                                <div className='pb-1 mt-10'>
                                                    <Link
                                                        to="/products"
                                                        className='btn btn-primary w-full absolute bottom-0 left-0 hidden  transition-opacity opacity-0 delay-300 pt-4 justify-center items-center'> View details </Link>
                                                </div>
                                            </Link>
                                        ))
                                    }
                                </div>
                            </div>

                        </Fragment>
                    )
            }
        </Fragment>
    );
};

export default OrganicFood;