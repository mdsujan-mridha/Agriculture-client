import { Clear, Star, } from '@mui/icons-material';
import { Rating, Slider } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import "./Products.css";

import Pagination from 'react-js-pagination';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getAllProduct } from '../action/productAction';
import Loader from "../Layout/Loader";
import { toast } from 'react-toastify';
import ProductCard from './ProductCard';

const Products = () => {

    const dispatch = useDispatch();
    const { loading, products, error, productsCount, resultPerPage, filteredProductsCount } = useSelector((state) => state.products);
    // console.log(productsCount);
    const productCategory = [
        "Beans",
        "Radish",
        "Cauliflower",
        "Cabbage",
        "Pumpkin",
        "Capsicum",
        "Pea",
        "Haicha",
        "Lemon",
        "Carrot",
        "Tomato",
        "Pumpkin",
        "Accessories"
    ]

    const [price, setPrice] = useState([0, 25000]);
    const [category, setCategory] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [rating, setRating] = useState(5);
    const [keyword, setKeyword] = useState("");

    // set price 
    const handlePriceChange = (e, newPrice) => {
        setPrice(newPrice);
    }


    let count = filteredProductsCount;
    // pagination

    const setCurrentPageNo = (e) => {
        setCurrentPage(e)
        // console.log(e);
    }

    const handleSearch = (e) => {
        e.preventDefault();
        setKeyword(e.target.value);

    }
    // console.log(keyword)
    const filterProduct = products.filter((product) =>
        product.name.toLowerCase().includes(keyword.toLowerCase())
    )

    // console.log(category);
    useEffect(() => {

        if (error) {

            toast.error(error, 'You got some error');
            dispatch(clearErrors);
        }

        dispatch(getAllProduct(price, currentPage, category))

    }, [dispatch, error, price, currentPage, category])


    const clearFilter = () => {
        setPrice([0, 25000]);
        setCategory('');
        setKeyword("");


    }

    console.log(products);

    return (
        <Fragment>
            {
                loading ? (<Loader />)
                    :
                    (<Fragment>
                        <div className='flex flex-col lg:flex-row gap-5 px-12 bg-primary' style={{ minHeight: '100vh', width: '100%' }}>
                            <div className='bg-secondary w-72 px-10 pt-14 rounded-md shadow-2xl'>
                                <div className='flex justify-between items-center'>
                                    <p className='text-xl font-bold'> Filter </p>
                                    <button onClick={() => clearFilter()} className='btn'> Reset </button>
                                </div>
                                <div className='pt-10 mt-10' style={{ borderTop: '1px solid #1c1c1c' }}>
                                    <p className='text-xl font-bold'> Price </p>
                                    <div className='pt-5'>
                                        <Slider
                                            value={price}
                                            onChange={handlePriceChange}
                                            valueLabelDisplay="auto"
                                            aria-labelledby='range-slider'
                                            min={0}
                                            max={25000}
                                        />
                                    </div>

                                </div>
                                <div className='pt-10 mt-10' style={{ borderTop: '1px solid #1c1c1c' }}>
                                    <p className='text-xl font-bold pb-5'> Category </p>
                                    <ul>
                                        {
                                            productCategory.map((category, index) => (
                                                <li
                                                    key={index}
                                                    onClick={() => setCategory(category)}
                                                    className='text-lg font-bold text-white cursor-pointer hover:text-orange-600'
                                                >
                                                    {category}
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                                <div className='pt-10 mt-10 pb-7' style={{ borderTop: "1px solid #1c1c1c", borderBottom: '1px solid #1c1c1c' }}>
                                    <p> Ratting </p>
                                    <div>
                                        <Rating
                                            name='review'
                                            readOnly
                                            value={rating}
                                            precision={0.5}
                                            style={{ color: 'orange' }}
                                            emptyIcon={<Star style={{ opacity: 0.75 }} fontSize='inherit' />}
                                        />
                                        <Rating
                                            name='review'
                                            readOnly
                                            value={4.5}
                                            precision={0.5}
                                            style={{ color: 'orange' }}
                                            emptyIcon={<Star style={{ opacity: 0.75 }} fontSize='inherit' />}
                                        />
                                        <Rating
                                            name='review'
                                            readOnly
                                            value={4}
                                            precision={0.5}
                                            style={{ color: 'orange' }}
                                            emptyIcon={<Star style={{ opacity: 0.75 }} fontSize='inherit' />}
                                        />
                                        <Rating
                                            name='review'
                                            readOnly
                                            value={3.5}
                                            precision={0.5}
                                            style={{ color: 'orange' }}
                                            emptyIcon={<Star style={{ opacity: 0.75 }} fontSize='inherit' />}
                                        />
                                        <Rating
                                            name='review'
                                            readOnly
                                            value={3}
                                            precision={0.5}
                                            style={{ color: 'orange' }}
                                            emptyIcon={<Star style={{ opacity: 0.75 }} fontSize='inherit' />}
                                        />
                                        <Rating
                                            name='review'
                                            readOnly
                                            value={2.5}
                                            precision={0.5}
                                            style={{ color: 'orange' }}
                                            emptyIcon={<Star style={{ opacity: 0.75 }} fontSize='inherit' />}
                                        />
                                        <Rating
                                            name='review'
                                            readOnly
                                            value={2}
                                            precision={0.5}
                                            style={{ color: 'orange' }}
                                            emptyIcon={<Star style={{ opacity: 0.75 }} fontSize='inherit' />}
                                        />
                                        <Rating
                                            name='review'
                                            readOnly
                                            value={1}
                                            precision={0.5}
                                            style={{ color: 'orange' }}
                                            onChange={() => setRating(rating)}
                                            emptyIcon={<Star style={{ opacity: 0.75 }} fontSize='inherit' />}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='w-full'>
                                <div
                                    className='mt-10 w-full h-32 bg-secondary flex justify-center items-center rounded-md px-12'
                                >
                                    <input
                                        type="text"
                                        placeholder='Search your product'
                                        className='w-full border-2 p-4 rounded-xl neutral bg-transparent'
                                        onChange={handleSearch}
                                        value={keyword}

                                    /> </div>
                                <div className='mt-7 pt-10 bg-secondary rounded-lg h-full px-8'>
                                    <p className='text-xl font-bold'> Found <span className=' text-orange-300'> {productsCount} </span> products </p>
                                    <div className='pt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 '>
                                        {
                                            products?.length === 0 ? (
                                                <div className='w-full h-full flex flex-row justify-center items-center'>  <p className='text-center text-2xl font-bold opacity-70'> <span> <Clear /> </span> No Product </p> </div>
                                            ) : (
                                                filterProduct &&
                                                filterProduct?.map((product) => (
                                                    <ProductCard
                                                        key={product._id}
                                                        product={product}
                                                    />
                                                ))
                                            )
                                        }

                                    </div>
                                    {
                                        resultPerPage < count && (
                                            <div className="paginationBox">
                                                <Pagination
                                                    activePage={currentPage}
                                                    itemsCountPerPage={resultPerPage}
                                                    totalItemsCount={productsCount}
                                                    onChange={setCurrentPageNo}
                                                    nextPageText="Next"
                                                    prevPageText="Prev"
                                                    firstPageText="First"
                                                    lastPageText="Last"
                                                    itemClass='page-item'
                                                    linkClass='page-link'
                                                    activeClass='pageItemActive'
                                                    activeLinkClass='pageLinkActive'
                                                />
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </Fragment>)
            }
        </Fragment>
    );
};

export default Products;