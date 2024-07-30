import { Clear, Star } from '@mui/icons-material';
import { Rating, Slider } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import Loader from '../Layout/Loader';
import Image from "../images/acc.png";
import AccessoriesCard from './AccessoriesCard';


export const Data = [
    {
        _id: 1,
        images:Image,
        title:"Seeders",
        price:200

    },
    {
        _id: 2,
        images:Image,
        title:"Seeders",
        price:200

    },
    {
        _id: 3,
        images:Image,
        title:"Seeders",
        price:200

    },
]

const Accessories = () => {

    const loading = false;
    const [price, setPrice] = useState([0, 200]);
    const [category, setCategory] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [rating, setRating] = useState(5);
    const [keyword, setKeyword] = useState("");


    // set price 
    const handlePriceChange = (e, newPrice) => {

        setPrice(newPrice);
    }


    // let count = filteredProductsCount;
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
    // const filterProduct = products.filter((product) =>
    //     product.name.toLowerCase().includes(keyword.toLowerCase())
    // )

    // console.log(category);
    useEffect(() => {

        

    }, [])


    const clearFilter = () => {
        setPrice([0, 200]);
        setCategory('');
        setKeyword("");


    }


    return (
        <Fragment>
            {
                loading ? (<Loader />)
                    :
                    (<Fragment>
                        <div className='flex flex-col lg:flex-row gap-5 px-12 bg bg-gray-200' style={{ minHeight: '100vh', width: '100%' }}>
                            <div className='bg-white w-72 px-10 pt-10'>
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
                                            max={200}
                                        />
                                    </div>

                                </div>
                                <div className='pt-10 mt-10' style={{ borderTop: '1px solid #1c1c1c' }}>
                                    <p className='text-xl font-bold pb-5'> Category </p>
                                    <ul>
                                        {/* {
                                            productCategory.map((category, index) => (
                                                <li
                                                    key={index}
                                                    onClick={() => setCategory(category)}
                                                    className='text-lg font-bold opacity-60'
                                                >
                                                    {category}
                                                </li>
                                            ))
                                        } */}
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
                                    className='mt-10 w-full h-32 bg-white flex justify-center items-center rounded-md px-12'
                                >
                                    <input
                                        type="text"
                                        placeholder='Search your product'
                                        className='w-full border-2 p-4 rounded-xl border-gray-500'
                                        onChange={handleSearch}
                                        value={keyword}

                                    /> </div>
                                <div className='mt-7 pt-10 bg-white rounded-lg h-full px-8'>
                                    <p className='text-lg font-bold'> Found <span className='text-primary'> 200 </span> products </p>
                                    <div className='pt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 '>
                                        {
                                            Data?.length === 0 ? (
                                                <div className='w-full h-full flex flex-row justify-center items-center'>  <p className='text-center text-2xl font-bold opacity-70'> <span> <Clear /> </span> No Product </p> </div>
                                            ) : (
                                                Data&&
                                                Data?.map((product) => (
                                                    <AccessoriesCard
                                                        key={product._id}
                                                        product={product}
                                                    />
                                                ))
                                            )
                                        }

                                    </div>
                                    {/* {
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
                                    } */}
                                </div>
                            </div>
                        </div>
                    </Fragment>)
            }
        </Fragment>
    );
};

export default Accessories;