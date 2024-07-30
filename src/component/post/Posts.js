import React, { Fragment, useEffect, useState } from 'react';
import PostCard from './PostCard';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getPost } from '../action/postAction';
import Pagination from 'react-js-pagination';

import Loader from '../Layout/Loader';
import MetaData from '../Layout/MetaData';
import "./Posts.css";
import { toast } from 'react-toastify';

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

]


const Posts = () => {
    
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [category, setCategory] = useState('Beans');

    const {
        loading,
        posts,
        error,
        postCount,
        resultPerPage,
        filteredPostCount


    } = useSelector((state) => state.posts)

    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        }

        dispatch(getPost(currentPage, category))

    }, [dispatch, currentPage, category, error])

    let count = filteredPostCount;
    // console.log(filteredProductsCount);

    //  pagination 
    const setCurrentPageNo = (e) => {
        setCurrentPage(e)
    }

    // console.log(posts);

    const handleReset = () => {
        setCategory("Beans")
        setCurrentPage("")
    }

    return (
        <Fragment>
            {
                loading ? (
                    <Loader />
                ) :
                    (
                        <Fragment>
                            <MetaData title={"Product page"} />
                            <h2 className='productsHeading'> All Information  </h2>
                            <div className="products">
                                {
                                    posts &&
                                    posts?.map((item) => (
                                        <PostCard
                                            key={item?._id}
                                            item={item}
                                        />
                                    ))
                                }
                            </div>

                            {/* filter product  */}
                            <div className="filterBox">
                                <div className='flex justify-between items-center my-5'> <h1> Filter </h1> <button
                                    onClick={handleReset}
                                    className='btn btn-secondary'> Reset </button> </div>
                                <h1 className='text-xl font-bold border-b-2 py-5'> Filter by Category </h1>

                                <ul className='categoryBox py-5'>
                                    {
                                        productCategory.map((category) => (
                                            <li
                                                className='category-link text-white'
                                                key={category}
                                                onClick={() => setCategory(category)}
                                            >
                                                {category}
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                            {
                                resultPerPage < count && (
                                    <div className='paginationBox'>
                                        <Pagination
                                            activePage={currentPage}

                                            itemsCountPerPage={resultPerPage}
                                            totalItemsCount={postCount}
                                            onChange={setCurrentPageNo}
                                            nextPageText="Next"
                                            prevPageText="Prev"
                                            firstPageText="First"
                                            lastPageText="Last"
                                            itemClass='page-item'
                                            linkClass='page-link'
                                            activeClass='pageItemActive'
                                            activeLinkClass='pageLinkActive'
                                        ></Pagination>
                                    </div>
                                )
                            }
                        </Fragment>
                    )
            }
        </Fragment>
    );
};

export default Posts;