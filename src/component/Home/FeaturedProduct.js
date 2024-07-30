
import React, { Fragment, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import { Link, useNavigate } from 'react-router-dom';
import { LocationOn, Star } from '@mui/icons-material';
import { Rating } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors, getAllProduct } from '../action/productAction';
import Loader from '../Layout/Loader';

const FeaturedProduct = () => {

    const dispatch = useDispatch();

    const { products, error, loading } = useSelector((state) => state.products);


    useEffect(() => {

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        dispatch(getAllProduct())

    }, [dispatch, error])

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
            slidesToSlide: 4 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };

    const navigate = useNavigate();

    const navigateHandler = () => {
        navigate("/products")
    }

    return (
        <Fragment>
            {
                loading ?
                    (<Loader />)
                    :
                    (<Fragment>
                        <div className=' px-12 mt-10'>
                            <div className="flex justify-between items-center">
                                <h1 className='text-2xl font-bold text-primary lg:text-center'> ফিচার্ড প্রডাক্ট </h1>
                                <p onClick={navigateHandler} className='text-xl text-orange-700 font-bold cursor-pointer'> View All </p>
                            </div>
                            <Carousel
                                swipeable={true}
                                draggable={true}
                                showDots={true}
                                responsive={responsive}
                                ssr={true} // means to render carousel on server-side.
                                infinite={true}
                                autoPlay={true}
                                autoPlaySpeed={1000}
                                keyBoardControl={true}
                                customTransition="all .7"
                                transitionDuration={5000}
                                containerClass="carousel-container"
                                removeArrowOnDeviceType={["tablet", "mobile"]}
                                // deviceType={this.props.deviceType}
                                dotListClass="custom-dot-list-style"
                                itemClass="carousel-item-padding-40-px"
                                className='mt-10'
                            >
                                {
                                    products &&
                                    products?.map((product) => (
                                        <Link to={`/products/${product?._id}`} className="w-full md:w-auto lg:w-auto mx-2 h-auto bg-secondary rounded-lg shadow-2xl relative" key={product.id}>
                                            <img loading='lazy' src={product?.images[0]?.url} alt={product.name}
                                                className='p-1 rounded-2xl w-full h-60' />
                                            <div className='mt-5 px-2'>
                                                <div className='flex justify-between gap-5 items-center'>
                                                    <p className='text-xl font-bold'> {product?.name} </p>
                                                    <Rating
                                                        style={{ color: 'orange' }}
                                                        name='review'
                                                        readOnly
                                                        precision={0.5}
                                                        value={4}
                                                        emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
                                                    />
                                                </div>
                                                <p className='flex  gap-10 pt-2 text-gray-400 font-bold text-xl'> <LocationOn /> Barguna,Barishal </p>
                                                <div className='flex gap-3 items-center p-2 pb-5'>
                                                    <p className='text-lg font-extrabold text-primary'> {product?.price} /- টাকা </p>
                                                    <p className='bg-gray-400 p-2 rounded-xl px-5'> 5% </p>

                                                </div>
                                            </div>
                                            <div className='pb-0 mt-10'>
                                                <button
                                                    className='btn btn-primary w-full absolute bottom-0 left-0 hidden  transition-opacity opacity-0 delay-300'>Add to cart</button>
                                            </div>
                                        </Link>
                                    ))
                                }
                            </Carousel>
                        </div>
                    </Fragment >)
            }
        </Fragment>
    );
};

export default FeaturedProduct;